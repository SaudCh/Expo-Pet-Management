import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput, Image, ScrollView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import BottomView from '../../Components/BottomView';
import CusDatePicker from '../../Components/DatePicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../../Components/Context/AuthContext';
import CustomPicker from '../../Components/CustomPicker';
import { ageArr } from '../../Data/data';
import { catBreeds, dogBreeds, parrotBreed, rabbitBreed } from '../../Data/breeds';


let deviceWidth = Dimensions.get('window').width

function AddAnimal({ navigation }) {

    const { user } = useContext(AuthContext)
    const [data, setData] = useState({
        name: '',
        bio: '',
        date: new Date(),
        age: '0 Months',
        passport: '',
        breed: 'Abyssinian',
        type: 'Cat',
        gender: 'Male',
    });
    const [loading, setLoading] = useState(false)
    const [breedD, setBreedD] = useState([])

    useEffect(() => {
        if (data.type === 'Cat') {
            setData((prev) => ({ ...prev, breed: 'Abyssinian' }))
        } else if (data.type === 'Dog') {
            setData((prev) => ({ ...prev, breed: 'Afador' }))
        } else if (data.type === 'Parrot') {
            setData((prev) => ({ ...prev, breed: 'African Grey Parrot' }))
        } else if (data.type === 'Rabbit') {
            setData((prev) => ({ ...prev, breed: 'Angora' }))
        }

    }, [data.type])

    const getBreed = () => {
        let type = data.type

        if (type === 'Cat') {
            return catBreeds.map(e => e.label)
        } else if (type === 'Dog') {
            return dogBreeds.map(e => e.label)
        } else if (type === 'Parrot') {
            return parrotBreed.map(e => e.label)
        } else if (type === 'Rabbit') {
            return rabbitBreed.map(e => e.label)
        }
    }


    const [age, setAge] = useState(false)
    const ageRef = React.useRef(null)
    const ageContent = () => {
        return (
            <View style={{ backgroundColor: '#fff', padding: 16, height: 450 }}>
                <Picker
                    selectedValue={data.age}
                    onValueChange={(itemValue, itemIndex) =>
                        setData({ ...data, age: itemValue })
                    }>
                    {ageArr.map((item, index) => {
                        return (
                            <Picker.Item label={item} value={item} key={index} />
                        )
                    })}
                </Picker>
            </View>
        )
    }

    const [gender, setGender] = useState(false)
    const genderRef = React.useRef(null)
    const genderContent = () => {
        return (
            <View style={{ backgroundColor: '#fff', padding: 16, height: 450 }}>
                <Picker
                    selectedValue={data.gender}
                    onValueChange={(itemValue, itemIndex) =>
                        setData({ ...data, gender: itemValue })
                    }>
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
            </View>
        )
    }

    const [type, setType] = useState(false)
    const typeRef = React.useRef(null)
    const typeContent = () => {
        return (
            <View style={{ backgroundColor: '#fff', padding: 16, height: 450 }}>
                <Picker
                    selectedValue={data.type}
                    onValueChange={(itemValue, itemIndex) =>
                        setData({ ...data, type: itemValue })
                    }>
                    <Picker.Item label="Dog" value="Dog" />
                    <Picker.Item label="Cat" value="Cat" />
                    <Picker.Item label="Parrot" value="Parrot" />
                    <Picker.Item label="Rabbit" value="Rabbit" />
                </Picker>
            </View>
        )
    }


    const [breed, setBreed] = useState(false)
    const breedRef = React.useRef(null)
    const breedContent = () => {
        return (
            <View style={{ backgroundColor: '#fff', padding: 16, height: 450 }}>
                <Picker
                    selectedValue={data.breed}
                    onValueChange={(itemValue, itemIndex) =>
                        setData({ ...data, breed: itemValue })
                    }>
                    {getBreed().map((item, index) => {
                        return (
                            <Picker.Item label={item} value={item} key={index} />
                        )
                    })}
                </Picker>
            </View>
        )
    }


    const handleSave = async () => {

        if (!image) {
            alert("Please select an image")
            return
        }

        const ext = image.split('.').pop();
        const filename = `${user._id}birds.${ext}`;
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

        console.log(img)

        var postData = {
            userId: user._id,
            name: data.name,
            bio: data.bio,
            gender: data.gender,
            breed: data.breed,
            type: data.type,
            image: img,
            passport: data.passport,
            age: data.age,
        }

        await axios.post("pet/add", postData).then((res) => {
            console.log(res.data)
            navigation.navigate("Home")
        }
        ).catch((err) => {
            alert(err?.message)
        }
        )

    }


    const [image, setImage] = useState(null);
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

    return (
        <>
            <View style={{ flex: 1 }}>

                <View style={{ margin: 10 }}>
                    <Image
                        source={{ uri: image ? image : 'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png' }}
                        resizeMode="stretch"
                        style={{ height: 100, width: 100, alignSelf: 'center', borderRadius: 5, borderWidth: 1, backgroundColor: "#fff" }}
                    />
                    <Button
                        mode="contained"
                        style={{ alignSelf: 'center', width: 100, borderRadius: 5, backgroundColor: "#fff" }}
                        onPress={() => pickImage()}
                    >
                        <Text style={{ color: "#000" }}>Upload</Text>
                    </Button>
                </View>

                <TextInput
                    style={styles.input1}
                    value={data.name}
                    onChangeText={(text) => setData({ ...data, name: text })}
                    placeholder="Pet Name"
                />

                <TextInput
                    style={styles.input1}
                    value={data.bio}
                    onChangeText={(text) => setData({ ...data, bio: text })}
                    placeholder="Bio"
                />

                <TextInput
                    style={styles.input1}
                    value={data.passport}
                    onChangeText={(text) => setData({ ...data, passport: text })}
                    placeholder="Passport"
                />

                <CustomPicker
                    value={data.age}
                    onChange={(itemValue, itemIndex) =>
                        setData({ ...data, age: itemValue })
                    }
                    options={ageArr}
                    label="Age"
                    handleDropdown={() => {
                        setAge(true);
                        ageRef.current.snapTo(0)
                    }}
                />

                <CustomPicker
                    value={data.type}
                    onChange={(itemValue, itemIndex) =>
                        setData({ ...data, type: itemValue })
                    }
                    options={[
                        'Cat',
                        'Dog',
                        'Parrot',
                        'Rabbit',
                    ]}
                    label="Type"
                    handleDropdown={() => {
                        setType(true);
                        typeRef.current.snapTo(0)
                    }}
                />

                <CustomPicker
                    value={data.breed}
                    onChange={(itemValue, itemIndex) =>
                        setData({ ...data, breed: itemValue })
                    }
                    options={getBreed()}
                    label="Breed"
                    handleDropdown={() => {
                        setBreed(true);
                        breedRef.current.snapTo(0)
                    }}

                />

                {/* <TextInput
                    style={styles.input1}
                    value={data.breed}
                    onChangeText={(text) => setData({ ...data, breed: text })}
                    placeholder="Breed"
                /> */}

                <CustomPicker
                    value={data.gender}
                    onChange={(itemValue, itemIndex) =>
                        setData({ ...data, gender: itemValue })
                    }
                    options={
                        [
                            'Male',
                            'Female'
                        ]
                    }
                    label="Gender"
                    handleDropdown={() => {
                        setGender(true);
                        genderRef.current.snapTo(0)
                    }}
                />


                <Button
                    loading={loading}
                    mode='contained'
                    style={{ marginHorizontal: 30, marginTop: 20 }}
                    buttonColor='#54b325'
                    onPress={() => {
                        handleSave();
                    }}>
                    Add Pet
                </Button>


            </View >

            <BottomView
                renderContent={ageContent}
                sheetRef={ageRef}
                show={age}
                setShow={setAge}
            />

            <BottomView
                renderContent={genderContent}
                sheetRef={genderRef}
                show={gender}
                setShow={setGender}
            />

            <BottomView
                renderContent={typeContent}
                sheetRef={typeRef}
                show={type}
                setShow={setType}
            />

            <BottomView
                renderContent={breedContent}
                sheetRef={breedRef}
                show={breed}
                setShow={setBreed}
            />
        </>

    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 30,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    input1: {
        height: 40,
        marginHorizontal: 30,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 5

    },
    input8: {
        textAlign: "center",
        height: 140,
        marginHorizontal: 30,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 5

    },
});

export default AddAnimal;
