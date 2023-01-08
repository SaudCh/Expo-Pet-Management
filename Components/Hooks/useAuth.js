import { useState, useEffect, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useAuth = () => {
    const [user, setUser] = useState("");

    const Login = useCallback((user) => {
        setUser(user);

        const usr = JSON.stringify({
            email: user.email,
            id: user.id
        })

        // Save user to Async storage
        AsyncStorage.setItem('user', usr)

    }, []);

    const Logout = useCallback(() => {
        setUser(null);

        // Remove user from Async storage
        AsyncStorage.removeItem('user')

    }, []);


    // useEffect(() => {

    //     const getUser = async () => {
    //         let usr;

    //         try {
    //             let u = await AsyncStorage.getItem('user')
    //             usr = u != null ? JSON.parse(u) : null;

    //         } catch (e) {
    //             console.log(e);
    //         }

    //         if (usr) {
    //             Login(usr);
    //         }
    //     }

    //     getUser();
    // }, []);

    return { Login, Logout, user };

};