import { View, Text, BackHandler, TouchableOpacity, Platform, StyleSheet, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';


function Injection({ Pet, id, getPet }) {
    const navigation = useNavigation();

    console.log(Pet)

    const markDone = async (id) => {

        await axios.post("pet/vaccination/MarkAsDone", {
            _id: id
        }).then((res) => {
            console.log(res.data)
            alert("Marked as Done")
            getPet()
        }
        ).catch((err) => {
            console.log(err)
        }
        )

    }

    const vetDone = async (id) => {

        await axios.post("pet/vet/MarkAsDone", {
            _id: id
        }).then((res) => {
            console.log(res.data)
            alert("Marked as Done")
            getPet()
        }
        ).catch((err) => {
            console.log(err)
        }
        )

    }
    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ marginTop: 10, fontSize: 20, marginStart: 10, fontWeight: 'bold' }}>Vaccination</Text>
                    <TouchableOpacity style={{ marginTop: 10, marginEnd: 10, alignSelf: 'flex-end' }} onPress={() => navigation.navigate('Vacination', { Pet, id })}>
                        <AntDesign name="edit" size={30} color="black" />
                    </TouchableOpacity>
                </View>


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
                    <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10 }}>{Pet?.vaccination_history.length > 0 ? Pet.vaccination_history[Pet.vaccination_history.length - 1].DoseDate.slice(0, 10) : "N/A"}</Text>

                    <Text style={{ marginTop: 10, fontSize: 15, marginEnd: 10 }}>{Pet?.vaccination?.DoseDate?.slice(0, 10)}</Text>


                </View>

                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, fontWeight: 'bold' }}>Vaccination Center Address</Text>

                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10 }}>{Pet?.vaccination.address}</Text>

                <TouchableOpacity style={{ marginTop: 10, marginEnd: 10, alignSelf: 'flex-end' }} onPress={() => markDone()}>
                    <Text style={{ color: 'blue', fontSize: 15, marginEnd: 10 }}>Mark as Done</Text>
                </TouchableOpacity>
                <View
                    style={{
                        borderBottomColor: 'black',
                        marginTop: 10,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ marginTop: 10, fontSize: 17, marginStart: 10, fontWeight: 'bold' }}>Vet and Medicine Details</Text>
                    <TouchableOpacity style={{ marginTop: 10, marginEnd: 10, alignSelf: 'flex-end' }} onPress={() => navigation.navigate('Vet', { Pet, id })}>
                        <AntDesign name="edit" size={30} color="black" />
                    </TouchableOpacity>
                </View>


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

                <TouchableOpacity style={{ marginTop: 10, marginEnd: 10, alignSelf: 'flex-end' }} onPress={() => markDone()}>
                    <Text style={{ color: 'blue', fontSize: 15, marginEnd: 10 }}>Mark as Done</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}

function Food({ meal, id, getPet }) {

    const navigation = useNavigation();

    console.log(meal)

    const deleteMeal = async (mid) => {
        await axios.post('pet/meal/delete', {
            _id: id,
            timeId: mid
        }).then(res => {
            console.log(res.data)
            getPet()
        }
        ).catch(err => {
            console.log(err)
        })

    }
    return (
        <View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    alignItems: 'center',
                }}
            >
                <Text style={{ marginTop: 10, fontSize: 20, marginStart: 10, fontWeight: 'bold' }}>Meal Time</Text>
                <TouchableOpacity style={{ marginTop: 10, marginEnd: 10, alignSelf: 'flex-end' }} onPress={() => navigation.navigate('Food', {
                    id
                })}>
                    <AntDesign name="edit" size={30} color="black" />
                </TouchableOpacity>
            </View>


            <View
                style={{
                    borderBottomColor: 'black',
                    marginTop: 10,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />

            {meal ?

                <FlatList
                    data={meal}
                    keyExtractor={item => item._id}
                    horizontal={false}
                    numColumns={1}
                    renderItem={({ item }) => (

                        <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: 5, margin: 5, marginHorizontal: 10, borderRadius: 10, elevation: 10 }}>
                            <View>
                                <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text style={{ marginTop: 5, fontSize: 15, marginStart: 10 }}>{item.time.slice(11, 16)}</Text>
                            </View>
                            <TouchableOpacity style={{ marginEnd: 10, }} onPress={() => deleteMeal(item._id)}>
                                <Text style={{
                                    color: 'red',
                                    fontSize: 15,
                                    fontWeight: '500',
                                }}>Delete</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                /> : <Text>"N/A"</Text>
            }
        </View>
    );
}

function Cato({ walk, id, getPet }) {
    const navigation = useNavigation();


    const deleteWalk = async (wid) => {
        await axios.post('pet/walk/delete', {
            _id: id,
            timeId: wid
        }).then(res => {
            console.log(res.data)
            getPet()
        }
        ).catch(err => {
            console.log(err)
        })

    }

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    alignItems: 'center',
                }}
            >
                <Text style={{ marginTop: 10, fontSize: 20, marginStart: 10, fontWeight: 'bold' }}>Walk Time</Text>
                <TouchableOpacity style={{ marginTop: 10, marginEnd: 10, alignSelf: 'flex-end' }} onPress={() => navigation.navigate('Walk', {
                    id
                })}>
                    <AntDesign name="edit" size={30} color="black" />
                </TouchableOpacity>
            </View>


            <View
                style={{
                    borderBottomColor: 'black',
                    marginTop: 10,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />

            {
                walk.length > 0 ?
                    <FlatList
                        data={walk}
                        keyExtractor={item => item._id}
                        horizontal={false}
                        numColumns={1}
                        renderItem={({ item }) => (

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", backgroundColor: '#fff', padding: 5, margin: 5, marginHorizontal: 10, borderRadius: 10, elevation: 10 }}>
                                <View>
                                    <Text style={{ marginTop: 10, fontSize: 15, marginStart: 10, fontWeight: 'bold' }}>{item.name}</Text>
                                    <Text style={{ marginTop: 5, fontSize: 15, marginStart: 10 }}>{item.time.slice(11, 16)}</Text>
                                </View>
                                <TouchableOpacity style={{ marginEnd: 10, }} onPress={() => deleteWalk(item._id)}>
                                    <Text style={{
                                        color: 'red',
                                        fontSize: 15,
                                        fontWeight: '500',
                                    }}>Delete</Text>
                                </TouchableOpacity>
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


function Gallery({ gallery, id, Pet }) {
    const navigation = useNavigation();

    console.log(Pet)
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 10, fontSize: 20, marginStart: 10, fontWeight: 'bold' }}>Details</Text>


            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginStart: 10 }}>Pet Type</Text>

                <Text style={{ fontSize: 16, marginEnd: 10 }}>{Pet?.type}</Text>

            </View>


            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, marginStart: 10, fontWeight: 'bold' }}>Pet Breed</Text>

                <Text style={{ fontSize: 16, marginEnd: 10 }}>{Pet?.breed}</Text>

            </View>


            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, marginStart: 10, fontWeight: 'bold' }}>Gender</Text>

                <Text style={{ fontSize: 16, marginEnd: 10 }}>{Pet?.gender}</Text>

            </View>


            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, marginStart: 10, fontWeight: 'bold' }}>Passport</Text>

                <Text style={{ fontSize: 16, marginEnd: 10 }}>{Pet?.passport}</Text>

            </View>



            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    alignItems: 'center',
                }}
            >
                <Text style={{ marginTop: 10, fontSize: 20, marginStart: 10, fontWeight: 'bold' }}>Meal Time</Text>
                <TouchableOpacity style={{ marginTop: 10, marginEnd: 10, alignSelf: 'flex-end' }} onPress={() => navigation.navigate('Gallery', {
                    id
                })}>
                    <AntDesign name="edit" size={30} color="black" />
                </TouchableOpacity>
            </View>


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
    // const Pet = route?.params || {};

    const [Pet, setPet] = useState(route?.params || {});

    useFocusEffect(
        React.useCallback(() => {
            const getPet = async () => {
                await axios.post("pet/show", {
                    _id: Pet.Pet._id
                }).then((res) => {
                    setPet({
                        Pet: res.data.pet
                    })
                })
                    .catch((err) => {
                        console.log(err)
                    })

            }

            getPet();

        }, [])
    )


    const getPet = async () => {
        await axios.post("pet/show", {
            _id: Pet.Pet._id
        }).then((res) => {
            setPet({
                Pet: res.data.pet
            })
        })
            .catch((err) => {
                console.log(err)
            })

    }

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
                            source={require("../../Images/pet_hub.png")}
                            resizeMode='stretch'
                            style={{ height: 50, width: 100, alignSelf: 'center' }} />

                    </View>




                    <View style={{ width: '100%', height: 100, marginTop: 10, justifyContent: 'center', backgroundColor: '#d6d4d4' }}>

                        <Image
                            source={require("../../Images/pet_hub.png")}
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
                            source={{ uri: Pet.Pet?.image }}
                            resizeMode='stretch'
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 120 / 2,
                                alignSelf: 'center'
                            }} />

                    </View>


                    <Text style={{ fontSize: 20, alignSelf: 'center', fontWeight: 'bold', marginTop: 10 }}>
                        {Pet.Pet?.name}
                    </Text>

                    <Text style={{ fontSize: 16, alignSelf: 'center', marginTop: 10 }}>
                        {Pet.Pet?.bio}
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
                                source={require("../../Images/injection.png")}
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
                                source={require("../../Images/pet_meal.jpg")}
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
                                source={require("../../Images/cato.png")}
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
                                source={require("../../Images/gallery.png")}
                                resizeMode='center'
                                style={{
                                    width: 40,
                                    height: 40,
                                    alignSelf: 'center'
                                }} />


                        </TouchableOpacity>



                    </View>


                    {
                        tab == 1 ? <Injection Pet={Pet.Pet} id={Pet.Pet._id} getPet={getPet} />
                            :
                            tab == 2 ? <Food meal={Pet.Pet.mealTimes} id={Pet.Pet._id} getPet={getPet} />
                                :
                                tab == 3 ? <Cato walk={Pet.Pet.walkTimes} id={Pet.Pet._id} getPet={getPet} />
                                    :
                                    <Gallery gallery={Pet.Pet.gallery} id={Pet.Pet._id} Pet={Pet.Pet} getPet={getPet} />
                    }



                </View>


            </SafeAreaView>
        </ScrollView>
    )
}

export default PetDetails;
