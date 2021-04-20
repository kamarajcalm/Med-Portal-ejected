import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Medicals from '../AdminScreens/Medicals';
import CreateMedicals from '../AdminScreens/CreateMedicals';
import CreateRep from '../AdminScreens/CreateRep';
import SearchRep from '../AdminScreens/SearchRep';
const Stack = createStackNavigator();
export default class MedicalStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Medicals" component={Medicals} options={{ headerShown: false }} />
                <Stack.Screen name="CreateMedicals" component={CreateMedicals} options={{ headerShown: false }} />
                <Stack.Screen name="CreateRep" component={CreateRep} options={{ headerShown: false }} />
                <Stack.Screen name="SearchRep" component={SearchRep} options={{ headerShown: false }} />

            </Stack.Navigator>
        );
    }
}