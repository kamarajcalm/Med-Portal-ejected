import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView, ScrollView, Linking } from 'react-native';
import { Ionicons, Entypo, AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../AppSettings';
import medicine from '../components/Medicine';
import Medicine from '../components/Medicine';
import HttpsClient from '../api/HttpsClient';
const { height, width } = Dimensions.get("window");
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const url = settings.url;
import moment from 'moment-timezone';
const date = new Date();
const day = date.getDay();

class ViewMedicals extends Component {
    constructor(props) {
        let item = props.route.params.item

        super(props);
        this.state = {
            item,
            clinicDetails: null,
            showAll: false,
            doctors: [],
            showAllDoctorTimings: false,
            selectedDoctor: null
        };
    }
    
    getClinicDetails = async () => {
        const api = `${url}/api/prescription/clinics/${this.state.item.pk}/`
        console.log(api)
        const data = await HttpsClient.get(api)
        if (data.type == "success") {
            this.setState({ clinicDetails: data.data })
      
        }
    }
    componentDidMount() {
     
        this.getClinicDetails()
        console.log(this.props.user)
    }
    getTodayTimings = (today, item) => {
        return (
            item.clinicShits[today].map((i, index) => {
                return (
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>{index + 1}.</Text>
                        <Text style={[styles.text, { marginLeft: 5 }]}>{i.timings[0][0]}</Text>
                        <Text style={[styles.text]}>-</Text>
                        <Text style={[styles.text]}>{i.timings[0][1]}</Text>
                    </View>
                )
            })
        )
    }
    getTodayTimings2 = (item) => {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let today = days[date.getDay()]
        return (
            item.clinicShits[today].map((i, index) => {
                return (
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Text>{index + 1}.</Text>
                        <Text style={{ marginLeft: 5 }}>{i.timings[0][0]}</Text>
                        <Text>-</Text>
                        <Text>{i.timings[0][1]}</Text>
                    </View>
                )
            })
        )



    }
    chatClinic = async () => {
        let api = `${url}/api/prescription/createClinicChat/?clinic=${this.state.item.pk}&customer=${this.props.user.id}`

        let data = await HttpsClient.get(api)


        if (data.type == "success") {
            this.props.navigation.navigate('Chat', { item: data.data })
        }
    }
    getOpened = (openTime = this.state?.clinicDetails?.working_hours[date.getDay()][0], closeTime = this.state?.clinicDetails?.working_hours[date.getDay()][1], timezone = "Asia/Kolkata") => {



        const now = moment.tz(timezone);

        const date = now.format("YYYY-MM-DD");
        const storeOpenTime = moment.tz(date + ' ' + openTime, "YYYY-MM-DD h:mmA", timezone);
        const storeCloseTime = moment.tz(date + ' ' + closeTime, "YYYY-MM-DD h:mmA", timezone);

        let check;
        if (storeCloseTime.isBefore(storeOpenTime)) {
            // Handle ranges that span over midnight
            check = now.isAfter(storeOpenTime) || now.isBefore(storeCloseTime);
        } else {
            // Normal range check using an inclusive start time and exclusive end time
            check = now.isBetween(storeOpenTime, storeCloseTime, null, '[)');
        }
        console.log(openTime, closeTime, check, "kkk")
        return check ? "open" : "closed";
    }
    getDay = (day) => {

        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        return days[day]

    }
    validateOpen = () => {
        if (this.getOpened() == "open") {
            return (
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "green" }]}>Open</Text>

                    </View>
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}
                        onPress={() => { this.setState({ showAll: !this.state.showAll }) }}
                    >
                        <Text style={[styles.text, { marginLeft: 10 }]}>closes at {this.state.clinicDetails?.working_hours[date.getDay()][1]}</Text>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <AntDesign name={this.state.showAll ? "up" : "down"} size={15} color="black" />
                        </View>

                    </TouchableOpacity>
                </View>

            )
        } else {
            return (
                <View style={{ flexDirection: "row", }}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { fontSize: 18, color: "red" }]}>Closed</Text>

                    </View>
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}
                        onPress={() => { this.setState({ showAll: !this.state.showAll }) }}
                    >
                        <Text style={[styles.text, { marginLeft: 10 }]}>opens at {this.state?.clinicDetails?.working_hours[date.getDay() + 1][0]} {this.getDay(date.getDay() + 1)}</Text>
                        <AntDesign name={this.state.showAll ? "up" : "down"} size={24} color="black" />
                    </TouchableOpacity>
                </View>


            )
        }
    }
    render() {
        let dp = null
        if (this.state.item.displayPicture) {
            dp = `${url}${this.state.item.displayPicture}`
        }



        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    <View style={{ flex: 1 }}>
                        {/* HEADERS */}
                        <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                            <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                            </TouchableOpacity>
                            <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff", fontWeight: "bold", fontSize: 20 }]}> {this.state.item.title.toUpperCase()}</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                            </View>
                        </View>

                        <ScrollView
                            style={{}}
                            contentContainerStyle={{ paddingBottom: 130 }}
                        >
                            <Image
                                style={{ height: height * 0.2, resizeMode: "cover" }}
                                source={{ uri: dp }}
                            />
                            <View style={{ padding: 10, }}>
                                <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>Address:</Text>
                                <View style={{ padding: 10, }}>
                                    <Text style={[styles.text]}>{this.state?.clinicDetails?.address}</Text>
                                </View>
                            </View>
                            <View style={{ padding: 10, }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 18, }]}>Hours: </Text>
                                    {
                                        this.validateOpen()
                                    }


                                </View>
                                {/* <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                    <View>
                                        <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>OpeningTime:</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>ClosingTime:</Text>
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                    <View>
                                        <View style={{ alignSelf: "flex-start" }}>
                                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 18, color: "gray" }]}>Today:</Text>
                                        </View>

                                        <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>{this.state?.clinicDetails?.working_hours[date.getDay()][0]}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>{this.state?.clinicDetails?.working_hours[date.getDay()][1]}</Text>
                                    </View>

                                </View>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => { this.setState({ showAll: !this.state.showAll }) }}
                                    >
                                        <Text>{this.state.showAll ? "showLess" : "showAll"}</Text>
                                    </TouchableOpacity>
                                </View> */}

                                {this.state.showAll &&
                                    this.state?.clinicDetails?.sortedTimings.map((i) => {
                                        let day = ""
                                        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

                                        day = days[i[2]]


                                        return (
                                            <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                                <View style={{ flexDirection: "row", width: width * 0.6 }}>
                                                    <View style={{ flex: 0.5, flexDirection: "row" }}>
                                                        <View style={{ flex: 0.9, }}>
                                                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 18, color: "gray" }]}>{day}</Text>
                                                        </View>
                                                        <View style={{ flex: 0.1, }}>
                                                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 18, color: "gray", }]}>:</Text>

                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: "row", flex: 0.5 }}>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Text style={[styles.text, { fontWeight: "bold" }]}>{i[0]}</Text>
                                                            <Text style={[styles.text, { fontWeight: "bold" }]}>-</Text>
                                                            <Text style={[styles.text, { fontWeight: "bold" }]}>{i[1]}</Text>
                                                        </View>

                                                    </View>
                                                </View>

                                            </View>
                                        )
                                    })
                                }
                            </View>
                           




                        </ScrollView>
                    </View>

                   
                    <View style={{ alignItems: "center", justifyContent: "space-around", flexDirection: "row", position: "absolute", bottom: 100, width }}>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { this.chatClinic() }}
                        >
                            <MaterialIcons name="chat" size={24} color="black" />
                            <Text>with Store</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {

                                Linking.openURL(
                                    `https://www.google.com/maps/dir/?api=1&destination=` +
                                    this.state.item.lat +
                                    `,` +
                                    this.state.item.long +
                                    `&travelmode=driving`
                                );
                            }}
                        >
                            <FontAwesome5 name="directions" size={24} color="black" />
                            <Text>get Directions</Text>
                        </TouchableOpacity>
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
    card: {
        backgroundColor: "#fff",
        elevation: 6,
        margin: 20,
        height: height * 0.3
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
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewMedicals);