import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

import HomeStack from './Navigator/Navigator';

import { AuthContext } from './Components/Context/AuthContext';
import { WishlistContext } from './Components/Context/WishlistContext';
import { CartContext } from './Components/Context/CartContext';

import { useAuth } from './Components/Hooks/useAuth';
import { useWishList } from './Components/Hooks/useWishList';
import { useCart } from './Components/Hooks/useCart';

console.disableYellowBox = true;

function App() {

  axios.defaults.baseURL = 'https://pet-hub-pk.herokuapp.com/';

  axios.interceptors.response.use(
    (response) => {
      return response;
    }
    , (error) => {
      throw error;
    }

  );

  const { Login, Logout, user } = useAuth();
  const { cart, cartId, addToCart, removeFromCart, emptyCart, changeQuantity, getCart, total } = useCart()
  const {
    wishList,
    addToWishlist,
    removeFromWishlist,
    inWishlist,
    setWishlist
  } = useWishList();

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!user,
      Login,
      Logout,
      user
    }} >
      <WishlistContext.Provider
        value={{
          wishList,
          addToWishlist,
          removeFromWishlist,
          inWishlist,
          setWishlist
        }}
      >
        <CartContext.Provider
          value={{
            cart,
            cartId,
            addToCart,
            removeFromCart,
            emptyCart,
            changeQuantity,
            getCart,
            total
          }}
        >
          <PaperProvider>
            <NavigationContainer>
              < HomeStack />
            </NavigationContainer>
          </PaperProvider>
        </CartContext.Provider>
      </WishlistContext.Provider>
    </AuthContext.Provider >
  );
}

export default App;
