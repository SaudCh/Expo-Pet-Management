import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView,BackHandler, Dimensions, TouchableOpacity, Platform, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
let deviceWidth = Dimensions.get('window').width
function handleBackButtonClick(navigation) {
    navigation.goBack();
    return true;
  }
function AddCard({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={()=>handleBackButtonClick(navigation)}  style={{ position: 'absolute', left: 5, alignSelf: 'center', }}>
                    <AntDesign name="arrowleft" color={'grey'} size={24} />
                </TouchableOpacity>

                <Image
                    source={require("../Images/pet_hub.png")}
                    resizeMode='stretch'
                    style={{ height: 50, width: 100, alignSelf: 'center' }} />

            </View>



            <View style={{ backgroundColor: 'white', elevation: 20, height: 150, marginTop: 10, justifyContent: 'center', marginHorizontal: 5 }}>

                <Image
                    source={require("../Images/tom.png")}
                    resizeMode='stretch'
                    style={{ elevation: 10, borderColor: 'black', borderWidth: 0.25, height: 60, width: 60, marginStart: 30, borderRadius: 5 }} />

                <Text style={{ marginStart: -10, fontSize: 20, fontWeight: 'bold', alignSelf: 'center', position: 'absolute', top: -10, marginTop: 20 }}>Item Name</Text>

                <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', position: 'absolute', right: 20, marginTop: 30 }}>PKR 450</Text>


                <View style={{ flexDirection: 'row', marginTop: 10 }}>

                    <Text style={{ marginStart: 30, fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>PKR 120</Text>

                    <Text style={{ marginStart: 20, height: 25, width: 25, fontSize: 18, fontWeight: '800', alignSelf: 'center', borderRadius: 10, borderWidth: 1, textAlign: 'center' }}>+</Text>

                    <Text style={{ marginStart: 20, fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>1</Text>

                    <Text style={{ marginStart: 20, height: 25, width: 25, fontSize: 18, fontWeight: '800', alignSelf: 'center', borderRadius: 10, borderWidth: 1, textAlign: 'center' }}>-</Text>





                </View>



                <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>

                    <View style={{ marginStart: 10 }}>
                        <AntDesign name="heart" color={'grey'} size={24} />

                    </View>

                    <View style={{ marginStart: 10, marginEnd: 10 }}>
                        <AntDesign name="heart" color={'grey'} size={24} />

                    </View>

                </View>



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
                        <TouchableOpacity onPress={() => { navigation.navigate("ConfirmOrder") }}>
                            <Text style={{ marginTop: 10, color: "white", textAlign: 'center', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', marginStart: 10, backgroundColor: '#54b325', padding: 10, borderRadius: 4 }}> PROCEED TO CHECKOUT</Text>

                        </TouchableOpacity>

                    </View>



                </View>

            </View>



        </SafeAreaView>

    )
}

export default AddCard;
