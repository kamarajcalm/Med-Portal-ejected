
import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView, Platform } from 'react-native';
import { Ionicons, Entypo, AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../AppSettings';
import medicine from '../components/Medicine';
import Medicine from '../components/Medicine';
import HttpsClient from '../api/HttpsClient';
const { height, width } = Dimensions.get("window");
const fontFamily = settings.fontFamily;
import { Linking } from 'react-native';

const themeColor = settings.themeColor;
const url = settings.url;
class ViewAppoinmentDoctors extends Component {
    constructor(props) {
        super(props);
        let item = this.props.route.params.item
        console.log(item)
        this.state = {
            item
        };
    }
    validateColor = (status) => {
        if (status == "Completed") {
            return "green"
        }
        if (status == "Accepted") {
            return "green"
        }
        if (status == "Pending") {
            return "orange"
        }
        if (status == "Rejected") {
            return "red"
        }
    }

    getCall =()=>{
        if (Platform.OS == "android") {
            Linking.openURL(`tel:${this.state.item?.patientname?.mobile}`)
        } else {

            Linking.canOpenURL(`telprompt:${this.state.item?.patientname?.mobile}`)
        }
    }
    chatDoctor = async () => {
        let api =null
        if (this.props.user.profile.occupation == "Doctor"){
             api = `${url}/api/prescription/createDoctorChat/?doctor=${this.props.user.id}&customer=${this.state.item.requesteduser}`
        }

        let data = await HttpsClient.get(api)
        
        if (data.type == "success") {
            this.props.navigation.navigate('Chat', { item: data.data })
        }
    }
    render() {
        let dp = null
        if (this.state.item.doctordetails.dp) {
            dp = `${url}${this.state.item.doctordetails.dp}`
        }
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>

                    <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.7, }}>
                            <Text style={[styles.text, { color: "#fff" }]}> Appoinment Details</Text>
                        </View>

                    </View>
                    <View style={{}}>
                        {/* Clinic Details */}

                        <View>
                            <Text style={[styles.text, { marginTop: 20, textAlign: 'center', fontWeight: "bold", fontSize: 18 }]}>{this.state.item.clinicname}</Text>
                            <View style={{ alignSelf: "flex-end", flexDirection: "row", marginTop: 10 }}>

                                <Image
                                    style={{ height: 60, width: 60, borderRadius: 30, marginRight: 10 }}
                                    source={{ uri: dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                />
                                <View style={{ alignItems: "center", justifyContent: "center", height: 60, marginRight: 10 }}>
                                    <Text style={[styles.text]}>{this.state.item.doctordetails.name}</Text>
                                </View>

                            </View>
                        </View>
                        {/* Appoinment Details */}
                        <View style={{ margin: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.text]}>Appoinment Status:</Text>
                                <Text style={[styles.text, { marginLeft: 10, color: this.validateColor(this.state.item.status) }]}>{this.state.item.status}</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <Text style={[styles.text, { fontWeight: "bold" }]}>Requested Date:</Text>
                                <Text style={[styles.text, { marginLeft: 10, color: "gray" }]}>{this.state.item.requesteddate}</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <Text style={[styles.text, { fontWeight: "bold" }]}>Requested Time:</Text>
                                <Text style={[styles.text, { marginLeft: 10, color: "gray" }]}>{this.state.item.requestedtime}</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <Text style={[styles.text, { fontWeight: "bold" }]}>Accepted Date:</Text>
                                <Text style={[styles.text, { marginLeft: 10, color: "gray" }]}>{this.state.item.accepteddate}</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <Text style={[styles.text, { fontWeight: "bold" }]}>Accepted Time:</Text>
                                <Text style={[styles.text, { marginLeft: 10, color: "gray" }]}>{this.state.item.acceptedtime}</Text>
                            </View>
                        </View>
                    </View>

                </SafeAreaView>
                <View style={{ position: "absolute", bottom: 50, flexDirection: "row", justifyContent: "space-around", width, }}>
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", flex: 0.5 }}
                        onPress={() => {
                            this.getCall(this.state.item)
                        }}

                    >
                        <Feather name="phone-call" size={24} color="black" />
                        <Text>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", flex: 0.5 }}
                        onPress={() => { this.chatDoctor() }}
                    >
                        <Ionicons name="chatbubbles" size={24} color="black" />
                        <Text>With Patient</Text>
                    </TouchableOpacity>
                </View>
            
            </>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },


})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user: state.selectedUser
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewAppoinmentDoctors);