import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Priscription from '../Screens/Priscription';
import ShowCard from '../Screens/ShowCard';
import AddPrescription from '../Screens/AddPrescription';
import SearchMedicines from '../Screens/SearchMedicines';
import LoginScreen from '../login/OnboardingScreen';
import ProfileView from '../Screens/ProfileView';

const Stack = createStackNavigator();
export default class PriscriptionStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                {/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} /> */}
                <Stack.Screen name="Priscription" component={Priscription} options={{ headerShown: false }} />
                <Stack.Screen name="showCard" component={ShowCard} options={{ headerShown: false }} />
                <Stack.Screen name="addPriscription" component={AddPrescription} options={{ headerShown: false }} />
                <Stack.Screen name="SearchMedicines" component={SearchMedicines} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileView" component={ProfileView} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}