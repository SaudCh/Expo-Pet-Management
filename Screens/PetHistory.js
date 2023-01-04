import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Platform, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
function PetHistory({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>


            <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                    source={require("../Images/pet_hub.png")}
                    resizeMode='stretch'
                    style={{ height: 50, width: 100, alignSelf: 'center' }} />
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginStart: 10 }}>YOUR PET HISTORY APPEAR HERE!</Text>
            </View>
        </SafeAreaView>
    )
}

export default PetHistory;
