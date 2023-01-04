import React, { useState, useEffect, useContext } from 'react';
import { View, BackHandler, SafeAreaView, Text, TouchableOpacity, Platform, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WishlistContext } from '../Components/WishlistContext';
function handleBackButtonClick(navigation) {
    navigation.goBack();
    return true;
}
function Details({ navigation, route }) {
    const { product } = route?.params || {};
    const { addToWishlist, inWishlist, removeFromWishlist } = useContext(WishlistContext)

    const inwish = inWishlist(product, 'shop')
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => handleBackButtonClick(navigation)} style={{ position: 'absolute', left: 5, alignSelf: 'center', }}>
                        <AntDesign name="arrowleft" color={'grey'} size={24} />
                    </TouchableOpacity>

                    <Image
                        source={require("../Images/pet_hub.png")}
                        resizeMode='stretch'
                        style={{ height: 50, width: 100, alignSelf: 'center' }} />

                </View>

                <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Filter") }} style={{ marginStart: 10 }}>
                        <AntDesign name="filter" color={'grey'} size={24} />
                    </TouchableOpacity>


                    <TouchableOpacity style={{ marginStart: 10 }}>

                        <AntDesign name="search1" color={'grey'} size={24} />
                    </TouchableOpacity>


                    <TouchableOpacity style={{ marginStart: 10, marginEnd: 10 }}>

                        <AntDesign name="shoppingcart" color={'grey'} size={24} />

                    </TouchableOpacity>

                </View>


                <Image
                    source={{ uri: product?.Image }}
                    resizeMode='stretch'
                    style={{ width: 280, height: 280, alignSelf: 'center', marginTop: 20 }} />

                <View style={{ marginTop: 20, marginStart: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{product?.name}</Text>
                    <Text style={{ fontSize: 15, }}>{product?.description}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginStart: 10 }}>Price:</Text>
                    <Text style={{ fontSize: 15, marginEnd: 10 }}>PKR {product?.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginStart: 10 }}>Fast Shipping</Text>
                    <Text style={{ fontSize: 15, marginEnd: 10 }}>{product?.FastShipping}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginStart: 10 }}>Warranty</Text>
                    <Text style={{ fontSize: 15, marginEnd: 10 }}>{product?.Warranty}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginStart: 10 }}>Number Sold</Text>
                    <Text style={{ fontSize: 15, marginEnd: 10 }}>{product?.NumberSold}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginStart: 10 }}>Category</Text>
                    <Text style={{ fontSize: 15, marginEnd: 10 }}>{product?.category}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginStart: 10 }}>Quantity</Text>
                    <Text style={{ fontSize: 15, marginEnd: 10 }}>{product?.quantity}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginStart: 10 }}>Rating</Text>
                    <Text style={{ fontSize: 15, marginEnd: 10 }}>{product?.totalRating}</Text>
                </View>
                <View style={{ height: 40 }}>

                </View>

            </ScrollView>
            <View style={{ position: 'absolute', bottom: 10, right: 5, left: 5, flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 4 }}>
                {
                    !inwish ?
                        <TouchableOpacity style={{ width: 60, backgroundColor: "#54b325", justifyContent: 'center', alignItems: "center" }} onPress={() => addToWishlist(product, 'shop')}>
                            <AntDesign name="hearto" color={'white'} size={30} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ width: 60, backgroundColor: "#54b325", justifyContent: 'center', alignItems: "center" }} onPress={() => removeFromWishlist(product, 'shop')}>
                            <AntDesign name="heart" color={'white'} size={30} />
                        </TouchableOpacity>
                }

                <TouchableOpacity>
                    <Text style={{ color: "white", textAlign: 'center', fontSize: 18, marginStart: 10, backgroundColor: '#f5b342', padding: 15, borderRadius: 5 }}>Add to Card</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate("AddCard") }}>
                    <Text style={{ color: "white", textAlign: 'center', fontSize: 18, marginStart: 10, backgroundColor: '#f5b342', padding: 15, borderRadius: 5, marginEnd: 10 }}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>


    )
}

export default Details;
