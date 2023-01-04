import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Dimensions, StyleSheet, Platform, Image, ScrollView, ScrollViewBase, SafeAreaView, FlatList } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { AuthContext } from '../Components/AuthContext';
function handleBackButtonClick(navigation) {
    navigation.goBack();
    return true;
}

function Comunity({ navigation }) {
    const [name, setName] = useState(null);
    const [list, setList] = useState([]);
    const { user } = React.useContext(AuthContext);

    useEffect(() => {
        const getCoummunity = async () => {
            await axios.get("community/showAllPosts").then((res) => {
                var response = res.data;
                setList(res.data.data)
                // console.log(res.data.data[0])
            }).catch((err) => {
                console.log(err);
            })

        }
        getCoummunity();
    }, [])

    return (
        <SafeAreaView style={{ paddingTop: 37 }}>
            <ScrollView>

                <View style={{ flex: 1 }}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        <Image
                            source={require("../Images/pet_hub.png")}
                            resizeMode='stretch'
                            style={{ height: 50, width: 100, alignSelf: 'center' }} />

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>

                        <TextInput
                            label={'Product Name'}
                            mode='outlined'
                            width={250}
                            height={40}
                            style={{ height: 40 }}
                            onChangeText={setName}
                            value={name}
                            placeholder="Product Name"
                            keyboardType="text"
                        />
                        <TouchableOpacity style={{ width: 50, alignItems: 'center' }}>
                            <AntDesign name="camera" color={'grey'} size={24} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: 80, height: 40, backgroundColor: '#54b325', marginTop: 5, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigation.navigate("OrderComplete") }}>
                            <Text style={{ color: "white", textAlign: 'center', fontSize: 15 }}>POST</Text>
                        </TouchableOpacity>

                    </View>

                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {

                            const isLiked = item.likes.find((like) => like.userId === user._id);
                            return (
                                <View style={{ flexDirection: 'column', margin: 10, backgroundColor: '#fff', borderRadius: 20, padding: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        <Image
                                            source={{ uri: item.user.Image }}
                                            resizeMode='stretch'
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 40,
                                                overflow: "hidden",
                                                borderWidth: 1,
                                                padding: 5,
                                                borderColor: "#DCDDDF"
                                            }} />


                                        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', marginStart: 10 }}>{item.user.name}</Text>

                                    </View>

                                    <Text style={{ marginVertical: 5, textAlign: 'center', fontSize: 14, fontWeight: 'normal', fontStyle: 'italic' }}>{item.content}</Text>

                                    <Image
                                        resizeMode='stretch'
                                        style={{ marginTop: 10, height: 200, width: '100%', alignSelf: 'center' }} />



                                    <View style={{ elevation: 2, padding: 10, borderColor: "#DCDDDF", borderWidth: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                        {isLiked
                                            ?
                                            <TouchableOpacity onPress={() => { }}>
                                                < AntDesign name="like2" color={'grey'} size={24} />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => { }}>
                                                < AntDesign name="like1" color={'grey'} size={24} />
                                            </TouchableOpacity>

                                        }

                                        <MaterialCommunityIcons name="message-reply-outline" color={'grey'} size={24} />


                                    </View>
                                </View>
                            )
                        }}
                    />



                </View>
            </ScrollView >

        </SafeAreaView>
    )
}

export default Comunity;
