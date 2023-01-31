import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from '../../Components/Context/AuthContext';
import { WishlistContext } from '../../Components/Context/WishlistContext';
import { CartContext } from '../../Components/Context/CartContext';
import { AuthLogo } from '../../Components/Logo';


function Login({ navigation, route }) {
    const { Login } = React.useContext(AuthContext);
    const { setWishlist } = React.useContext(WishlistContext);
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const { getCart } = React.useContext(CartContext);
    // const params = { user: user }

    const handleSubmit = async () => {

        // var data = {
        //     email: "kabeerahmadofficial@gmail.com",
        //     password: "Smaku-05"
        // }

        await axios.post('auth/login', data).then((res) => {
            console.log('response', res.data)
            if (res.data.status == "failed") {
                throw new Error(res.data.message)
            } else {
                console.log('response', res.data.user)
                setWishlist(
                    {
                        shop: res.data.user.product_wish,
                        pet: res.data.user.pet_wish

                    }
                )
                getCart(res.data.user._id)
                Login(res.data.user)
                navigation.replace("Home", { user: res.data.user })
            }
        }).catch((err) => {
            console.log('error', err.message)
            alert('error', err.message)
        })

    }

    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, margin: 10 }}>

                    <AuthLogo />

                    <TextInput
                        mode='outlined'
                        label="Email"
                        value={data.email}
                        style={{ marginTop: 30, marginBottom: 10 }}
                        onChangeText={text => setData({ ...data, email: text })}
                        placeholder="Email"
                    />

                    <TextInput
                        mode='outlined'
                        label="Password"
                        style={{ marginBottom: 5 }}
                        value={data.password}
                        onChangeText={text => setData({ ...data, password: text })}
                        secureTextEntry
                        placeholder="Password"
                    />
                    {/* <TouchableOpacity>
                        <Text style={{ marginTop: 10, fontWeight: 'bold', color: "black", textAlign: 'right' }}>Forget Password?</Text>
                    </TouchableOpacity> */}

                    <View style={{ alignSelf: 'center', marginBottom: 10, marginTop: 30 }}>
                        <Button
                            mode="contained"
                            onPress={() => {
                                handleSubmit()
                            }}
                            style={{ backgroundColor: '#54b325', width: 250 }}
                        >
                            Login
                        </Button>
                        <Button
                            mode="outlined"
                            onPress={() => {
                                navigation.navigate("Register")
                            }}
                            textColor="#54b325"
                            style={{ borderColor: '#54b325', width: 250, marginTop: 10 }}
                        >
                            Register
                        </Button>

                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}

const Validaor = (data) => {
    const error = {}

    if (!data.email) {
        error.email = "Fill Email"
    } else if (!data.email.includes("@")) {
        error.email = "Invalid Email"
    }

    if (!data.password) {
        error.password = "Fill Password"
    } else if (data.password.length < 6) {
        error.password = "Password must be 6 characters"
    }

    return error
}


export default Login;