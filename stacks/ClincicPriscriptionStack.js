import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/Profile';
import ProfileEdit from '../Screens/ProfileEdit';
import Appointments from '../Screens/Appointments';
import ProfileView from '../Screens/ProfileView';
import PriscriptionIssue from '../MedicalScreens.js/PriscriptionIssue';
import SearchPateint from '../MedicalScreens.js/SearchPateint';
const Stack = createStackNavigator();
export default class ClincicPriscriptionStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="PriscriptionIssue" component={PriscriptionIssue} options={{ headerShown: false }} />
                <Stack.Screen name="SearchPateint" component={SearchPateint} options={{ headerShown: false }} />
                
            </Stack.Navigator>
        );
    }
}