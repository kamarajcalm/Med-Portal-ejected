import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const { height, width } = Dimensions.get("window");
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';
import authAxios from '../api/authAxios';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const cards = [
    {
        name: "Sri clinic",
        color: themeColor,
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Ram clinic",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "take care hospital",
        color: "#ffff",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Make well",
        color: "#eba",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Sri clinic",
        color: themeColor,
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Ram clinic",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "take care hospital",
        color: "#ffff",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Make well",
        color: "#eba",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Sri clinic",
        color: themeColor,
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Ram clinic",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "take care hospital",
        color: "#ffff",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Make well",
        color: "#eba",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Sri clinic",
        color: themeColor,
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Ram clinic",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "take care hospital",
        color: "#ffff",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Make well",
        color: "#eba",
        doctor: "kamaraj",
        No: "7010117137"
    },

];
class PriscriptionIssue extends Component {
    constructor(props) {
        const Date1 = new Date()
        const day = Date1.getDate()
        const month = Date1.getMonth() + 1
        const year = Date1.getFullYear()
        const today = `${year}-${month}-${day}`
        super(props);
        this.state = {
            today,
            mode: 'date',
            date: new Date(),
            show: false,
        };
    }
    onChange = (selectedDate) => {
        if (selectedDate.type == "set") {
            this.setState({ today: moment(new Date(selectedDate.nativeEvent.timestamp)).format('YYYY-MM-DD'), show: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {
                console.log(this.state.today, "jjjj")

            })

        } else {
            return null
        }

    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <StatusBar backgroundColor={themeColor} />
                        {/* HEADERS */}
                        <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                          
                            <View style={{ flex: 1, }}>
                                <Text style={[styles.text, { color: '#fff', fontWeight: 'bold', fontSize: 23 ,marginLeft:20}]}>Priscription</Text>
                            </View>
                   
                        </View>
                        {/* DATES */}
                        <View style={{ height: height * 0.07, alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.text, { color: "#000" }]}>{this.state.today}</Text>
                                <TouchableOpacity
                                    style={{ marginLeft: 20 }}
                                    onPress={() => { this.setState({ show: true }) }}
                                >
                                    <Fontisto name="date" size={24} color={themeColor} />
                                </TouchableOpacity>
                                {this.state.show && (
                                    <DateTimePicker
                                        testID="dateTimePicker1"
                                        value={this.state.date}
                                        mode={this.state.mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={(time) => { this.onChange(time) }}
                                    />
                                )}
                            </View>
                            <View>
                                <Text style={[styles.text,]}> Total:{cards.length}</Text>
                            </View>
                        </View>
                        {/* CHATS */}
                        <FlatList
                            style={{  }}
                            data={cards}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={[styles.card, { flexDirection: "row", borderRadius: 5 ,marginTop:15}]}
                                        onPress={() => { this.props.navigation.navigate('showCard', { item }) }}
                                    >
                                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: "center" }}>
                                            <Image
                                                source={{ uri: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                                style={{ height: 60, width: 60, borderRadius: 30 }}
                                            />
                                        </View>
                                        <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                                            <View >
                                                <Text style={[styles.text, { fontSize: 18, }]}>{item.doctor}</Text>
                                                <Text style={[styles.text, { fontSize: 12, }]}>Sri periandavar clinic</Text>
                                            </View>

                                        </View>
                                        <View style={{ flex: 0.3, justifyContent: 'center', alignItems: "center" }}>
                                            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text>14/06/2021</Text>

                                            </View>
                                            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text>11:00 am</Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        <View style={{
                            position: "absolute",
                            bottom: 20,
                            left: 20,
                            right: 20,
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 20
                        }}>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('SearchPateint') }}
                            >
                                <AntDesign name="pluscircle" size={40} color={themeColor} />
                            </TouchableOpacity>
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
        user: state.selectedUser
    }
}
export default connect(mapStateToProps, { selectTheme })(PriscriptionIssue);
