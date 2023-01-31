import { createContext } from "react";

export const CartContext = createContext({
    cart: [],
    cartId: null,
    addToCart: () => { },
    removeFromCart: () => { },
    emptyCart: () => { },
    changeQuantity: () => { },
    getCart: () => { },
    total: 0
});