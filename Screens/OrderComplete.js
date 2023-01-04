import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,Dimensions, Platform, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
let deviceWidth = Dimensions.get('window').width

function OrderComplete({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>

            <Text style={{ marginTop: 10, color: "grey", textAlign: 'center', fontSize: 30, fontWeight: 'bold', fontStyle: 'italic', marginStart: 10, padding: 10, borderRadius: 4 }}>ORDER CONFIRMED</Text>

            <Image
                source={require("../Images/tick.png")}
                resizeMode='center'
                style={{ height: 150, width: 100, alignSelf: 'center' }} />

            <View style={{ width: deviceWidth - 150, marginTop: 10, alignSelf: 'center', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => { navigation.navigate("Shop") }}>
                    <Text style={{ marginTop: 10, color: "white", textAlign: 'center', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', marginStart: 10, backgroundColor: '#54b325', padding: 10, borderRadius: 4 }}>BACK TO SHOP</Text>

                </TouchableOpacity>

            </View>


        </View>
    )
}

export default OrderComplete;
