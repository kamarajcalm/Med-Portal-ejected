import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/Profile';
import ProfileEdit from '../Screens/ProfileEdit';
import Appointments from '../Screens/Appointments';
import ProfileView from '../Screens/ProfileView';
import ViewAppoinments from '../Screens/ViewAppoinments';
import ChatScreen from '../Screens/ChatScreen';
import ViewAppoinmentDoctors from '../Screens/ViewAppoinmentDoctors';
const Stack = createStackNavigator();
export default class AppointmentStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Appoinments" component={Appointments} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileView" component={ProfileView} options={{ headerShown: false }} />
                <Stack.Screen name="ViewAppoinment" component={ViewAppoinments} options={{ headerShown: false }} />
                <Stack.Screen name="ViewAppoinmentDoctors" component={ViewAppoinmentDoctors} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}
