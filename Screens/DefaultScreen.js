import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, ActivityIndicator, StatusBar, AsyncStorage} from 'react-native';
import settings from '../AppSettings';
import { connect, connectAdvanced } from 'react-redux';
import { selectTheme ,selectUser} from '../actions';
const { height, width } = Dimensions.get("window");
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HttpsClient from '../api/HttpsClient';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const url = settings.url;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

 class DefaultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        token:null
    };
  }
     getUserDetails = async () => {
      //  return this.props.navigation.dispatch(
      //    CommonActions.reset({
      //      index: 0,
      //      routes: [
      //        {
      //          name: 'MedicalTab',

      //        },

      //      ],
      //    })
      //  )
         const login = await AsyncStorage.getItem("login")
       this.registerForPushNotificationsAsync().then(token => this.setState({token},()=>{
         alert(token,"dwd")
       }));
     
         if (login) {
              const data = await HttpsClient.get(`${url}/api/HR/users/?mode=mySelf&format=json`);
              console.log(data)
              if(data.type =="success"){
                 
                this.props.selectUser(data.data[0]);
                if (data.data[0].is_superuser) {
                  return this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'AdminTab',

                        },

                      ],
                    })
                  )
                }
                if (data.data[0].profile.occupation == "MediacalRep" || data.data[0].profile.occupation == "MedicalRecoptionist"){
                  return this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'MedicalTab',

                        },

                      ],
                    })
                  )
                }
                if (data.data[0].profile.occupation == "Doctor" || data.data[0].profile.occupation == "ClinicRecoptionist" || data.data[0].profile.occupation == "Customer") {
                  return this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'MainTab',

                        },

                      ],
                    })
                  )
                }

              }
              else {
                return this.props.navigation.navigate('Login')
              }
              
         }else{
           return this.props.navigation.navigate('Login')
         }
     }
  componentDidMount(){
      this.getUserDetails()
  }
  registerForPushNotificationsAsync =async function () {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
  render() {
    return (
          <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.bottomSafeArea}>
                <StatusBar backgroundColor={themeColor} />
                <View style={{flex:1,alignItems:"center",justifyContent:'center',backgroundColor:themeColor}}>
                     <ActivityIndicator color={"#fff"} size="large"/>
                </View>
            </SafeAreaView>
            </>
    );
  }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    topSafeArea: {
        flex: 0,
        backgroundColor: themeColor
    },
    bottomSafeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user: state.selectedUser,
    }
}
export default connect(mapStateToProps, { selectTheme, selectUser})(DefaultScreen);