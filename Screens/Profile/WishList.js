import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../../Components/Context/AuthContext'
import { WishlistContext } from '../../Components/Context/WishlistContext'
import { Button } from 'react-native-paper'

export default function OrderHistory() {
    const { wishList, removeFromWishlist } = useContext(WishlistContext)
    
    return (
        <View>
            <FlatList
                data={wishList?.shop}
                renderItem={({ item }) => {
                    console.log(item)
                    return (
                        <View style={{ ...styles.card }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '60%'
                            }}>
                                <Image
                                    source={{ uri: item.Image }}
                                    style={{ height: 50, width: 50, borderRadius: 50 }}
                                />
                                <Text style={{ fontSize: 15, fontWeight: 'bold', marginStart: 10 }}>{item.name}</Text>
                            </View>
                            <Button
                                onPress={() =>
                                    removeFromWishlist(item, 'shop')
                                }
                            >
                                Remove
                            </Button>
                        </View>
                    )
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }

})