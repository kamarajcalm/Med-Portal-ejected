import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import settings from '../AppSettings';
import axios from 'axios';
import Modal from 'react-native-modal';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    request = async () => {
        let data = await axios.get('http:192.168.29.98:8000/api/profile/users')
        console.log(data.data, "hhhh")
    }
   
    componentDidMount() {
        // this.request()
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
                            <TouchableOpacity style={{ flex: 0.2, marginLeft: 20, alignItems: "center", justifyContent: 'center' }}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                            </TouchableOpacity>
                            <View style={{ flex: 0.6, alignItems: 'center', justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>Profile</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>

                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ height: height * 0.12, alignItems: "center", justifyContent: 'center', }}>
                                <Image
                                    source={{ uri: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                    style={{ height: 60, width: 60, borderRadius: 30 }}
                                />
                                <Text style={[styles.text]}>kamaraj</Text>
                            </View>
                       
                            <ScrollView style={{marginBottom:90}}>
                                <View style={{ margin: 20 }}>
                                    <Text style={[styles.text], { textDecorationLine: "underline", fontWeight: "bold", fontSize: 18, color: "gray" }}>INFO:</Text>
                                </View>
                                <View style={{ marginLeft: 27, flexDirection: "row" ,borderColor:"gray",borderBottomWidth:1,height:height*0.05,alignItems:"center"}}>
                                    <Text style={[styles.text], { fontWeight: "bold" }}>Age:</Text>
                                    <Text style={[styles.text, { marginLeft: 10 }]}>20</Text>
                                </View>
                                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center"}}>
                                    <Text style={[styles.text], { fontWeight: "bold" }}>height:</Text>
                                    <Text style={[styles.text, { marginLeft: 10 }]}>6.7 feet</Text>
                                </View>
                                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center"}}>
                                    <Text style={[styles.text], { fontWeight: "bold" }}>weight: </Text>
                                    <Text style={[styles.text, { marginLeft: 10 }]}>50kg</Text>
                                </View>
                                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center"}}>
                                    <Text style={[styles.text], { fontWeight: "bold" }}>Age:</Text>
                                    <Text style={[styles.text, { marginLeft: 10 }]}>50kg</Text>
                                </View>
                                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center" }}>
                                    <Text style={[styles.text], { fontWeight: "bold" }}>blood group: </Text>
                                    <Text style={[styles.text, { marginLeft: 10 }]}> o+ve</Text>
                                </View>
                                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center" }}>
                                    <Text style={[styles.text], { fontWeight: "bold" }}>Medical history: </Text>
                                    <Text style={[styles.text, { marginLeft: 10 }]}>none</Text>
                                </View>
                                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center" }}>
                                    <Text style={[styles.text], { fontWeight: "bold" }}>Location: </Text>
                                    <Text style={[styles.text, { marginLeft: 10 }]}>Bengaluru</Text>
                                </View>
                                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center"}}>
                                    <Text style={[styles.text], { fontWeight: "bold" }}>PhoneNo: </Text>
                                    <Text style={[styles.text, { marginLeft: 10, fontWeight: "bold", color: "gray" }]}>7010117137</Text>
                                </View>
                            </ScrollView>
                         
                        </View>
                       

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

    }
}
export default connect(mapStateToProps, { selectTheme })(ProfileView)