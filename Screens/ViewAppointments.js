
import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView, Linking} from 'react-native';
import { Ionicons, Entypo, AntDesign, FontAwesome5} from '@expo/vector-icons';
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
class ViewAppointments extends Component {
    constructor(props) {
        super(props);
        let item =this.props.route.params.item
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
    getDirections =(item)=>{
        Linking.openURL(
            `https://www.google.com/maps/dir/?api=1&destination=` +
            item?.lat +
            `,` +
            item?.long +
            `&travelmode=driving`
        );
    }
    chatClinic = async () => {
        let api = `${url}/api/prescription/createClinicChat/?clinic=${this.state.item.clinic}&customer=${this.props.user.id}`

        let data = await HttpsClient.get(api)
       console.log(data)

        if (data.type == "success") {
            this.props.navigation.navigate('Chat', { item: data.data })
        }
    }
    chatDoctor =async () =>{
        let api = `${url}/api/prescription/createDoctorChat/?doctor=${this.state.item.doctor}&customer=${this.props.user.id}`

        let data = await HttpsClient.get(api)
        console.log(data)
        if (data.type == "success") {
            this.props.navigation.navigate('Chat', { item: data.data })
        }
    }
    render() {
         let dp =null
        if (this.state.item.doctordetails.dp){
            dp = `${url}${this.state.item.doctordetails.dp}`
        }
        console.log(this.state.item)
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                                  {/* HEADERS */}
                    <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.7, }}>
                            <Text style={[styles.text,{color:"#fff"}]}> Appointment Details</Text>
                        </View>

                    </View>

                   <View style={{}}>
                                 {/* Clinic Details */}

                      <View style={{margin:20}}>
                          <View style={{flexDirection:'row'}}>
                              <View>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Clinic Name:</Text>
                              </View>
                              <View style={{alignItems:"center",justifyContent:"center"}}>
                                 <Text style={[styles.text, { marginLeft:10 }]}>{this.state.item.clinicname}</Text>
                                  
                              </View>

                          </View>
                            <View style={{ marginTop:10 }}>
                                <View>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Address:</Text>
                                </View>
                                <View style={{  justifyContent: "center" }}>
                                    <Text style={[styles.text, { marginLeft: 10 }]}>{this.state.item.clinicname}</Text>

                                </View>

                            </View>
                            <View style={{ marginTop: 10 ,flexDirection:"row"}}>

                                <View style={{justifyContent:"center"}}>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Doctor Name:</Text>
                                </View>
                                <View style={{justifyContent:"center"}}>
                                    <Text style={[styles.text, { marginLeft: 10}]}>{this.state.item.doctordetails.name}</Text>
                                </View>

                            </View>
                      </View>
                       
                        {/* Appointment Details */}
                        <View style={{marginHorizontal:20}}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={[styles.text]}>Appointment Status:</Text>
                                <Text style={[styles.text, { marginLeft: 10, color: this.validateColor(this.state.item.status)}]}>{this.state.item.status}</Text>
                            </View>
                            <View style={{ flexDirection: "row",marginTop:20 }}>
                                <Text style={[styles.text,{fontWeight:"bold"}]}>Requested Date:</Text>
                                <Text style={[styles.text, { marginLeft: 10,color:"gray" }]}>{this.state.item.requesteddate}</Text>
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
                <View style={{ position: "absolute", bottom: 50 ,flexDirection:"row",justifyContent:"space-around",width,}}>
                    <TouchableOpacity style={{alignItems:"center",justifyContent:"center",flex:0.5}}
                     onPress ={()=>{
                         this.getDirections(this.state.item)
                     }}
                     
                    >
                        <FontAwesome5 name="directions" size={30} color="black" />
                        <Text>Directions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{  alignItems: "center", justifyContent: "center" ,flex:0.5}}
                        onPress={() => { this.chatDoctor()}}
                    >
                        <Ionicons name="chatbubbles" size={24} color="black" />
                        <Text>With Doctor</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ position: "absolute", bottom: 150, flexDirection: "row", justifyContent: "space-around", width, }}>
                    <View style={{flex:0.5}}>
                    
                    </View>
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" ,flex:0.5 }}
                        onPress={() => { this.chatClinic() }}
                    >
                        <Ionicons name="chatbubbles" size={24} color="black" />
                        <Text>With Clinic</Text>
                    </TouchableOpacity>
                </View>
               {this.state.item.status=="Completed"&& <View style={{ alignItems: 'center', justifyContent: 'center', position: "absolute", bottom: 300, width }}>
                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: 'center', justifyContent: "center", borderRadius: 10, backgroundColor: themeColor }}
                        onPress={() => { this.props.navigation.navigate('ViewPriscription', { pk: this.state.item.prescription})}}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>Show Prescription</Text>
                    </TouchableOpacity>
                </View>}
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
        user:state.selectedUser
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewAppointments);