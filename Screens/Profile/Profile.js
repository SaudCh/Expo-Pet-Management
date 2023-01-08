import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, TextInput, Image, ScrollView, ScrollViewBase, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../Components/Context/AuthContext';
function Profile({ navigation }) {

    const { Logout } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1, paddingTop: 36 }}>
            <View style={{ marginTop: 40, flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
                <Image
                    source={require("../../Images/tom.png")}
                    resizeMode='stretch'
                    style={{ height: 100, width: 100, borderRadius: 100 / 2, alignSelf: 'center' }} />
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginStart: 10 }}>KABEER</Text>


            </View>

            <TouchableOpacity style={{ ...styles.option }} onPress={() => { navigation.navigate("WishList") }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Wish List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.option }} onPress={() => { navigation.navigate("OrderHistory") }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.option }} onPress={() => {
                Logout()
            }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Logout</Text>
            </TouchableOpacity>

        </View>

    )
}

export default Profile;

const styles = StyleSheet.create({
    option: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,

    },
});

