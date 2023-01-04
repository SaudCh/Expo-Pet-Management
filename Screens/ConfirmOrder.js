import React, { useState, useEffect } from 'react';
import { View, Text,BackHandler ,SafeAreaView, Dimensions, TouchableOpacity, Platform, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
let deviceWidth = Dimensions.get('window').width
function handleBackButtonClick(navigation) {
    navigation.goBack();
    return true;
}
  
function ConfirmOrder({ navigation }) {

    const [name, setName] = useState(null);
    const [number, onChangeNumber] = useState(null);
    const [address, setAddress] = useState(null);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={()=>handleBackButtonClick(navigation)} style={{ position: 'absolute', left: 5, alignSelf: 'center', }}>
                    <AntDesign name="arrowleft" color={'grey'} size={24} />
                </TouchableOpacity>

                <Image
                    source={require("../Images/pet_hub.png")}
                    resizeMode='stretch'
                    style={{ height: 50, width: 100, alignSelf: 'center' }} />

            </View>




            <View style={{ marginTop: 40, flexDirection: 'column', alignItems: 'center' }} >


                <TextInput
                    style={{ padding: 10, borderWidth: 1, borderRadius: 4, width: deviceWidth - 50 }}
                    onChangeText={setName}
                    value={name}
                    placeholder="Full Name*"
                    keyboardType="text"
                />

                <TextInput
                    style={{ padding: 10, marginTop: 30, borderWidth: 1, borderRadius: 4, width: deviceWidth - 50 }}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="Contact #"
                    keyboardType="text"
                />

                <TextInput
                    style={{ padding: 10, marginTop: 30, borderWidth: 1, borderRadius: 4, width: deviceWidth - 50 }}
                    onChangeText={setAddress}
                    value={address}
                    placeholder="Address *"
                    keyboardType="text"
                />


            </View>


            <View style={{ position: 'absolute', bottom: 0, flex: 1, width: deviceWidth }}>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: '900', marginStart: 10, fontStyle: 'italic' }}>Order Summary</Text>


                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>Sub Total</Text>
                        <Text style={{ marginEnd: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>PKR 500</Text>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>Shipping Fee</Text>
                        <Text style={{ marginEnd: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>PKR 50</Text>

                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}>Total</Text>
                        <Text style={{ marginEnd: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>PKR 550</Text>

                    </View>



                    <View style={{ width: deviceWidth - 50, marginTop: 10, alignSelf: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate("OrderComplete") }}>
                            <Text style={{ marginTop: 10, color: "white", textAlign: 'center', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', marginStart: 10, backgroundColor: '#54b325', padding: 10, borderRadius: 4 }}>CONFIRM ORDER</Text>

                        </TouchableOpacity>

                    </View>



                </View>

            </View>



        </View>

    )
}

export default ConfirmOrder;
