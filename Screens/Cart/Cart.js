import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, BackHandler, Dimensions, TouchableOpacity, Platform, TextInput, Image, ScrollView, ScrollViewBase } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { CartContext } from '../../Components/Context/CartContext';

let deviceWidth = Dimensions.get('window').width

function AddCard({ navigation }) {
  const { cart, total, changeQuantity, removeFromCart } = useContext(CartContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', margin: 10, marginBottom: 0, padding: 5, borderRadius: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: item.Image }} style={{ width: 100, height: 100, marginStart: 10 }} />
              <View style={{ marginStart: 10 }}>
                <Text style={{ fontSize: 15, width: "80%" }}>{item.name}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>PKR {item.price}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ marginStart: 30, fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>PKR {item.price * item.quantity}</Text>
                  <TouchableOpacity style={{ marginStart: 10, backgroundColor: 'red', borderRadius: 10, width: 30, height: 30, justifyContent: 'center' }}
                    onPress={() => changeQuantity(item, item.quantity > 1 ? item.quantity - 1 : 1)}
                  >
                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>{item.quantity}</Text>
                  <TouchableOpacity style={{ marginStart: 10, backgroundColor: 'green', borderRadius: 10, width: 30, height: 30, justifyContent: 'center' }}
                    onPress={() => changeQuantity(item, item.quantity + 1)}
                  >
                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'red', borderRadius: 10, width: 30, height: 30, justifyContent: 'center' }}
              onPress={() => removeFromCart(item._id)}
            >
              <Text style={{ alignSelf: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />


      <View style={{ position: 'absolute', bottom: 0, flex: 1, width: deviceWidth }}>

        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: '900', marginStart: 10, fontStyle: 'italic' }}>Order Summary</Text>


          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
            <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>Sub Total</Text>
            <Text style={{ marginEnd: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>PKR {total}</Text>

          </View>

          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
            <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>Shipping Fee</Text>
            <Text style={{ marginEnd: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>PKR 50</Text>

          </View>


          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
            <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}>Total</Text>
            <Text style={{ marginEnd: 10, fontSize: 18, fontWeight: 'normal', fontStyle: 'italic' }}>PKR {total + 50}</Text>

          </View>



          <View style={{ width: deviceWidth - 50, marginTop: 10, alignSelf: 'center', marginBottom: 10 }}>
            <TouchableOpacity onPress={() => { navigation.navigate("Checkout") }}>

              <Text style={{ marginTop: 10, color: "white", textAlign: 'center', fontSize: 18, marginStart: 10, backgroundColor: '#54b325', padding: 10, borderRadius: 4 }}>Checkout</Text>

            </TouchableOpacity>

          </View>



        </View>

      </View>
    </SafeAreaView>

  )
}

export default AddCard;
