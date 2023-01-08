import { useContext } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import VerifyEmail from '../Screens/Auth/VerifyEmail';

import Shop from '../Screens/Shop/Shop';
import Details from '../Screens/Shop/Details';
import Filter from '../Screens/Shop/Filter';

import Pets from '../Screens/Pet/Pets';
// import AddPet from '../Screens/Pet/AddPets';
import AddPet from '../Screens/Pet/AddPet';
import PetDetails from '../Screens/Pet/Details';

import Comunity from '../Screens/Community/Comunity';

import WishList from '../Screens/Profile/WishList';

import Cart from '../Screens/Cart/Cart';
import Checkout from '../Screens/Cart/Checkout';
import ConfirmOrder from '../Screens/Order/ConfirmOrder';

import Profile from '../Screens/Profile/Profile';
import OrderHistory from '../Screens/Profile/OrderHistory';


import { AuthContext } from '../Components/Context/AuthContext';
import Pay from '../Screens/Order/Pay';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function HomeStack() {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return (
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerTintColor: 'purple'
                }}>

                <Stack.Screen
                    name="Home"
                    component={TabBar}
                    options={{ title: 'Home', headerShown: false }}
                />

                {/* Shop */}
                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{ title: 'Details', headerShown: false }}
                />

                <Stack.Screen
                    name="Filter"
                    component={Filter}
                    options={{ title: 'Filter' }}
                />

                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{ title: 'Cart' }}
                />

                <Stack.Screen
                    name="Checkout"
                    component={Checkout}
                    options={{ title: 'Checkout' }}
                />

                <Stack.Screen
                    name="Pay"
                    component={Pay}
                    options={{ title: 'Payment', }}
                />

                {/* Pet */}
                <Stack.Screen
                    name="PetDetails"
                    component={PetDetails}
                    options={{ title: 'Shop', headerShown: false }}
                />

                <Stack.Screen
                    name="AddPet"
                    component={AddPet}
                    options={{ title: 'Add Pet' }}
                />

                <Stack.Screen
                    name="ConfirmOrder"
                    component={ConfirmOrder}
                    options={{ title: 'ConfirmOrder' }}
                />

                {/* Profile */}
                <Stack.Screen
                    name="OrderHistory"
                    component={OrderHistory}
                    options={{ title: 'Order History' }}
                />

                <Stack.Screen
                    name="WishList"
                    component={WishList}
                    options={{ title: 'Wish List' }}
                />

            </Stack.Navigator>
        );
    } else {
        return (
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTintColor: 'purple'
                }}>

                <Stack.Screen
                    name="Login"
                    component={Login}
                    initialParams={{ userid: 'rimsha' }}
                    options={{ title: 'Login' }}
                />

                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ title: 'Register' }}
                />

                <Stack.Screen
                    name="VerifyEmail"
                    component={VerifyEmail}
                    options={{ title: 'VerifyEmail' }}
                />

            </Stack.Navigator>
        )
    }
}

function TabBar() {
    return (
        <Tab.Navigator barStyle={{ backgroundColor: 'white' }} activeColor="white">
            <Tab.Screen
                name="Pets"
                component={Pets}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={'grey'} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Shop"
                component={Shop}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="store-outline"
                            color={'grey'}
                            size={24}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Reports"
                component={Comunity}
                options={{
                    title: 'Comunity',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="users" color={'grey'} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user" color={'grey'} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}