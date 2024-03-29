import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, BackHandler, Dimensions, TouchableOpacity, Platform, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { CartContext } from '../../Components/Context/CartContext';

let deviceWidth = Dimensions.get('window').width

function AddCard({ navigation }) {
    const { cart, total, changeQuantity, removeFromCart } = useContext(CartContext);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <FlatList
                data={cart}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', margin: 10, marginBottom: 0, padding: 5, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: item.Image }} style={{ width: 100, height: 100, marginStart: 10 }} />
                            <View style={{ marginStart: 10 }}>
                                <Text style={{ fontSize: 15, width: "80%" }}>{item.name}</Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>PKR {item.price}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>{item.quantity}</Text>
                                    <Text style={{ marginStart: 30, fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>PKR {item.price * item.quantity}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id}
            />


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
                        <TouchableOpacity onPress={() => { navigation.navigate("ConfirmOrder") }}>
                            <Text style={{ marginTop: 10, color: "white", textAlign: 'center', fontSize: 18, marginStart: 10, backgroundColor: '#54b325', padding: 10, borderRadius: 4 }}>Continue</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </SafeAreaView>

    )
}

export default AddCard;
