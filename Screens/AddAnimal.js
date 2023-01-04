import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, TouchableOpacity, TouchableWithoutFeedback, Dimensions, StyleSheet, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
let deviceWidth = Dimensions.get('window').width
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Picker } from '@react-native-picker/picker';
import { Button, Platform } from 'react-native';

const SERVER_URL = 'http://localhost:8000';
function handleBackButtonClick(navigation) {
    navigation.goBack();
    return true;
}

function AddAnimal({ navigation }) {


    const [DOB, SetDOB] = React.useState("");
    const [name, SetName] = React.useState("");
    const [bio, SetBio] = React.useState("");
    const [age, SetAge] = React.useState(0);
    const [gender, SetGender] = React.useState("");
    const [breed, SetBreed] = React.useState("");
    const [type, SetType] = React.useState("");
    const [passport, SetPassport] = React.useState("");
    const [photo, setPhoto] = React.useState(null);

    const onChangePetName = (value) => {
        SetName(value)
    }

    const onChangePetType = (value) => {
        SetType(value)
    }

    const onChangePassport = (value) => {
        SetPassport(value)
    }

    const onChangeBio = (value) => {
        SetBio(value)
    }

    const onChangeAge = (value) => {
        SetAge(value)
    }

    const onChangeBreed = (value) => {
        SetBreed(value)
    }

    const onChangeDob = (value) => {
        SetDOB(value)
    }

    const onChangeGender = (value) => {
        SetGender(value)
    }

    const handleSave= () => {
        var data = {
            name: name,
            bio: bio,
            gender: gender,
            breed: breed,
            type: type,
            image: photo,
            passport: passport,
            dob: DOB
        }
        axios({
            url: "http://localhost:8000/pet/addPet",
            method: "POST",
            data: data,
            headers : {
                "content-type": "multipart/form-data"
            }
        }).then((res)=>{
            var response = res.data;
        })
    }
    

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
          // console.log(response);
          if (response) {
            setPhoto(response);
          }
        });
      };
    
      const handleUploadPhoto = () => {
        fetch(`${SERVER_URL}/api/upload`, {
          method: 'POST',
          body: createFormData(photo, { userId: '123' }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log('response', response);
          })
          .catch((error) => {
            console.log('error', error);
          });
      };

    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>

                    <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => handleBackButtonClick(navigation)} style={{ position: 'absolute', left: 5, alignSelf: 'center', }}>
                            <AntDesign name="arrowleft" color={'grey'} size={24} />
                        </TouchableOpacity>

                        <Image
                            source={require("../Images/pet_hub.png")}
                            resizeMode='stretch'
                            style={{ height: 50, width: 100, alignSelf: 'center' }} />

                    </View>

                    <Image
                        source={require("../Images/tom.png")}
                        resizeMode='stretch'
                        style={{ marginTop: 20, height: 80, width: 80, borderRadius: 100 / 2, alignSelf: 'center' }} />



                    <TextInput
                        style={styles.input1}
                        onChangeText={onChangePetName}
                        value={name}
                        placeholder="Pet Name"
                    />

                    <TextInput
                        style={styles.input1}
                        onChangeText={onChangeDob}
                        value={DOB}
                        placeholder="DOB"
                    />

                    <TextInput
                        style={styles.input1}
                        onChangeText={onChangeBio}
                        value={bio}
                        placeholder="Bio"
                    />


                    <TextInput
                        style={styles.input1}
                        onChangeText={onChangeAge}
                        value={age}
                        placeholder="Age"
                    />

                    <TextInput
                        style={styles.input1}
                        onChangeText={onChangePassport}
                        value={passport}
                        placeholder="Passport"
                    />

                    <TextInput
                        style={styles.input1}
                        onChangeText={onChangeBreed}
                        value={breed}
                        placeholder="Breed"
                    />

                    <TextInput
                        style={styles.input1}
                        onChangeText={onChangePetType}
                        value={type}
                        placeholder="Pet Type"
                    />


                    <View style={{ alignSelf: 'center', borderWidth: 1, borderRadius: 4, marginTop: 10, height: 40, width: deviceWidth - 60, justifyContent: 'center' }}>
                        <Picker
                            style={{ height: 50, width: deviceWidth - 50 }}
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) =>
                              onChangeGender(itemValue)
                            }>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>

                    </View>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {photo && (
                            <>
                            <Image
                                source={{ uri: photo.uri }}
                                style={{ width: 300, height: 300 }}
                            />
                            <Button title="Upload Photo" />
                            </>
                        )}
                        <Button title="Choose Photo" />
                    </View>


                  


                    <View style={{ marginTop: 20, width: deviceWidth - 40, alignSelf: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack();
                            // handleSave();
                        }}>
                            <Text style={{ marginTop: 10, color: "white", textAlign: 'center', fontSize: 30, fontWeight: 'bold', fontStyle: 'italic', marginStart: 10, backgroundColor: '#54b325', padding: 10, borderRadius: 4 }}> Add Pet </Text>

                        </TouchableOpacity>

                    </View>

                </View>
            </SafeAreaView>
        </ScrollView>

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
