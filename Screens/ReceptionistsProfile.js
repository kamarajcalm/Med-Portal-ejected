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
import { selectTheme, selectClinic } from '../actions';
import { NavigationContainer, CommonActions } from '@react-navigation/native';

class ReceptionistsProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    changeClinic = () => {

    }
    render() {
        return (
            <ScrollView style={{}}
                contentContainerStyle={{ paddingBottom: 90 }}
            >

                <View style={{ marginLeft: 27, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, minHeight: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Age:</Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: "flex-end", marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, {}]}>20</Text>
                    </View>

                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, minHeight: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>occupation:</Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: "flex-end", marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>Clinic Receptionist</Text>
                    </View>

                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, minHeight: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Experience: </Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>10 years</Text>
                    </View>


                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, minHeight: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Patient Treated:</Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>50</Text>
                    </View>

                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, minHeight: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Working in Clinics: </Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}> 2</Text>
                    </View>

                </View>

                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, minHeight: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Location: </Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>{this.props.user.profile.city}</Text>
                    </View>

                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, minHeight: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>PhoneNo: </Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>{this.props.user.profile.mobile}</Text>
                    </View>

                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, minHeight: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Total Priscription: </Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <Text style={[styles.text, { marginLeft: 10 }]}>250</Text>
                    </View>

                </View>
                <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 0.5, minHeight: height * 0.05, }}>
                    <View style={{ flex: 0.5, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Clinic Name: </Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                        <View>
                            <Text style={[styles.text, { marginLeft: 10 }]}>{this.props.user?.profile.recopinistclinics[0].clinicname}</Text>
                        </View>

                    </View>

                </View>
              
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily,
        fontSize: 18
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
        clinic: state.selectedClinic
    }
}
export default connect(mapStateToProps, { selectTheme, selectClinic })(ReceptionistsProfile)