import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import axios from 'axios';
import { AuthContext } from './Components/AuthContext';
import { useAuth } from './Components/useAuth';
import HomeStack from './Components/Navigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { WishlistContext } from './Components/WishlistContext';
import { useWishList } from './Components/useWishList';
import { useCart } from './Components/useCart';
import { CartContext } from './Components/CartContext';


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
  const { cart, cartId, addToCart, removeFromCart, emptyCart, changeQuantity, getCart } = useCart()
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
            getCart
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
