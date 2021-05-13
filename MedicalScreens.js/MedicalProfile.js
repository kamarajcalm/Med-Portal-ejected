import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView, AsyncStorage, ScrollView } from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const { height, width } = Dimensions.get("window");
import { Ionicons, AntDesign ,Entypo} from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
class MedicalProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    componentDidMount() {

    }
    logOut = async () => {
        this.setState({ showModal: false })
        await AsyncStorage.clear();
        return this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Login',

                    },

                ],
            })
        )
    }

    render() {
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <StatusBar backgroundColor={themeColor} />
                        {/* HEADERS */}
                        <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, justifyContent: "center", flexDirection: "row" }}>

                            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff", fontSize: 25, fontWeight: "bold" }]}>Profile</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 0.5, marginLeft: 20, alignItems: "center", justifyContent: 'center', flexDirection: "row" }}
                                onPress={() => { this.setState({ showModal: true }) }}
                            >
                                <AntDesign name="logout" size={24} color="#fff" />
                                <Text style={[styles.text, { marginLeft: 10, color: "#fff" }]}>Log out</Text>
                            </TouchableOpacity>
                        </View>


              
                     <View style={{ alignItems: "center", justifyContent: 'center', flexDirection: "row", }}>
                                <View>
                                    <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20, flexDirection: "row", marginLeft: 10 }}>
                                        <Image
                                            source={{ uri: this.props.user.profile.displayPicture || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                            style={{ height: 60, width: 60, borderRadius: 30 }}
                                        />
                                        <TouchableOpacity style={{}}
                                            onPress={() => { this.props.navigation.navigate('ProfileEdit') }}
                                        >
                                            <Entypo name="edit" size={20} color={themeColor} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: "center", marginTop: 20 }}>
                                        <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>{this.props.user.first_name}</Text>
                                    </View>
                                </View>

                        
                                 
                   
                        </View>
                        <ScrollView 
                        
                          style={{marginTop:10}}
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
                        </ScrollView>





                        <View>
                            <Modal
                                animationIn="slideInUp"
                                animationOut="slideOutDown"
                                isVisible={this.state.showModal}
                                onBackdropPress={() => { this.setState({ showModal: false }) }}
                            >
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ height: height * 0.3, width: width * 0.9, backgroundColor: "#fff", borderRadius: 20, alignItems: "center", justifyContent: "space-around" }}>
                                        <View>
                                            <Text style={[styles.text, { fontWeight: "bold", color: themeColor, fontSize: 20 }]}>Do you want to logout?</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-around", width, }}>
                                            <TouchableOpacity style={{ backgroundColor: themeColor, height: height * 0.05, width: width * 0.2, alignItems: "center", justifyContent: 'center', borderRadius: 10 }}
                                                onPress={() => { this.logOut() }}
                                            >
                                                <Text style={[styles.text, { color: "#fff" }]}>Yes</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ backgroundColor: themeColor, height: height * 0.05, width: width * 0.2, alignItems: "center", justifyContent: "center", borderRadius: 10 }}
                                                onPress={() => { this.setState({ showModal: false }) }}
                                            >
                                                <Text style={[styles.text, { color: "#fff" }]}>No</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
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
        user:state.selectedUser,
    }
}
export default connect(mapStateToProps, { selectTheme })(MedicalProfile);

