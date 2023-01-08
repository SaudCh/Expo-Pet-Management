import React, { useState, useEffect, useContext } from 'react';
import { View, Text, BackHandler, SafeAreaView, Dimensions, TouchableOpacity, Platform, Image, ScrollView, ScrollViewBase } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native-paper'
import { HeaderLogo } from '../../Components/Logo';
import { CartContext } from '../../Components/Context/CartContext';
let deviceWidth = Dimensions.get('window').width
function handleBackButtonClick(navigation) {
    navigation.goBack();
    return true;
}

function ConfirmOrder({ navigation }) {

    const [data, setData] = useState({
        name: '',
        number: '',
        address: ''
    })
    const { total, cart } = useContext(CartContext)

    const handleSubmit = async () => {

        navigation.navigate("OrderHistory")
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ position: 'absolute', bottom: 0, flex: 1, width: deviceWidth }}>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: '900', marginStart: 10, fontStyle: 'italic' }}>Order Summary</Text>


                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>Sub Total</Text>
                        <Text style={{ marginEnd: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>PKR {total}</Text>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>Shipping Fee</Text>
                        <Text style={{ marginEnd: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>PKR 50</Text>

                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}>Total</Text>
                        <Text style={{ marginEnd: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>PKR {total + 50}</Text>
                    </View>



                    <View style={{ width: deviceWidth - 50, marginTop: 10, alignSelf: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => handleSubmit()}>
                            <Text style={{ marginTop: 10, color: "white", textAlign: 'center', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', marginStart: 10, backgroundColor: '#54b325', padding: 10, borderRadius: 4 }}>Complete</Text>
                        </TouchableOpacity>

                    </View>



                </View>

            </View>



        </SafeAreaView >

    )
}

export default ConfirmOrder;
