import { View, Text, BackHandler, TouchableOpacity, Platform, StyleSheet, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';


function Injection({ Pet }) {
    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Text style={{ marginTop: 10, fontSize: 20, marginStart: 10, fontWeight: 'bold' }}>Vaccination</Text>

                <View
                    style={{
                        borderBottomColor: 'black',
                        marginTop: 10,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, fontWeight: 'bold' }}>Previous Dose</Text>

                    <Text style={{ marginTop: 10, fontSize: 15, marginEnd: 10, fontWeight: 'bold' }}>Upcoming Dose</Text>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10 }}>{Pet.vaccination?.DoseDate?.slice(0, 10)}</Text>

                    <Text style={{ marginTop: 10, fontSize: 15, marginEnd: 10 }}>{Pet.vaccination_history.length > 0 ? Pet.vaccination_history[Pet.vaccination_history.length - 1].DoseDate.slice(0, 10) : "N/A"}</Text>

                </View>

                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, fontWeight: 'bold' }}>Vaccination Center Address</Text>

                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10 }}>{Pet.vaccination.address}</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        marginTop: 10,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, fontWeight: 'bold' }}>Vet and Medicine Details</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        marginTop: 10,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, fontWeight: 'bold' }}>Next Apponitment Date:</Text>
                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10 }}>{Pet.vet.AppointmentDate ? Pet.vet.AppointmentDate.slice(0, 10) : "N/A"}</Text>

                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, fontWeight: 'bold' }}>Vet Address</Text>
                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, marginBottom: 30 }}>{Pet.vet.address} </Text>
            </View>
        </ScrollView>
    );
}

function Food({ meal }) {
    return (
        meal ?

            <FlatList
                data={meal}
                keyExtractor={item => item._id}
                horizontal={false}
                numColumns={1}
                renderItem={({ item }) => (

                    <View style={{ flex: 1, backgroundColor: '#fff', padding: 5, margin: 5, marginHorizontal: 10, borderRadius: 10, elevation: 10 }}>
                        <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ marginTop: 5, fontSize: 15, marginStart: 10 }}>{item.time.slice(11, 16)}</Text>
                    </View>
                )}
            /> : <Text>"N/A"</Text>

    );
}

function Cato({ walk }) {
    console.log(walk)
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 10, fontSize: 20, marginStart: 10, fontWeight: 'bold' }}>Walk Timing</Text>

            {
                walk.length > 0 ?
                    <FlatList
                        data={walk}
                        keyExtractor={item => item._id}
                        horizontal={false}
                        numColumns={1}
                        renderItem={({ item }) => (

                            <View style={{ flex: 1, backgroundColor: '#fff', padding: 5, margin: 5, marginHorizontal: 10, borderRadius: 10, elevation: 10 }}>
                                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text style={{ marginTop: 5, fontSize: 15, marginStart: 10 }}>{item.time.slice(11, 16)}</Text>
                            </View>
                        )}
                    />
                    :
                    <Text>"N/A"</Text>
            }

        </View>
    );
}

function handleBackButtonClick(navigation) {
    navigation.goBack();
    return true;
}


function Gallery({ gallery }) {
    console.log(gallery)
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 10, fontSize: 20, marginStart: 10, fontWeight: 'bold' }}>Details</Text>


            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginStart: 10 }}>PET TYPE</Text>

                <Text style={{ fontSize: 16, marginEnd: 10 }}>10-4-2022</Text>

            </View>


            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, marginStart: 10, fontWeight: 'bold' }}>PET BREED</Text>

                <Text style={{ fontSize: 16, marginEnd: 10 }}>American</Text>

            </View>

            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, marginStart: 10, fontWeight: 'bold' }}>DOB</Text>

                <Text style={{ fontSize: 16, marginEnd: 10 }}>14-August-2022</Text>

            </View>


            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, marginStart: 10, fontWeight: 'bold' }}>VACCINATED</Text>

                <Text style={{ fontSize: 16, marginEnd: 10 }}>yes</Text>

            </View>


            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, marginStart: 10, fontWeight: 'bold' }}>PASSWORD</Text>

                <Text style={{ fontSize: 16, marginEnd: 10 }}>huf7f33@</Text>

            </View>



            <View
                style={{
                    borderBottomColor: 'black',
                    marginTop: 10,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />

            <Text style={{ marginTop: 10, fontSize: 20, marginStart: 10, fontWeight: 'bold' }}>Gallery</Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    marginTop: 10,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />


            <View style={{ marginTop: 20 }}>

                <FlatList
                    data={gallery}
                    keyExtractor={item => item._id}
                    horizontal={true}
                    renderItem={({ item }) => {
                        console.log(item.image)
                        return (
                            <View style={{ flex: 1, backgroundColor: '#fff', padding: 5, margin: 5, marginHorizontal: 10, borderRadius: 10, elevation: 10 }}>
                                <Image
                                    source={{ uri: item.image }}
                                    resizeMode='stretch'
                                    style={{ height: 300, width: 300, alignSelf: 'center' }} />
                            </View>
                        )
                    }}
                />


            </View>

        </View>);
}

function PetDetails({ navigation, route }) {
    const Pet = route?.params || {};

    const [tab, setTab] = useState([1])
    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>

                    <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>


                        <TouchableOpacity onPress={() => handleBackButtonClick(navigation)} style={{ position: 'absolute', left: 5, alignSelf: 'center', }}>

                            <AntDesign name="arrowleft" color={'grey'} size={24} />
                        </TouchableOpacity>


                        <Image
                            source={require("../Images/pet_hub.png")}
                            resizeMode='stretch'
                            style={{ height: 50, width: 100, alignSelf: 'center' }} />

                    </View>




                    <View style={{ width: '100%', height: 100, marginTop: 10, justifyContent: 'center', backgroundColor: '#d6d4d4' }}>

                        <Image
                            source={require("../Images/pet_hub.png")}
                            resizeMode='center'
                            style={{ height: 80, width: "100%", alignSelf: 'center' }} />




                    </View>



                    <View style={{
                        width: 130,
                        height: 130,
                        borderRadius: 130 / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        marginTop: -50,
                        elevation: 5

                    }}>

                        <Image
                            source={{ uri: Pet.Pet.image }}
                            resizeMode='stretch'
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 120 / 2,
                                alignSelf: 'center'
                            }} />

                    </View>


                    <Text style={{ fontSize: 20, alignSelf: 'center', fontWeight: 'bold', marginTop: 10 }}>
                        {Pet.Pet.name}
                    </Text>

                    <Text style={{ fontSize: 16, alignSelf: 'center', marginTop: 10 }}>
                        {Pet.Pet.bio}
                    </Text>




                    <View style={{
                        width: "100%",
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        marginTop: 10,
                        elevation: 10,
                        justifyContent: 'space-around',
                        flexDirection: 'row'

                    }}>

                        <TouchableOpacity onPress={() => { setTab(1) }}
                            style={{ alignSelf: 'center', }}>

                            <Image
                                source={require("../Images/injection.png")}
                                resizeMode='center'
                                style={{
                                    width: 40,
                                    height: 40,
                                    alignSelf: 'center'
                                }} />


                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { setTab(2) }}
                            style={{ alignSelf: 'center', }}>

                            <Image
                                source={require("../Images/pet_meal.jpg")}
                                resizeMode='center'
                                style={{
                                    width: 40,
                                    height: 40,
                                    alignSelf: 'center'
                                }} />


                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { setTab(3) }}
                            style={{ alignSelf: 'center', }}>

                            <Image
                                source={require("../Images/cato.png")}
                                resizeMode='center'
                                style={{
                                    width: 40,
                                    height: 40,
                                    alignSelf: 'center'
                                }} />


                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { setTab(4) }}
                            style={{ alignSelf: 'center', }}>

                            <Image
                                source={require("../Images/gallery.png")}
                                resizeMode='center'
                                style={{
                                    width: 40,
                                    height: 40,
                                    alignSelf: 'center'
                                }} />


                        </TouchableOpacity>



                    </View>


                    {
                        tab == 1 ? <Injection Pet={Pet.Pet} /> : tab == 2 ? <Food meal={Pet.Pet.mealTimes} /> : tab == 3 ? <Cato walk={Pet.Pet.walkTimes} /> : <Gallery gallery={Pet.Pet.gallery} />
                    }



                </View>


            </SafeAreaView>
        </ScrollView>
    )
}

export default PetDetails;
