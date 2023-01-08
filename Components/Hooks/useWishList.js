import { useEffect, useState } from "react"
import axios from "axios"

export const useWishList = () => {
    const [wishList, setWishlist] = useState({
        shop: [],
        pet: [],
    })

    const addToWishlist = async (product, cat, user) => {
        if (cat === 'shop') {
            const newWishlist = [...wishList.shop, product]
            setWishlist({ ...wishList, shop: newWishlist })

            console.log(product._id)

            await axios.post('shop/wish', { _id: product._id, userId: user }).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })

        } else {
            const newWishlist = [...wishList.pet, product]
            setWishlist({ ...wishList, pet: newWishlist })
        }

    }

    const removeFromWishlist = (product, cat, user) => {
        if (cat === 'shop') {
            const newWishlist = wishList.shop.filter((item) => item._id !== product._id)
            setWishlist({ ...wishList, shop: newWishlist })

            axios.post('shop/wish', { _id: product._id, userId: user }).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })

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

