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

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <ScrollView style={{ marginBottom: 90 }}>

            <View style={{ marginLeft: 27, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center" }}>
                <Text style={[styles.text], { fontWeight: "bold" }}>Age:</Text>
                <Text style={[styles.text, { marginLeft: 10 }]}>20</Text>
            </View>
            <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center" }}>
                <Text style={[styles.text], { fontWeight: "bold" }}>height:</Text>
                <Text style={[styles.text, { marginLeft: 10 }]}>6.7 feet</Text>
            </View>
            <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center" }}>
                <Text style={[styles.text], { fontWeight: "bold" }}>weight: </Text>
                <Text style={[styles.text, { marginLeft: 10 }]}>50kg</Text>
            </View>
            <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center" }}>
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
            <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row", borderColor: "gray", borderBottomWidth: 1, height: height * 0.05, alignItems: "center" }}>
                <Text style={[styles.text], { fontWeight: "bold" }}>PhoneNo: </Text>
                <Text style={[styles.text, { marginLeft: 10, fontWeight: "bold", color: "gray" }]}>7010117137</Text>
            </View>

        </ScrollView>
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