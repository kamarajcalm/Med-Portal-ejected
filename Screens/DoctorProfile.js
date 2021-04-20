import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import settings from '../AppSettings';
import axios from 'axios';
import Modal from 'react-native-modal';
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
import { Ionicons, Entypo, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { NavigationContainer, CommonActions } from '@react-navigation/native';

export default class DoctorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView style={{ marginBottom: 90 }}>

                <View style={{ marginLeft: 27, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, height: height * 0.05, }}>
                    <View style={{flex:0.5,justifyContent:"center"}}>
                        <Text style={[styles.text,{fontWeight:"bold"}]}>Age:</Text>
                    </View>
                    <View style={{flex:0.5,alignItems:"flex-end",marginRight:10,justifyContent:"center"}}>
                        <Text style={[styles.text, {}]}>20</Text>
                    </View>
                   
                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, height: height * 0.05, }}>
                     <View style={{flex:0.5,justifyContent:'center'}}>
                        <Text style={[styles.text,{fontWeight:"bold"}]}>Specialization:</Text>
                     </View>
                    <View style={{flex:0.5,alignItems:"flex-end",marginRight:10,justifyContent:"center"}}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>heart surgeon</Text>
                    </View>
                    
                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, height: height * 0.05,  }}>
                    <View style={{flex:0.5,justifyContent:"center"}}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Experience: </Text>
                    </View>
                    <View style={{flex:0.5,alignItems:'flex-end',marginRight:10,justifyContent:"center"}}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>10 years</Text>
                    </View>
                 
                    
                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, height: height * 0.05,  }}>
                    <View style={{flex:0.5,justifyContent:"center"}}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Patient Treated:</Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>50</Text>
                   </View>
                    
                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, height: height * 0.05, }}>
                      <View style={{flex:0.5,justifyContent:"center"}}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Working in Clinics: </Text>
                      </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}> 2</Text>
                     </View>
                 
                </View>
                
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, height: height * 0.05,  }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Location: </Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>Bengaluru</Text>
                    </View>
                
                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, height: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>PhoneNo: </Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>7010117137</Text>
                    </View>
                   
                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, height: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Total Priscription: </Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>250</Text>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily,
        fontSize:18
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