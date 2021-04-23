import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import settings from '../AppSettings';
import axios from 'axios';
import Modal from 'react-native-modal';
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
import { Ionicons, Entypo, AntDesign, Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import * as  ImagePicker from 'expo-image-picker';
import { TextInput } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import HttpsClient from '../api/HttpsClient';

import Toast from 'react-native-simple-toast';
import authAxios from '../api/authAxios';
const url = settings.url
class AddDoctor extends Component {
    constructor(props) {
        let clinic = props.route.params.clinic
        console.log(clinic)
        super(props);
        this.state = {
            openingTime: null,
            closingTime: null,
            mode: 'time',
            date: new Date(),
            show1: false,
            show2: false,
            doctor:null,
            clinic
        };
    }

    backFunction = async (item) => {
        console.log(item, "bbbbbb")
        this.setState({ doctor: item })


    }
    onChange1 = (selectedDate) => {
        if (selectedDate.type == "set") {
            this.setState({ openingTime: moment(new Date(selectedDate.nativeEvent.timestamp)).format('h:mm a'), show1: false, startingtime: new Date(selectedDate.nativeEvent.timestamp) }, () => {
                console.log(this.state.openingTime, "jjjj")

            })

        } else {
            return null
        }

    }
    onChange2 = (selectedDate) => {
        if (selectedDate.type == "set") {
            this.setState({ closingTime: moment(new Date(selectedDate.nativeEvent.timestamp)).format('h:mm a'), show2: false, }, () => {
                console.log(this.state.closingTime, "jjjj")

            })

        } else {
            return null
        }

    }
    addDoctor = async()=>{
        let api  =`${url}/api/prescription/addDoctors/`
        let sendData ={
            doctor: this.state.doctor.user,
            clinic:this.state.clinic,
            fromTime: this.state.openingTime,
            toTime: this.state.closingTime
        }
        let post  =await HttpsClient.post(api,sendData)
        if(post.type="success"){
              Toast.show("Added Successfully");
              setTimeout(()=>{
                  this.props.navigation.goBack()
              })
        }else{
            Toast.show("try again");
        }
    }
    componentDidMount() {

    }
    render() {

        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    <View style={{ flex: 1, }}>
                        <StatusBar backgroundColor={themeColor} />
                        {/* Headers */}
                        <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, justifyContent: "center", flexDirection: "row" }}>

                            <TouchableOpacity style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                            </TouchableOpacity>
                            <View style={{ flex: 0.6, alignItems: 'center', justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Add Doctor</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>

                            </View>
                        </View>
                        <View style={{ flex: 1 }}>


                            <ScrollView style={{ margin: 20 }}
                                showsVerticalScrollIndicator={false}
                            >
                            
                                <View >
                                    <Text style={styles.text}>Name</Text>
                                    <TouchableOpacity
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10, justifyContent: "center" }}
                                        onPress={() => { this.props.navigation.navigate('SearchDoctors', { backFunction: (item) => { this.backFunction(item) } }) }}
                                    >
                                        <Text>{this.state?.doctor?.name}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: height * 0.07, flexDirection: "row", }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.text}>From Time</Text>
                                        <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center", }}>
                                            <TouchableOpacity
                                                onPress={() => { this.setState({ show1: true }) }}
                                            >
                                                <Entypo name="clock" size={24} color="black" />

                                            </TouchableOpacity>

                                            <Text style={{ marginLeft: 10 }}>{this.state.openingTime}</Text>
                                        </View>

                                    </View>

                                    <View style={{ flex: 0.5, }}>
                                        <Text style={styles.text}>To Time</Text>
                                        <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center", }}>
                                            <TouchableOpacity
                                                onPress={() => { this.setState({ show2: true }) }}
                                            >
                                                <Entypo name="clock" size={24} color="black" />

                                            </TouchableOpacity>

                                            <Text style={{ marginLeft: 10 }}>{this.state.closingTime}</Text>
                                        </View>

                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' ,marginTop:20}}>
                                    <TouchableOpacity style={{ width: width * 0.4, height: height * 0.05, borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: themeColor }}
                                        onPress={() => { this.addDoctor() }}
                                    >
                                        <Text style={[styles.text, { color: "#fff" }]}>Add</Text>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>

                        </View>

                
                        {this.state.show1 && (
                            <DateTimePicker
                                testID="TimePicker1"
                                value={this.state.date}
                                mode={this.state.mode}
                                is24Hour={false}
                                display="default"
                                onChange={(time) => { this.onChange1(time) }}
                            />
                        )}
                        {this.state.show2 && (
                            <DateTimePicker
                                testID="TimePicker2"
                                value={this.state.date}
                                mode={this.state.mode}
                                is24Hour={false}
                                display="default"
                                onChange={(time) => { this.onChange2(time) }}
                            />
                        )}
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
    modalView1: {
        backgroundColor: '#fff',
        marginHorizontal: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'flex-end',
        width: width
    }
})

const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(AddDoctor)