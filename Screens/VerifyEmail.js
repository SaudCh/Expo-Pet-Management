import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Components/AuthContext';

function Register({ route }) {
    const navigation = useNavigation();
    // console.log('user', route.params.user)
    const [data, setData] = useState({
        userId: route.params.user.userId,
        otp: '',
    })

    const handleRegister = async () => {
        await axios.post('auth/verifyOTP', data)
            .then(function (response) {
                console.log(response.data);
                if (response.data.status === 'success') {
                    alert(response.data.message)
                    console.log('response', response.data)
                    navigation.navigate("Login")
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

                    <Image
                        source={require("../Images/pet_hub.png")}
                        resizeMode='stretch'
                        style={{ marginTop: 60, height: 100, width: 150, alignSelf: 'center' }} />

                    <TextInput
                        mode='outlined'
                        label={'OTP'}
                        value={data.otp}
                        style={{ marginTop: 30, marginBottom: 10 }}
                        onChangeText={text => setData({ ...data, otp: text })}
                        placeholder="OTP"
                    />



                    <View style={{ alignSelf: 'center', marginBottom: 10, marginTop: 30 }}>
                        <Button
                            mode="contained"
                            onPress={() => handleRegister()}
                            style={{ backgroundColor: '#54b325', width: 250 }}
                        >
                            Verify
                        </Button>
                        <Button
                            mode="outlined"
                            textColor="#54b325"
                            style={{ borderColor: '#54b325', width: 250, marginTop: 10 }}
                        >
                            Resend OTP
                        </Button>

                    </View>
                </View>
            </SafeAreaView>
        </ScrollView >

    )
}

export default Register;
