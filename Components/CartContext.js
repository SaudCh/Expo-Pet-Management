import { createContext } from "react";

export const CartContext = createContext({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    emptyCart: () => { },
    changeQuantity: () => { },
    getCart: () => { }
});