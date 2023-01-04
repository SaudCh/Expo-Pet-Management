import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios'

export default function OrderHistory() {
    useEffect(() => {
        // /order/show/user
        const fetchOrderHistory = async () => {
            await axios.post("shop/order/show/user")
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        fetchOrderHistory()

    }, [])
    return (
        <View>
            <Text>OrderHistory</Text>
        </View>
    )
}

const styles = StyleSheet.create({})