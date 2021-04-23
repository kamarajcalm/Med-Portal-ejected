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
import AppointmentStack from '../stacks/AppointmentStack';
const Tab = createBottomTabNavigator();


class TabNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getTheme = async () => {
        // let theme = await AsyncStorage.getItem("theme")
        // this.props.selectTheme(theme)
    }
    componentDidMount() {
        this.getTheme()
    }
    getTabBarVisibility = (route) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : ''
        if (routeName == "addPriscription") {
            return false
        }
        if (routeName == "SearchMedicines") {
            return false
        }
        console.log(routeName, "kkkk")
        return true
    }
    getTabBarVisibility2 = (route) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : ''
        if (routeName == "ChatScreen") {
            return false
        }

        return true
    }
    getTabBarVisibility3 = (route) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : ''
        if (routeName == "SearchDoctors") {
            return false
        }
        if (routeName == "ProfileView"){
            return false
        }
        if (routeName == "MakeAppoinment") {
            return false
        }
        return true
    }
 

    render() {
        return (
            
                <Tab.Navigator
                    tabBar={props => <MyTabBar {...props} />}
                >
                    <Tab.Screen name="priscription" component={PriscriptionStack}
                        options={({ route }) => ({

                            tabBarVisible: this.getTabBarVisibility(route),

                        })}
                    />
                <Tab.Screen name="Appoinments" component={AppointmentStack}
                   
                />
                    <Tab.Screen name="doctor" component={DoctorsStack}
                        options={({ route }) => ({

                            tabBarVisible: this.getTabBarVisibility3(route),

                        })}

                    />
                    <Tab.Screen name="chat" component={ChatStack}
                        options={({ route }) => ({

                            tabBarVisible: this.getTabBarVisibility2(route),

                        })}

                    />
                    <Tab.Screen name="profile" component={ProfileStack}
                   

                    />

                </Tab.Navigator>
       
        );
    }
}
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(TabNavigator)