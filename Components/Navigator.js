import Shop from '../Screens/Shop';
import Details from '../Screens/Details';
import AddCard from '../Screens/AddCard';
import ConfirmOrder from '../Screens/ConfirmOrder';
import Filter from '../Screens/Filter';
import OrderComplete from '../Screens/OrderComplete';
import AddItem from '../Screens/AddItem';
import Comunity from '../Screens/Comunity';
import Profile from '../Screens/Profile';
import PetHistory from '../Screens/PetHistory';
import AppSubmit from '../Screens/AppSubmit';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import VerifyEmail from '../Screens/VerifyEmail';
import RegisterNext from '../Screens/RegisterNext';
import AppSubmitted from '../Screens/AppSubmitted';
import AddAnimal from '../Screens/AddAnimal';
import PetDetails from '../Screens/Home';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import OrderHistory from '../Screens/OrderHistory';
import WishList from '../Screens/WishList';
import Cart from '../Screens/Cart';

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

                {/* <Stack.Screen
                    name="Login"
                    component={Login}
                    initialParams={{ userid: 'rimsha' }}
                    options={{ title: 'Login' }}
                /> */}

                <Stack.Screen
                    name="AppSubmitted"
                    component={AppSubmitted}
                    options={{ title: 'AppSubmitted', headerShown: false }}
                />

                <Stack.Screen
                    name="Home"
                    component={TabBar}
                    options={{ title: 'Home', headerShown: false }}
                />

                <Stack.Screen
                    name="OrderHistory"
                    component={OrderHistory}
                    options={{ title: 'Order History' }}
                />

                <Stack.Screen
                    name="PetDetails"
                    component={PetDetails}
                    options={{ title: 'Shop', headerShown: false }}
                />


                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{ title: 'Details', headerShown: false }}
                />

                <Stack.Screen
                    name="AddAnimal"
                    component={AddAnimal}
                    options={{ title: 'Register', headerShown: false }}
                />
                <Stack.Screen
                    name="AddCard"
                    component={AddCard}
                    options={{ title: 'AddCard', headerShown: false }}
                />

                <Stack.Screen
                    name="ConfirmOrder"
                    component={ConfirmOrder}
                    options={{ title: 'ConfirmOrder', headerShown: false }}
                />

                <Stack.Screen
                    name="Filter"
                    component={Filter}
                    options={{ title: 'Filter' }}
                />

                <Stack.Screen
                    name="PetHistory"
                    component={PetHistory}
                    options={{ title: 'PetHistory' }}
                />

                <Stack.Screen
                    name="OrderComplete"
                    component={OrderComplete}
                    options={{ title: 'OrderComplete', headerShown: false }}
                />

                <Stack.Screen
                    name="RegisterNext"
                    component={RegisterNext}
                    options={{ title: 'Add Pet' }}
                />

                <Stack.Screen
                    name="AppSubmit"
                    component={AppSubmit}
                    options={{ title: 'AppSubmit', headerShown: false }}
                />
                <Stack.Screen
                    name="WishList"
                    component={WishList}
                    options={{ title: 'Wish List' }}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{ title: 'Cart' }}
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
                name="AddItem"
                component={AddItem}
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