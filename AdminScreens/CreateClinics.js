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
const url =settings.url;
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
class CreateClinics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            openImageModal: false,
            latitude: "",
            longitude: '',
            clinicName: "Sri Devi Clinic",
            openingTime: null,
            closingTime: null,
            mode: 'time',
            date: new Date(),
            show1: false,
            show2: false,
            mobile:"7878787878",
            GST:"gytyg4565456",
            address:"5/3278 Adaiyar",
            pincode:"786656",
            state:"Karnataka",
            city:"Bengaluru",
            firstEmergencyContactNo: "9869669867",
            secondEmergencyContactNo: '9778776767',
        };
    }
    createClinic = async()=>{
        let api =  `${url}/api/prescription/createClinic/`
        console.log(api,"a")
        let sendData ={
            owner: this.state.doctor.user,
            displayPicture:this.state.image,
            mobile:this.state.mobile,
            gstin:this.state.GST,
            companyName:this.state.clinicName,
            address:this.state.address,
            pincode:this.state.pincode,
            state:this.state.state,
            city:this.state.city,
            firstEmergencyContactNo:this.state.firstEmergencyContactNo,
            secondEmergencyContactNo:this.state.secondEmergencyContactNo,
            lat:this.state.latitude,
            long:this.state.longitude,
            startingtime: this.state.openingTime,
            closingtime: this.state.closingTime,
        }
      console.log(sendData,"hhh")
        if(this.state.image){
            sendData.bodyType="formData"
        }
        const post = await HttpsClient.post(api,sendData)
       if(post.type=="success"){
           Toast.show('created SuccessFully');
           setTimeout(() => {
               this.props.navigation.goBack();
           }, 2000)
       }else{
           Toast.show("Try again")
       }

    }
    backFunction = async (item) => {
        console.log(item,"bbbbbb")
       this.setState({ doctor:item})
       

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
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        });
        if (result.cancelled == true) {
            return
        }
        let filename = result.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        var type = match ? `image/${match[1]}` : `image`;
        const photo = {
            uri: result.uri,
            type: type,
            name: filename,
        };
        this.setState({ openImageModal: false })
        this.setState({ image: photo, changedImage: true })
    };
    modalAttach = async (event) => {
        if (event == 'gallery') return this._pickImage();
        if (event == 'camera') {
            this.handlePhoto()
        }
    }
    handlePhoto = async () => {
        let picture = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.1,
        });
        if (picture.cancelled == true) {
            return
        }

        let filename = picture.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        const photo = {
            uri: picture.uri,
            type: type,
            name: filename,
        };
        this.setState({ openImageModal: false })
        this.setState({ image: photo, changedImage: true })
    }
    getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync()
        if (status !== 'granted') {
            console.warn('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location, "jjjj")
        this.setState({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        })
    }
    renderModal = () => {
        return (
            <Modal
                isVisible={this.state.openImageModal}
                hasBackdrop={true}
                style={[styles.modalView1, { position: 'absolute', bottom: -20, left: 0, }]}
                onBackdropPress={() => { this.setState({ openImageModal: false }); }} useNativeDriver={true} onRequestClose={() => { this.setState({ openImageModal: false }); }} >
                <View style={{ paddingVertical: width * 0.01, }}>
                    <View style={{
                        flexDirection: 'row', height: width * 0.25, justifyContent: 'space-between',
                        borderWidth: 0, backgroundColor: 'transparent', borderRadius: 0, paddingTop: width * 0.05
                    }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: 4,
                                paddingVertical: 6, borderWidth: 0, borderRadius: 0
                            }}
                            onPress={() => { this.modalAttach('gallery') }}>
                            <FontAwesome
                                name="folder"
                                size={width * 0.16}
                                style={{
                                    marginRight: 5, color: themeColor,
                                    textAlign: 'center', marginLeft: width * 0.1
                                }} />
                            <Text style={{ fontSize: 16, color: themeColor, textAlign: 'center', marginLeft: width * 0.1 }}>Gallary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: 4, paddingVertical: 6, borderWidth: 0, borderRadius: 0, }}
                            onPress={() => { this.modalAttach('camera') }}>
                            <FontAwesome name="camera" size={width * 0.14} style={{ marginRight: 5, color: themeColor, textAlign: 'center', marginRight: width * 0.1 }} />
                            <Text style={{ fontSize: 16, color: themeColor, textAlign: 'center', marginRight: width * 0.1 }}>camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
    componentDidMount() {
        this.getLocation()
    }
    render() {
        console.log(this.state.latitude, "hhhhh")
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
                                <Text style={[styles.text, { color: "#fff" }]}>Create Clinic</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>

                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                     


                            <ScrollView style={{ margin: 20 }}
                                showsVerticalScrollIndicator={false}
                            >
                                <View style={{ height: height * 0.12, alignItems: "center", justifyContent: 'center' }}>
                                    <Image
                                        source={{ uri:this.state?.image?.uri||"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                        style={{ height: 60, width: 60, borderRadius: 30 }}
                                    />

                                    <TouchableOpacity style={{ position: "absolute", right: 140 }}

                                        onPress={() => { this.setState({ openImageModal: true, }) }}
                                    >
                                        <Entypo name="edit" size={20} color={themeColor} />
                                    </TouchableOpacity>
                                </View>
                                <View >
                                    <Text style={styles.text}>Owner Name</Text>
                                    <TouchableOpacity 
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 ,justifyContent:"center"}}
                                        onPress={() => { this.props.navigation.navigate('SearchDoctors', { backFunction: (item) => { this.backFunction(item) } })}}
                                    >
                                        <Text>{this.state?.doctor?.name}</Text>
                                    </TouchableOpacity>
                                    {/* <TextInput
                                        value={this.state.Name}
                                        onChangeText={(Name) => { this.setState({ Name }) }}
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    /> */}
                                </View>
                                <View >
                                    <Text style={styles.text}>Clinic Name</Text>
                                    <TextInput
                                   
                                        value={this.state.clinicName}
                                        onChangeText={(clinicName) => { this.setState({ clinicName }) }}
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                                <View style={{ height: height * 0.07, flexDirection: "row", }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.text}>Opening Time</Text>
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
                                        <Text style={styles.text}>Closing Time</Text>
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
                                <View>
                                    <Text style={styles.text}>Mobile</Text>
                                    <TextInput
                                        value={this.state.mobile}
                                        onChangeText={(mobile) => { this.setState({ mobile }) }}
                                        keyboardType="numeric"
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.text}>GST IN</Text>
                                    <TextInput
                                        value={this.state.GST}
                                        onChangeText={(GST) => { this.setState({ GST }) }}
                                  
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.text}>address</Text>
                                    <TextInput
                                        onChangeText={(address) => { this.setState({ address }) }}
                                        value={this.state.address}
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.15, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.text}>pincode</Text>
                                    <TextInput
                                        onChangeText={(pincode) => { this.setState({ pincode }) }}
                                        value={this.state.pincode}
                                        keyboardType="numeric"
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.text}>state</Text>
                                    <TextInput
                                        value={this.state.state}
                                        onChangeText={(state) => { this.setState({ state }) }}
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.text}>city</Text>
                                    <TextInput
                                        value={this.state.city}
                                        onChangeText={(city) => { this.setState({ city }) }}
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.text}>Emergency Contact 1</Text>
                                    <TextInput
                                        value={this.state.firstEmergencyContactNo}
                                        onChangeText={(firstEmergencyContactNo) => { this.setState({ firstEmergencyContactNo }) }}
                                        keyboardType="numeric"
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.text}>Emergency Contact 2</Text>
                                    <TextInput
                                        value={this.state.secondEmergencyContactNo}
                                        onChangeText={(secondEmergencyContactNo) => { this.setState({ secondEmergencyContactNo }) }}
                                        keyboardType="numeric"
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                             
                                <View>
                                    <Text style={styles.text}>Latitude</Text>
                                    <TextInput
                                       keyboardType ="numeric"
                                        onChangeText={(text) => { this.setState({ latitude:text})}}
                                        value={this.state?.latitude.toString()}
                                        multiline={true}
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.text}>Longitude</Text>
                                    <TextInput
                                        onChangeText={(text) => { this.setState({ longitude: text }) }}
                                        value={this.state?.longitude.toString()}
                                        multiline={true}
                                        selectionColor={themeColor}
                                        style={{ width: width * 0.8, height: height * 0.05, borderRadius: 15, backgroundColor: "#eeee", margin: 10, paddingLeft: 10 }}
                                    />
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ width: width * 0.4, height: height * 0.05, borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: themeColor }}
                                      onPress={()=>{this.createClinic()}}
                                    >
                                        <Text style={[styles.text, { color: "#fff" }]}>Create</Text>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>

                        </View>

                        {this.renderModal()}
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
export default connect(mapStateToProps, { selectTheme })(CreateClinics)