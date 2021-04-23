import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, ActivityIndicator, StatusBar, AsyncStorage} from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme ,selectUser} from '../actions';
const { height, width } = Dimensions.get("window");
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HttpsClient from '../api/HttpsClient';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const url = settings.url;
 class DefaultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }
     getUserDetails = async () => {
         const login = await AsyncStorage.getItem("login")
        
      console.log(login,"jjj")
         if (login) {
              const data = await HttpsClient.get(`${url}/api/HR/users/?mode=mySelf&format=json`);
              console.log(data)
              this.props.selectUser(data.data[0]);
              if (data.data[0].is_superuser){
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
           if (!data.data[0].is_superuser) {
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
      
         }else{
           return this.props.navigation.navigate('Login')
         }
     }
  componentDidMount(){
      this.getUserDetails()
  }

  render() {
    return (
          <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.bottomSafeArea}>
                <StatusBar backgroundColor={themeColor} />
                <View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
                     <ActivityIndicator color={themeColor} size="large"/>
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