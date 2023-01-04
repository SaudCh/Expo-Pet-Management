import {
    FlatList,
    View,
    Text,
    SafeAreaView,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
let width = Dimensions.get('screen').width / 2 - 8
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
const Shop = ({ navigation }) => {
    const [Products, setProducts] = useState([]);
    useEffect(() => {
        fetchItem();
    }, []);
    const fetchItem = () => {
        axios
            .get("shop/show/all")
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const [close, setClose] = React.useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        getList();
    }, [])

    const getList = async () => {
        await axios.get("shop/showAllProducts").then((res) => {
            var response = res.data;
            setList(response.products)
        }).catch((err) => {
            console.log(err);
        })

    }

    const [images, setimages] = useState([
        require('../Images/tom.png'),
        require('../Images/tom.png'),
        require('../Images/tom.png'),
        require('../Images/tom.png'),
        require('../Images/tom.png'),
        require('../Images/tom.png'),
        require('../Images/tom.png'),
        require('../Images/tom.png')
    ]);




    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 37 }}>
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
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


                    <TouchableOpacity style={{ marginStart: 10, marginEnd: 10 }}
                        onPress={() => { navigation.navigate("Cart") }}
                    >

                        <AntDesign name="shoppingcart" color={'grey'} size={24} />

                    </TouchableOpacity>

                </View>



                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between', }}
                    data={Products}
                    keyExtractor={item => item._id}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item, }) => (
                        <TouchableOpacity activeOpacity={1} onPress={() => {

                            navigation.navigate("Details", { product: item });

                        }}>

                            <View style={{ backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center', width: width, height: width * 1, margin: 4, borderWidth: 2, borderColor: '#d2d4d2', borderRadius: 5 }}>

                                <Image
                                    source={{ uri: item.Image }}
                                    resizeMode='stretch'
                                    style={{ width: 100, height: 100, marginTop: 10 }}
                                />
                                <View style={{ marginTop: 10, textAlign: 'center' }}>
                                    <Text style={{ textAlign: 'center', width: width, fontSize: 15 }}>{item.name.substring(0, 20)}</Text>
                                </View>

                                <View style={{ marginTop: 5, position: 'absolute', bottom: 5, right: 5, left: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 15 }}>PKR {item.price}</Text>
                                    <Text style={{ fontSize: 15 }}>{item.quantity > 0 ? "Instock" : "Out of stock"}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    )}
                />


            </View>
        </SafeAreaView>
    );
}

export default Shop;
