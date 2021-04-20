import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import {
    NavigationContainer, DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons } from '@expo/vector-icons';

import MyTabBar from '../components/MyTabBar';

import { Appearance, useColorScheme } from 'react-native-appearance';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import PriscriptionStack from '../stacks/PriscriptionStack';
import DoctorsStack from '../stacks/DoctorsStack';
import ChatStack from '../stacks/ChatStack';
import ProfileStack from '../stacks/ProfileStack';
import LoginStack from '../stacks/LoginStack';
import TabNavigator from './TabNavigator';
import AppLoading from 'expo-app-loading';
import ProfileEdit from '../Screens/ProfileEdit';
import AdminTab from './AdminTab';
import DefaultScreen from '../Screens/DefaultScreen';
import MediacalTab from './MediacalTab';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const Main = {
    MainTab: TabNavigator,

};

const authScreens = {
    Login: LoginStack,
};
export default class AppNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            isReady: false,
        };
    }
    getUserDetails = async () => {
        const login = await AsyncStorage.getItem("login")

        console.log(login, "lllllll")
        if (login) {
            this.setState({ logged: true })
        }
    }
    getTheme = async () => {
        let theme = await AsyncStorage.getItem("theme")
        this.props.selectTheme(theme)
    }
  
    componentDidMount() {
        this.getUserDetails()
    }
   
    render() {
      
        return (
            <NavigationContainer >
                <Stack.Navigator>
                    {/* {Object.entries({
                        ...(this.state.logged ? Main : authScreens),
                        ...(!this.state.logged && Main),
                      
                    }).map(([name, component]) => (
                        <Stack.Screen name={name} component={component} options={{ headerShown: false }} />
                    ))} */}
                    <Stack.Screen name="DefaultScreen" component={DefaultScreen} options={{ headerShown: false }} />
                    

                    <Stack.Screen name="MainTab" component={TabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginStack} options={{ headerShown: false }} />
                    <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false }} />
                    <Stack.Screen name="AdminTab" component={AdminTab} options={{ headerShown: false }} />
                    <Stack.Screen name="MedicalTab" component={MediacalTab} options={{ headerShown: false }} />
                 </Stack.Navigator>
                
            </NavigationContainer>
        );
    }
}
