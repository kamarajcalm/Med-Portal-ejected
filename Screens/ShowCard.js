import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView, FlatList } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import settings from '../AppSettings';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width
const url = settings.url
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import HttpsClient from '../api/HttpsClient';
import Toast from 'react-native-simple-toast';
import SimpleToast from 'react-native-simple-toast';
class ShowCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item,
            valid: this.props.route.params.item.active,
        };
    }
    IssuePriscription = async () => {
        let api = `${url}/api/prescription/issuedPrescription/`
        let sendData = {
            prescription: this.state.item.id,
            clinic: this.props.medical.id,

        }

        let post = await HttpsClient.post(api, sendData)
        if (post.type == "success") {
            SimpleToast.show("issued SuccessFully")
        }
    }

    header = () => {
        return (
            <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center", justifyContent: "space-between" }}>

                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>AF</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>morning</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>ANoon</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>Night</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>Qty</Text>
                </View>
              
            </View>
        )
    }

    renderItem = (item) => {
        return (
            <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center", justifyContent: "space-around" }}>

               
                { item.morning_count!=0&& <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>Morning</Text>

                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 ,marginTop:5}]}>{item.morning_count} {item.after_food ? " AF" : " BF"}</Text>
                </View>}
                {item.afternoon_count!=0&&<View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>After Noon</Text>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12, marginTop: 5 }]}>{item.afternoon_count} {item.after_food ? " AF" : " BF"}</Text>
                </View>}
                {item.night_count!=0&&<View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>Night</Text>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12, marginTop: 5 }]}>{item.night_count} {item.after_food ? " AF" : " BF"}</Text>
                </View>}
                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>Qty</Text>
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 ,marginTop:5}]}>{item.total_qty} </Text>
                </View>
            </View>
        )
    }
    showError = () => {
        Toast.showWithGravity("Priscription is not valid", Toast.SHORT, Toast.CENTER)
    }
    footer = () => {
        return (
            <View style={{ flexDirection: 'row', position: "absolute", bottom: 30 }}>
                <View style={{ height: height * 0.05, width: width * 0.4, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.item.active ? "green" : "red", borderRadius: 10, marginLeft: 20 }}>
                    <Text style={[styles.text, { color: "#fff" }]}>{this.state.item.active ? "valid" : "Invalid"}</Text>
                </View>
                {this.state.item.active ? <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: 'center', justifyContent: 'center', backgroundColor: themeColor, borderRadius: 10, marginLeft: 20 }}
                    onPress={() => { this.IssuePriscription() }}
                >
                    <Text style={[styles.text, { color: "#fff" }]}>Issue</Text>
                </TouchableOpacity> : <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: 'center', justifyContent: 'center', backgroundColor: "gray", borderRadius: 10, marginLeft: 20 }}
                    onPress={() => { this.showError() }}
                >
                    <Text style={[styles.text, { color: "#fff" }]}>Issue</Text>

                </TouchableOpacity>}
            </View>
        )
    }
    render() {
        const { item } = this.state
        let dp = null
        if (this.state.item.doctordetails.dp) {
            dp = `${url}${this.state.item.doctordetails.dp}`
        }

        console.log(item, "iiii")
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    {/*Headers  */}
                    <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, justifyContent: "center", flexDirection: "row" }}>
                        <TouchableOpacity style={{ flex: 0.2, marginLeft: 20, alignItems: "center", justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6, alignItems: 'center', justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff" }]}>Priscription Details</Text>
                        </View>
                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>

                        </View>
                    </View>
                    {/* DETAILS */}
                    <View >
                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                            <Text style={[styles.text, { fontSize: 20 }]}>{item.clinicname || "Clinic Name"}</Text>
                        </View>
                        <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "gray" }]}>{item.doctordetails.name || "Clinic Name"}</Text>

                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    source={{ uri: dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                    style={{ height: 30, width: 30, borderRadius: 15 }}
                                />
                            </View>
                        </View>
                        <FlatList
                            data={item.medicines}
                            keyExtractor={(item, index) => index.toString()}

                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ margin: 20 }}>
                                        <View style={{ flexDirection: "row" ,alignItems:"center"}}>
                                            <Text style={[styles.text, { fontWeight: "bold" }]}>{index + 1}.</Text>
                                            <Text style={[styles.text, { color: "#000" ,fontWeight:"bold",fontSize:18}]}>  {item.medicinename}</Text>
                                            <Text style={[styles.text, { color: "gray", fontWeight: "bold" }]}> * {item.days} days</Text>
                                        </View>
                                
                                        {
                                            this.renderItem(item)
                                        }
                                    </View>
                                )
                            }}
                        />

                    </View>
                 
                </SafeAreaView>
            </>
        );


    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily,
    },
    topSafeArea: {
        flex: 0,
        backgroundColor: themeColor
    },
    bottomSafeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
    elevation: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0,
        shadowRadius: 4.65,
        elevation: 6,
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user: state.selectedUser,
        medical: state.selectedMedical
    }
}
export default connect(mapStateToProps, { selectTheme })(ShowCard)