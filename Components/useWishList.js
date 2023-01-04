import { useEffect, useState } from "react"
import axios from "axios"

export const useWishList = () => {
    const [wishList, setWishlist] = useState({
        shop: [],
        pet: [],
    })

    const addToWishlist = (product, cat) => {
        if (cat === 'shop') {
            const newWishlist = [...wishList.shop, product]
            setWishlist({ ...wishList, shop: newWishlist })

        } else {
            const newWishlist = [...wishList.pet, product]
            setWishlist({ ...wishList, pet: newWishlist })
        }

    }

    const removeFromWishlist = (product, cat) => {
        if (cat === 'shop') {
            const newWishlist = wishList.shop.filter((item) => item._id !== product._id)
            setWishlist({ ...wishList, shop: newWishlist })
        } else {
            const newWishlist = wishList.pet.filter((item) => item._id !== product._id)
            setWishlist({ ...wishList, pet: newWishlist })
        }
    }

    const inWishlist = (product, cat) => {
        if (cat === 'shop') {
            const newWishlist = wishList.shop.filter((item) => item._id === product._id)
            if (newWishlist.length > 0) {
                return true
            } else {
                return false
            }
        } else {
            const newWishlist = wishList.pet.filter((item) => item._id === product._id)
            if (newWishlist.length > 0) {
                return true
            } else {
                return false
            }
        }
    }

    useEffect(() => {

    }, [])



    return {
        wishList,
        addToWishlist,
        removeFromWishlist,
        inWishlist,
        setWishlist
    }
}

