import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Text, Dimensions, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { HeaderLogo } from '../../Components/Logo';

function Register({ navigation }) {
    const [data, setData] = useState({
        name: '',
        beard: '',
        dob: '',
        passport: '',
        address: '',
    })

    const handleAdd = async () => {
        await axios.post('pet/add', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const width = Dimensions.get('window').width;

    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, margin: 10 }}>

                    <HeaderLogo />

                    <TextInput
                        mode='outlined'
                        label={'Pet Name'}
                        value={data.name}
                        style={{ marginTop: 30, marginBottom: 10 }}
                        onChangeText={text => setData({ ...data, name: text })}
                        placeholder="Pet Name"
                    />

                    {
                        Platform.OS == 'android' ?
                            <>
                                <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 10, borderWidth: 1, borderRadius: 5, borderColor: "rgba(84, 84, 84, 0.7)", backgroundColor: '#f8f9fa' }}>
                                    <Picker
                                        style={{ height: 50, width: width - 20, }}
                                        selectedValue={data.beard}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setData({ ...data, beard: itemValue })
                                        }>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Bread*" value="Product 1" />
                                        <Picker.Item label="Bread*" value="Product 2" />
                                    </Picker>
                                </TouchableOpacity>
                                <TextInput
                                    mode='outlined'
                                    label={'Date of Birth'}
                                    value={data.dob}
                                    style={{ marginBottom: 10 }}
                                    onChangeText={text => setData({ ...data, dob: text })}
                                    placeholder="Date of Birth"
                                />
                            </>
                            :
                            null
                    }



                    <TextInput
                        mode='outlined'
                        label={'Passport Number'}
                        value={data.passport}
                        style={{ marginBottom: 10 }}
                        onChangeText={text => setData({ ...data, passport: text })}
                        placeholder="Passport Number"
                    />

                    <TextInput
                        mode='outlined'
                        label={'Vet Address'}
                        value={data.address}
                        style={{ marginBottom: 10 }}
                        onChangeText={text => setData({ ...data, address: text })}
                        placeholder="Vet Address"
                    />

                    <View style={{ alignSelf: 'center', marginBottom: 10, marginTop: 30 }}>
                        <Button
                            mode="contained"
                            onPress={handleAdd}
                            style={{ backgroundColor: '#54b325', width: 250 }}
                        >
                            Add
                        </Button>
                        <Button
                            mode="outlined"
                            textColor="#54b325"
                            style={{ borderColor: '#54b325', width: 250, marginTop: 10 }}
                        >
                            Back
                        </Button>

                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}

export default Register;