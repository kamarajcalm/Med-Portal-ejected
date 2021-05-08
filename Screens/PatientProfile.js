import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView, FlatList } from 'react-native';
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

class PatientProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    changeClinic = () => {

    }
    componentDidMount() {
        console.log(this.props.user, "popo")
    }
    render() {
        return (
            <ScrollView style={{}}
                contentContainerStyle={{ paddingBottom: 90 ,marginTop:20}}
            >
                <View style={{ marginHorizontal: 10 }}>

                    <View style={{ backgroundColor: "gray", borderRadius: 10, elevation: 5 }}>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Age:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>90</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>height:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile?.height}</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Weight:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile?.weight}</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Mobile:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.mobile}</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Blood Group:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile?.bloodGroup}</Text>
                            </View>


                        </View>
                    </View>

                </View>
                 <View style={{margin:10}}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={[styles.text, { fontWeight: "bold", }]}>Health Issues</Text>
                    </View>
                 </View>
                <View style={{ margin: 10 }}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={[styles.text, { fontWeight: "bold", }]}>Address</Text>
                    </View>
                    <View style={{ backgroundColor: "gray", borderRadius: 10, elevation: 5 }}>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Area:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.address}</Text>
                            </View>


                        </View>
                        <View style={{ backgroundColor: "gray", borderRadius: 10, elevation: 5 }}>
                            <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                            >
                                <View style={{ flex: 0.5, justifyContent: "center" }}>
                                    <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>City:</Text>
                                </View>
                                <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.city}</Text>
                                </View>


                            </View>
                        </View>
                        <View style={{ backgroundColor: "gray", borderRadius: 10, elevation: 5 }}>
                            <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                            >
                                <View style={{ flex: 0.5, justifyContent: "center" }}>
                                    <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>State:</Text>
                                </View>
                                <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.state}</Text>
                                </View>


                            </View>
                        </View>
                        <View style={{ backgroundColor: "gray", borderRadius: 10, elevation: 5 }}>
                            <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                            >
                                <View style={{ flex: 0.5, justifyContent: "center" }}>
                                    <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Pincode:</Text>
                                </View>
                                <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.pincode}</Text>
                                </View>


                            </View>
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
export default connect(mapStateToProps, { selectTheme, selectClinic })(PatientProfile)