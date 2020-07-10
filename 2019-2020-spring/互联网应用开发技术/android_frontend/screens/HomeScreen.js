import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BookListScreen} from "./BookListScreen";
import {ProfileScreen} from "./ProfileScreen";
import {CartScreen} from "./CartScreen";
import {OrderScreen} from "./OrderScreen";

const Tab = createBottomTabNavigator();

export function HomeScreen({ navigation }) {
    return (
            <Tab.Navigator initialRouteName="BookList">
                <Tab.Screen name="BookList" component={BookListScreen} />
                <Tab.Screen name="Cart" component={CartScreen}/>
                <Tab.Screen name="Order" component={OrderScreen}/>
                {/*<Tab.Screen name="Profile" component={ProfileScreen} />*/}
            </Tab.Navigator>
    );
}
