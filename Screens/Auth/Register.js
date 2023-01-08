import React, { useState } from 'react';
import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { TextInput, Button } from 'react-native-paper';
import { AuthLogo } from '../../Components/Logo';

function Register({ navigation }) {
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    })

    const handleRegister = async () => {
        var data1 = {
            "firstName": data.firstname,
            "lastName": data.lastName,
            "email": data.email,
            "password": data.password
        }

        axios.post('auth/register', data1)
            .then(function (response) {
                console.log(response.data);
                if (response.data.status === 'pending') {
                    alert(response.data.message)
                    navigation.navigate("VerifyEmail", {
                        user: response.data.data
                    })
                }
                else {
                    alert('sign up failed')
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }



    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, margin: 10 }}>

                    <AuthLogo />

                    <TextInput
                        mode='outlined'
                        label={'First Name'}
                        value={data.firstname}
                        style={{ marginTop: 30, marginBottom: 10 }}
                        onChangeText={text => setData({ ...data, firstname: text })}
                        placeholder="First Name"
                    />

                    <TextInput
                        mode='outlined'
                        label={'Last Name'}
                        value={data.lastname}
                        style={{ marginBottom: 10 }}
                        onChangeText={text => setData({ ...data, lastname: text })}
                        placeholder="First Name"
                    />

                    <TextInput
                        mode='outlined'
                        label={'Email'}
                        value={data.email}
                        style={{ marginBottom: 10 }}
                        onChangeText={text => setData({ ...data, email: text })}
                        placeholder="Email"
                    />

                    <TextInput
                        mode='outlined'
                        label={'Password'}
                        style={{ marginBottom: 5 }}
                        value={data.password}
                        onChangeText={text => setData({ ...data, password: text })}
                        secureTextEntry
                        placeholder="Password"
                    />

                    <View style={{ alignSelf: 'center', marginBottom: 10, marginTop: 30 }}>
                        <Button
                            mode="contained"
                            onPress={() => {
                                handleRegister()
                            }}
                            style={{ backgroundColor: '#54b325', width: 250 }}
                        >
                            Next
                        </Button>
                        <Button
                            mode="outlined"
                            onPress={() => {
                                navigation.navigate("Login")
                            }}
                            textColor="#54b325"
                            style={{ borderColor: '#54b325', width: 250, marginTop: 10 }}
                        >
                            Login
                        </Button>

                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}

export default Register;