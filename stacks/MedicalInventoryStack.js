import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/Profile';
import ProfileEdit from '../Screens/ProfileEdit';
import Inventory from '../MedicalScreens.js/Inventory';
import AddItem from '../MedicalScreens.js/AddItem';
import SearchMedicinesMedical from '../MedicalScreens.js/SearchMedicinesMedical';
const Stack = createStackNavigator();
export default class MedicalInventoryStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Inventory" component={Inventory} options={{ headerShown: false }} />
                <Stack.Screen name="AddItem" component={AddItem} options={{ headerShown: false }} />
                <Stack.Screen name="SearchMedicinesMedical" component={SearchMedicinesMedical} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}