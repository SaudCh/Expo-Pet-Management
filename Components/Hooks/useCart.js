import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("");
  const [total, setTotal] = useState(0);

  const addToCart = async (product) => {
    let newCart = [...cart];

    const isProductInCart = cart.find(
      (item) => item._id === product._id
    );

    if (!isProductInCart) {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }


    await axios.post("shop/cart/add", {
      cartId: cartId,
      _id: product._id,
      name: product.name,
      price: product.price,
      Image: product.Image,
      quantity: 1
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
      setCart(newCart);
    })

  };

  const removeFromCart = async (id) => {
    const ct = [...cart]
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));

    await axios.post("shop/cart/delete", {
      cartId: cartId,
      _id: id
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
      setCart(ct);
    })


  };

  const emptyCart = () => {
    setCart([]);
  };

  const changeQuantity = async (product, quantity) => {

    const newCart = cart.map((item) => {
      if (item._id === product._id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(newCart);

    await axios.post("shop/cart/update/quantity", {
      cartId: cartId,
      productId: product._id,
      quantity: quantity
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })

  };

  useEffect(() => {

    const getTotal = () => {
      const total = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };

    getTotal();

  }, [cart]);


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
  // 63a0b0822a3ade04b9fcfcf7
  // }, []);

  const getCart = async (id) => {
    await axios.post("shop/cart/show", {
      userId: id
    }).then((res) => {
      console.log(res.data.cart);
      setCart(res.data.cart[0].products);
      setCartId(res.data.cart[0]._id);
    }).catch((err) => {
      console.log(err);
    });
  };

  return { cart, cartId, addToCart, removeFromCart, emptyCart, changeQuantity, getCart, total };
}