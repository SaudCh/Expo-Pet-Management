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
import { HeaderLogo } from '../../Components/Logo';
import { Searchbar } from 'react-native-paper';
const Shop = ({ navigation }) => {
    const [Products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);

    const [search, setSearch] = useState('')
    useEffect(() => {
        fetchItem();
    }, []);
    const fetchItem = () => {
        axios
            .get("shop/show/all")
            .then((res) => {
                setProducts(res.data.products);
                setFilterProducts(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setFilterProducts(
            Products.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase())
            })
        )
    }, [search])


    const width = Dimensions.get('screen').width / 2 - 8

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 37 }}>
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                    <HeaderLogo />
                </View>
                <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center" }}>
                    <Searchbar
                        style={{ width: 280, height: 40, borderRadius: 10, marginEnd: 10, backgroundColor: 'white' }}
                        placeholder="Search"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />

                    {/* <TouchableOpacity onPress={() => { navigation.navigate("Filter") }} style={{ marginStart: 10 }}>
                        <AntDesign name="filter" color={'grey'} size={24} />
                    </TouchableOpacity> */}

                    <TouchableOpacity style={{ marginStart: 10, marginEnd: 10 }}
                        onPress={() => { navigation.navigate("Cart") }}
                    >
                        <AntDesign name="shoppingcart" color={'grey'} size={24} />
                    </TouchableOpacity>

                </View>



                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between', }}
                    data={filterProducts}
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
