import React, { Component } from 'react';
import { View, Text, Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Platform, } from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
const { height, width } = Dimensions.get("window");
const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNO: "7010117137",
            password: 'kamaraj',
        };
    }
    sendOTP = () => {
        // this.setState({loading:true})

        this.props.navigation.navigate('OTPScreen')
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={styles.container}>
              
                <View style={{flex:1,backgroundColor:themeColor}}> 
          <View style={{flex:0.3,alignItems:'center',justifyContent:"center"}}>
                <Animatable.Image
                    animation="fadeIn"
                    source={{ uri:"https://cdn.pixabay.com/photo/2017/08/21/02/24/png-2663876_960_720.png"}}
                    style={{height:"50%",width:"50%",resizeMode:"contain"}}
               />
          </View>
            <Animatable.View style={[{flex:0.7,backgroundColor:"#fff",borderTopLeftRadius:50,paddingLeft:30,paddingTop:30}]}
                animation="slideInUp"
            >
             <View>
                 <Text style={[styles.text,{}]}>Enter Mobile</Text>
                 <View style={{width:width*0.7,height:height*0.07}}>
                      <TextInput 
                        maxLength={10}
                        value={this.state.mobileNO}
                        selectionColor={themeColor}
                        autoFocus={true}
                  onChangeText={(text) => { this.setState({ mobileNO:text})}}
                        keyboardType="numeric"
                        style={{ width: '100%', height: "100%", borderBottomWidth: 1, borderColor: "#000",alignItems:'center',justifyContent:'flex-start',paddingLeft:20}}
                      />
                 </View>
            
                 <View style={{alignItems:"center",justifyContent:'center',marginTop:40}}>
                   
                    { !this.state.loading? <TouchableOpacity style={{backgroundColor:themeColor,width:width*0.4,height:height*0.06,alignItems:'center',justifyContent:"center",borderRadius:10}}
                            onPress={() => {this.sendOTP()}}
                      >
                          <Text style={{color:"#fff"}}>Login </Text>
                      </TouchableOpacity>:
                        <ActivityIndicator  size="large" color={themeColor}/>
                      }
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
        backgroundColor: themeColor
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30

    },
    text_header: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: "#05375a",
        fontSize: 18
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: "#05375a"
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(ForgotPassword);