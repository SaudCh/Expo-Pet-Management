import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("");

  const addToCart = (product) => {

    const isProductInCart = newCart.find(
      (item) => item.id === product.id
    );

    if (!isProductInCart) {
      newCart.push({ ...product, quantity: 1 });
    }

    setCart(newCart);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const emptyCart = () => {
    setCart([]);
  };

  const changeQuantity = (product, quantity) => {

    const newCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity };
      }
      return item;
    });

    setCart(newCart);
  };

  // useEffect(() => {
  //   const getCart = async () => {
  //     // get user from AsyncStorage
  //     const user = await AsyncStorage.getItem("user");
  //     const { _id } = JSON.parse(user);
  //     console.log(_id);
  //     await axios.post("shop/cart/show", {
  //       userId: "60e1c1b0b0b5a40015b0b1a5"
  //     }).then((res) => {
  //       // setCart(res.data.cart);
  //       // setCartId(res.data.cartId);
  //       console.log(res.data);
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //   };

  //   getCart();

  // }, []);

  const getCart = async (id) => {
    console.log(id);
    await axios.post("shop/cart/show", {
      userId: id
    }).then((res) => {
      setCart(res.data.cart[0].products);
      setCartId(res.data.cart[0]._id);
    }).catch((err) => {
      console.log(err);
    });
  };

  return { cart, cartId, addToCart, removeFromCart, emptyCart, changeQuantity, getCart };
}