import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Platform, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
let deviceWidth = Dimensions.get('window').width
import { Picker } from '@react-native-picker/picker';
function handleBackButtonClick(navigation) {
    navigation.goBack();
    return true;
}
function Filter({ navigation }) {

    const [name, setName] = useState(null);
    const [number, onChangeNumber] = useState(null);
    const [address, setAddress] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("PRODUCT FOR");
    const [selectedCat, setSelectedCat] = useState("CATEGORY");


    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);



    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                    source={require("../Images/pet_hub.png")}
                    resizeMode='stretch'
                    style={{ height: 50, width: 100, alignSelf: 'center' }} />

            </View>


            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >


                <Text style={{ fontSize: 15, marginStart: 10 }}>FILTERS</Text>


                <Text style={{ fontSize: 15, fontWeight: 'bold', marginEnd: 10 }}>Clear</Text>

            </View>

            <View style={{ marginTop: 40, flexDirection: 'column', alignItems: 'center' }} >




                <TextInput
                    style={{ padding: 10, borderWidth: 1, borderRadius: 4, width: deviceWidth - 50 }}
                    onChangeText={setName}
                    value={name}
                    placeholder="Product Name"
                    keyboardType="text"
                />

                <View style={{ borderWidth: 1, borderRadius: 4, marginTop: 30, height: 50, width: deviceWidth - 50 }}>
                    <Picker
                        style={{ height: 50, width: deviceWidth - 50 }}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Product 1" value="Product 1" />
                        <Picker.Item label="Product 2" value="Product 2" />
                    </Picker>

                </View>

                <View style={{ borderWidth: 1, borderRadius: 4, marginTop: 30, height: 50, width: deviceWidth - 50 }}>
                    <Picker
                        style={{ height: 50, width: deviceWidth - 50 }}
                        selectedValue={selectedCat}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCat(itemValue)
                        }>
                        <Picker.Item label="Category 1" value="Category 1" />
                        <Picker.Item label="Category 2" value="Category 2" />
                    </Picker>

                </View>



            </View>


            <Text style={{ marginTop: 20, marginStart: 20, fontSize: 20, fontWeight: 'bold', fontWeight: 'bold' }}>Price PKR</Text>

            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >


                <TextInput
                    style={{ padding: 10, borderWidth: 1, borderRadius: 4, width: 100 }}
                    onChangeText={setFrom}
                    value={from}
                    placeholder="From"
                    keyboardType="text"
                />


                <TextInput
                    style={{ padding: 10, borderWidth: 1, borderRadius: 4, width: 100 }}
                    onChangeText={setTo}
                    value={to}
                    placeholder="To"
                    keyboardType="text"
                />




            </View>


            <View style={{ width: 250, marginTop: 40, alignSelf: 'center', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={{ marginTop: 10, color: "white", textAlign: 'center', fontSize: 30, fontWeight: 'bold', fontStyle: 'italic', marginStart: 10, backgroundColor: '#54b325', padding: 10, borderRadius: 4 }}>FILTER</Text>

                </TouchableOpacity>

            </View>


        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        width: 100,
        alignItems: "center"
    }
});

export default Filter;