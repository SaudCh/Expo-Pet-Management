import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput, Image, ScrollView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import BottomView from '../../Components/BottomView';
import CusDatePicker from '../../Components/DatePicker';

let deviceWidth = Dimensions.get('window').width

function AddAnimal({ navigation }) {

    const [data, setData] = useState({
        name: '',
        bio: '',
        date: new Date(),
        age: '',
        passport: '',
        breed: '',
        type: '',
        gender: '',
    });


    const [show, setShow] = useState(false)
    const sheetRef = React.useRef(null)

    const renderContent = () => {
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

    const [dp, setDp] = useState(false)
    const dateRef = React.useRef(null)


    // const handleSave = () => {
    //     var data = {
    //         name: name,
    //         bio: bio,
    //         gender: gender,
    //         breed: breed,
    //         type: type,
    //         image: photo,
    //         passport: passport,
    //         dob: DOB
    //     }
    //     axios({
    //         url: "http://localhost:8000/pet/addPet",
    //         method: "POST",
    //         data: data,
    //         headers: {
    //             "content-type": "multipart/form-data"
    //         }
    //     }).then((res) => {
    //         var response = res.data;
    //     })
    // }

    return (
        <View style={{ flex: 1 }}>

            <View style={{ margin: 10 }}>
                <Image
                    source={{ uri: 'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png' }}
                    resizeMode="stretch"
                    style={{ height: 100, width: 100, alignSelf: 'center', borderRadius: 5, borderWidth: 1, backgroundColor: "#fff" }}
                />
                <Button
                    mode="contained"
                    style={{ alignSelf: 'center', width: 100, borderRadius: 5, backgroundColor: "#fff" }}
                    onPress={() => navigation.navigate('AddPet')}
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

            <CusDatePicker
                date={data.date}
                setDate={(event, selectedDate) => setData({ ...data, date: selectedDate })}
                show={dp}
                setShow={setDp}
                mode="date"
                dateRef={dateRef}
            />

            <TouchableOpacity
                onPress={() => {
                    dateRef.current.snapTo(0)
                    setDp(true)
                }}
                style={{ alignSelf: 'center', borderWidth: 1, borderRadius: 4, marginTop: 10, height: 40, width: deviceWidth - 60, justifyContent: 'center' }}
            >
                <Text style={{ marginStart: 10 }}>{data.date.toDateString()}</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input1}
                value={data.bio}
                onChangeText={(text) => setData({ ...data, bio: text })}
                placeholder="Bio"
            />


            <TextInput
                style={styles.input1}
                value={data.age}
                onChangeText={(text) => setData({ ...data, age: text })}
                placeholder="Age"
            />

            <TextInput
                style={styles.input1}
                value={data.passport}
                onChangeText={(text) => setData({ ...data, passport: text })}
                placeholder="Passport"
            />

            <TextInput
                style={styles.input1}
                value={data.breed}
                onChangeText={(text) => setData({ ...data, breed: text })}
                placeholder="Breed"
            />

            <TextInput
                style={styles.input1}
                value={data.type}
                onChangeText={(text) => setData({ ...data, type: text })}
                placeholder="Pet Type"
            />


            {
                Platform.OS === 'android' ?
                    <View style={{ alignSelf: 'center', borderWidth: 1, borderRadius: 4, marginTop: 10, height: 40, width: deviceWidth - 60, justifyContent: 'center' }}>
                        <Picker
                            style={{ height: 50, width: deviceWidth - 50 }}
                            selectedValue={data.gender}
                            onValueChange={(itemValue, itemIndex) =>
                                setData({ ...data, gender: itemValue })
                            }>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>

                    </View>
                    :
                    <>
                        <TouchableOpacity
                            onPress={
                                () => {
                                    sheetRef.current.snapTo(0)
                                    setShow(true)
                                }
                            }
                            style={{ alignSelf: 'center', borderWidth: 1, borderRadius: 4, marginTop: 10, height: 40, width: deviceWidth - 60, justifyContent: 'center' }}>
                            {data.gender ? <Text>{data.gender}</Text> : <Text style={{
                                color: 'rgba(0,0,0,0.3)',
                                marginStart: 10,
                            }}>Select Gender</Text>}
                        </TouchableOpacity>
                        <BottomView
                            renderContent={renderContent}
                            sheetRef={sheetRef}
                            show={show}
                            setShow={setShow}
                        />
                    </>
            }


            <Button
                mode='contained'
                style={{ marginHorizontal: 30, marginTop: 20 }}
                buttonColor='#54b325'
                onPress={() => {
                    navigation.goBack();
                }}>
                Add Pet
            </Button>

        </View >

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
