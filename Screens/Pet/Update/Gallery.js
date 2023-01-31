import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Gallery({ route }) {

  const { id } = route.params

  const navigation = useNavigation()

  const [image, setImage] = React.useState()
  const [loading, setLoading] = React.useState(false)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const addImage = async () => {

    if (image) {
      const ext = image.split('.').pop();
      const filename = `${'1245324'}.${ext}`;
      const file = {
        uri: image,
        name: filename.trim(),
        type: `image/${ext}`,
      };

      let fData = new FormData();
      fData.append("upload_preset", "da02ej7p");
      fData.append("file", file);
      fData.append("cloud_name", "depwj5d5a");

      setLoading(true)
      let img = await axios
        .post("https://api.cloudinary.com/v1_1/depwj5d5a/image/upload", fData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
          },
        })
        .then((res) => {
          return res?.data ? res.data.secure_url : "";
        })
        .catch((err) => {
          console.log(err?.response?.data.message || err.message);
        });

      setLoading(false)
      if (!img) {
        alert("Image upload failed");
        return
      }


      await axios.post("pet/gallery/add", { _id: id, image }).then((res) => {
        console.log(res.data);
        navigation.goBack()
      }).catch((err) => {
        console.log(err);
      })

    } else {
      alert('Please select an image')
    }

    setImage(null)
  }

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
    }}>
      <Image
        source={{ uri: image }}
        style={{ width: 200, height: 200, borderRadius: 10, borderWidth: 1, borderColor: 'black' }}
      />
      <Button
        onPress={pickImage}
        title="Select Image"
        style={{
          margin: 10,

        }}
        loading={loading}
        disabled={loading}
      >
        Select Image
      </Button>

      <Button
        mode='contained'
        onPress={addImage}
        style={{
          margin: 10,
        }}
        loading={loading}
        disabled={loading}
      >
        Upload Image
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({})