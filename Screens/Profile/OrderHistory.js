import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../../Components/Context/AuthContext'

export default function OrderHistory() {

    const { user } = useContext(AuthContext)
    const [orderHistory, setOrderHistory] = React.useState([])

    useEffect(() => {
        // /order/show/user
        const fetchOrderHistory = async () => {
            await axios.post("shop/order/show/user", {
                "userId": user._id
            })
                .then(function (response) {
                    console.log(response.data);
                    setOrderHistory(response.data.orders)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        fetchOrderHistory()

    }, [])
    return (
        <View>
            <FlatList
                data={orderHistory}
                renderItem={({ item }) => (
                    <View style={{ ...styles.card }}>
                        <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Order ID:</Text> {item._id}</Text>
                        <Text style={{ fontSize: 15, textTransform: 'capitalize' }}><Text style={{ fontWeight: 'bold' }}>Status:</Text> {item.status}</Text>
                        <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Total:</Text> {item.total}</Text>
                        <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Date:</Text> {item.createdAt}</Text>

                        <View>
                            <FlatList
                                data={item.products}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                source={{ uri: item.Image }}
                                                style={{ width: 50, height: 50, borderRadius: 10 }}
                                            />
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 15, textTransform: 'capitalize' }}>{item.name}</Text>
                                                <Text style={{ fontSize: 15, textTransform: 'capitalize' }}>Price: {item.price}</Text>
                                                <Text style={{ fontSize: 15, textTransform: 'capitalize' }}>Quantity: {item.quantity}</Text>
                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 15, textTransform: 'capitalize' }}>Total: {item.price * item.quantity}</Text>
                                    </View>
                                )}
                                keyExtractor={item => item._id}
                            />

                        </View>
                    </View>
                )}
                keyExtractor={item => item._id}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        elevation: 5
    }

})