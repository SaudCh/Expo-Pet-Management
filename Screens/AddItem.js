import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
  Image,
  ScrollView,
  ScrollViewBase,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { AuthContext } from '../Components/AuthContext';
import { Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

function AddItem({ navigation }) {
  const { user } = useContext(AuthContext)
  const data = { userId: user?._id };
  const [Pets, setPets] = useState([]);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    await axios
      .post('pet/user/show', data)
      .then(res => {
        setPets(res.data.pets);
        // console.log(Pets[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const PetDelete = async (id) => {
    await axios.post('pet/delete', {
      _id: id
    }).then(res => {
      console.log(res)
      fetchItem()
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10
          }}>
          <Image
            source={require('../Images/pet_hub.png')}
            resizeMode="stretch"
            style={{ height: 50, width: 150, alignSelf: 'center' }}
          />
        </View>

        <FlatList
          data={Pets}
          keyExtractor={item => item._id}
          horizontal={false}
          numColumns={1}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('PetDetails', { Pet: item });
              }}>
              <View
                style={{
                  elevation: 10,
                  borderRadius: 10,
                  marginHorizontal: 5,
                  marginTop: 10,
                  backgroundColor: 'white',
                  height: 100,
                  flexDirection: 'row'
                }}>
                <Image
                  source={{ uri: item.image }}
                  resizeMode="stretch"
                  style={{
                    marginStart: 10,
                    height: 60,
                    width: 60,
                    borderRadius: 100 / 2,
                    alignSelf: 'center',
                  }}
                />

                <View
                  style={{
                    marginStart: 10,
                    marginTop: 20,
                    flexDirection: 'column',
                  }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.name}</Text>
                  <Text style={{ fontSize: 15 }}>{item.age}</Text>
                  <Text style={{ fontSize: 15 }}>{item.gender}</Text>
                </View>
                <View style={{ position: 'absolute', right: 10 }}>
                  <Button
                    onPress={
                      () => PetDelete(item._id)
                    }
                  >
                    Delete
                  </Button>

                </View>
              </View>

            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RegisterNext');
          }
          }
        >
          <AntDesign
            name="pluscircle"
            size={50}
            color="green"
            style={{
              position: 'absolute',
              bottom: 5,
              right: 10,
            }}
          />
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
}

export default AddItem;
