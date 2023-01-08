// 
import { createContext } from "react";

export const WishlistContext = createContext({
    wishList: [],
    setWishlist: () => { },
    addToWishlis: () => { },
    removeFromWishlist: () => { },
    inWishlist: () => { },
});