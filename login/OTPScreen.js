import React, { Component } from 'react';
import { View, Text, Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, KeyboardAvoidingView,} from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
const { height, width } = Dimensions.get("window");
const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
class OTPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
login =async()=>{
    let login = await AsyncStorage.setItem('login','true')
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
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={styles.container}>
            <View style={{ flex: 1, backgroundColor: themeColor }}>
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: "center" }}>
                    <Animatable.Image
                        animation="fadeIn"
                        source={{ uri: "https://cdn.pixabay.com/photo/2017/08/21/02/24/png-2663876_960_720.png" }}
                        style={{ height: "50%", width: "50%", resizeMode: "contain" }}
                    />
                </View>
                <Animatable.View style={[{ flex: 0.5, backgroundColor: "#fff", borderTopLeftRadius: 50, paddingLeft: 30, paddingTop: 70 }]}
                    animation="slideInUp"
                >
                    <View>
                        <Text style={[styles.text, {}]}>Enter OTP</Text>
                        <View style={{ width: width * 0.7, height: height * 0.07 }}>
                            <TextInput
                                autoFocus={true}
                                keyboardType="numeric"
                                style={{ width: '100%', height: "100%", borderBottomWidth: 1, borderColor: "#000", alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 20 }}
                            />
                        </View>
                        <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 40 }}>
                            <TouchableOpacity>
                                <Text style={[styles.text]}>Resend OTP</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: themeColor, width: width * 0.4, height: height * 0.06, alignItems: 'center', justifyContent: "center", borderRadius: 10 ,marginTop:20}}
                              onPress={()=>{this.login()}}
                            >
                                <Text style={{ color: "#fff" }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
            </View>
    </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    container: {
        flex: 1,
    },
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(OTPScreen);