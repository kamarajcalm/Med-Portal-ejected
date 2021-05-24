import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet, Linking, FlatList, Image, SafeAreaView, ToastAndroid } from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const { height, width } = Dimensions.get("window");
import { Ionicons } from '@expo/vector-icons';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const screenHeight =Dimensions.get("screen").height;
import Modal from 'react-native-modal';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const initialLayout = { width: Dimensions.get('window').width };
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';
import HttpsClient from '../api/HttpsClient';
import { FontAwesome, FontAwesome5, Octicons,Fontisto} from '@expo/vector-icons';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { color } from 'react-native-reanimated';
const Date1 = new Date()
const today = moment(Date1).format("YYYY-MM-DD")
const url = settings.url
class Appointments extends Component {
    constructor(props) {
        const routes = [
            { key: 'NewAppointments', title: 'New Appointments' },
            { key: 'Completed', title: 'All Appointments'},

        ];
        super(props);
        this.state = {
            index: 0,
            routes: routes,
            modal:false,
            mode: 'time',
            date: new Date(),
            show: false,
            Appointments:[],
            selectedAppointment:null,
            selectedIndex:null,
            Appointments2:[],
            today
        };
    }
    chatClinic = async (item) => {
   
        let api = `${url}/api/prescription/createClinicChat/?clinic=${item.clinic}&customer=${this.props.user.id}`

        let data = await HttpsClient.get(api)
        console.log(data)

        if (data.type == "success") {
            this.props.navigation.navigate('Chat', { item: data.data })
        }
    }
    getAppointments2 = async () => {
        let api = ""
        if (this.props.user.profile.occupation == "Doctor") {
            api = `${url}/api/prescription/appointments/?doctor=${this.props.user.id}&date=${this.state.today}`
        } else if (this.props.user.profile.occupation == "ClinicRecoptionist") {
            api = `${url}/api/prescription/appointments/?clinic=${this.props.user.profile.recopinistclinics[0].clinicpk}&date=${this.state.today}`
        }
        else {
            api = `${url}/api/prescription/appointments/?requesteduser=${this.props.user.id}&date=${this.state.today}`
        }

        const data = await HttpsClient.get(api)
        console.log(data)
        if (data.type == "success") {
            let Appointments = this.state.Appointments

            this.setState({ Appointments2: data.data })
        }
    }
    getAppointments =async()=>{
        let api =""
        if (this.props.user.profile.occupation == "Doctor") {
            api = `${url}/api/prescription/appointments/?doctor=${this.props.user.id}&pending=true&accepted=true`
        } else if (this.props.user.profile.occupation == "ClinicRecoptionist"){
            api = `${url}/api/prescription/appointments/?clinic=${this.props.user.profile.recopinistclinics[0].clinicpk}&pending=true&accepted=true`
        }
        else{
            api = `${url}/api/prescription/appointments/?requesteduser=${this.props.user.id}&pending=true&accepted=true`
        }
        console.log(api,"zzz")
        const data =await HttpsClient.get(api,"lll")
  
        if(data.type =="success"){
            let Appointments= this.state.Appointments

            this.setState({ Appointments:data.data})
        }
    }

    showDatePicker = () => {
        this.setState({ show: true })
    };

    hideDatePicker = () => {
        this.setState({ show: false })
    };


    handleConfirm = (date) => {
        this.setState({ today: moment(date).format('YYYY-MM-DD'), show: false, date: new Date(date) }, () => {
          this.getAppointments2()

        })
        this.hideDatePicker();
    };
    // onChange = (selectedDate) => {
    //     if (selectedDate.type == "set") {
    //         this.setState({ today: moment(new Date(selectedDate.nativeEvent.timestamp)).format('YYYY-MM-DD'), show: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {


    //         })

    //     } else {
    //         return null
    //     }

    // }

    handleConfirm2 = (date) => {
        this.setState({ time: moment(date).format('hh:mm a'), show2: false, date: new Date(date) }, () => {


        })
        this.hideDatePicker();
    };
    // onChange2 = (selectedDate) => {
    //     if (selectedDate.type == "set") {
    //         this.setState({ time: moment(new Date(selectedDate.nativeEvent.timestamp)).format('hh:mm a'), show2: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {


    //         })

    //     } else {
    //         return null
    //     }

    // }
    showSimpleMessage(content, color, type = "info", props = {}) {
        const message = {
            message: content,
            backgroundColor: color,
            icon: { icon: "auto", position: "left" },
            type,
            ...props,
        };

        showMessage(message);
    }
    componentDidMount() {
        
      this.getAppointments();
      this.getAppointments2();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.setState({ modal:false})
                this.getAppointments();
                this.getAppointments2();
            

        });
    }
    componentWillUnmount(){
        this._unsubscribe();
    }
    acceptAppointment =async()=>{
        let api = `${url}/api/prescription/appointments/${this.state.selectedAppointment.id}/`
        let sendData ={
            accepteddate:this.state.today,
            acceptedtime:this.state.time,
            status:"Accepted"
        }
        console.log(sendData)
      let post = await HttpsClient.patch(api,sendData)
      if(post.type =="success"){
          let duplicate = this.state.Appointments
          duplicate[this.state.selectedIndex]=post.data
          this.showSimpleMessage("Accepted SuccessFully", "#00A300","success")
          this.setState({ modal:false,Appointments:duplicate})
      }else{
          this.showSimpleMessage("Try again", "#B22222", "danger")
          this.setState({ modal: false })
      }
    }
    RejectAppointment =async()=>{
        let api = `${url}/api/prescription/appointments/${this.state.selectedAppointment.id}/`
        let sendData = { 
            status: "Declined"
        }
        console.log(sendData)
        let post = await HttpsClient.patch(api, sendData)
        if (post.type == "success") {
            let duplicate = this.state.Appointments
            duplicate.splice(this.state.selectedIndex, 1)
            this.showSimpleMessage("Rejected SuccessFully", "#dd7030",)
          
            this.setState({ modal: false, Appointments: duplicate })
        } else {
            this.showSimpleMessage("Try again", "#B22222", "danger")
            this.setState({ modal: false })
        }
    }
    completeAppointment =async()=>{
        this.props.navigation.navigate('addPriscription', { appoinment: this.state.selectedAppointment})
        
    }
    onChange = (selectedDate) => {
        if (selectedDate.type == "set"){
            this.setState({ today: moment(new Date(selectedDate.nativeEvent.timestamp)).format('YYYY-MM-DD'), show: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {
                console.log(this.state.today, "jjjj")

            })

        } else {
            return null
        }

    }
    validateInformation =(item)=>{
        console.log(item.status)
        if (item.status == "Pending" || item.status == "Rejected") {
            return(
                <View style={{marginTop:10}}>
                    <Text style={[styles.text]}>{item.requestedtime}</Text>
                </View>
            )
    }
        if (item.status == "Accepted") {
            return (
                <View style={{ marginTop: 10 }}>
                    <Text style={[styles.text]}>{item.acceptedtime}</Text>
                </View>
            )
        }
        if (item.status == "Completed") {
            return (
                <View style={{ marginTop: 10 }}>
                    <Text style={[styles.text]}>{item.acceptedtime}</Text>
                </View>
            )
        }
}
    // validateInformation =(item)=>{
    //     if (item.status =="Pending"){
    //         return(
    //             <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
    //                 <View style={{flexDirection:"row",marginTop:5}}>
    //                     <Text style={[styles.text, { color: "gray" }]}>Requseted date:</Text>
    //                     <Text style={[styles.text,{fontWeight:"bold"} ]}>{item.requesteddate}</Text>
    //                 </View>
    //                 <View style={{flexDirection:'row',marginTop:5}}>
    //                     <Text style={[styles.text, { color: "gray" }]}> Time:</Text>
    //                     <Text style={[styles.text, { fontWeight: "bold" }  ]}>{item.requestedtime}</Text>
    //                 </View>
    //             </View>
    //         )
    //     }
    //     if (item.status == "Accepted") {
    //         return (
    //             <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between" }}>
    //                 <View style={{ flexDirection: "row", marginTop: 5 }}>
    //                     <Text style={[styles.text, { color: "gray" }]}>Accepted date:</Text>
    //                     <Text style={[styles.text,]}>{item.accepteddate}</Text>
    //                 </View>
    //                 <View style={{ flexDirection: 'row', marginTop: 5 }}>
    //                     <Text style={[styles.text, { color: "gray" }]}> Time:</Text>
    //                     <Text style={[styles.text,]}>{item.acceptedtime}</Text>
    //                 </View>
    //             </View>
    //         )
    //     }
    // }
    viewAppointments =(item)=>{
        if(this.props.user.profile.occupation =="Customer"){
           return   this.props.navigation.navigate('ViewAppointment',{item})
        }
        return this.props.navigation.navigate('ViewAppointmentDoctors',{item})
    }
    validateColor =(status)=>{
        if(status =="Completed"){
            return "green"
        }
        if (status == "Accepted") {
            return "blue"
        }
        if (status == "Pending") {
            return "orange"
        }
        if (status == "Rejected") {
            return "red"
        }
        if (status == "Declined") {
            return "red"
        }
    }
    FirstRoute =()=>{
        return(
            <FlatList 
              contentContainerStyle={{paddingBottom:90}}
              data={this.state.Appointments}
              keyExtractor ={(item,index)=>index.toString()}
              renderItem ={({item,index})=>{
             
            if (this.props.user.profile.occupation == "Customer") {
              console.log(item)
                            let dp =null
                            if (item.doctordetails.dp){
                                dp = `${url}${item.doctordetails.dp}`
                            }
               
                return(
                    <TouchableOpacity
                        onPress={() => { this.viewAppointments(item)}}
                      style={{
                            marginTop: 10,
                            minHeight: height * 0.2,
                            backgroundColor: "#eee",
                            marginHorizontal: 10,
                            borderRadius: 10,
                      }}
                    >
                     <View style={{flexDirection:"row",flex:1,}}>
                          <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}> 
                              <Image
                                style={{height:'80%',width:"95%",borderRadius:5}}
                                source ={{uri:dp}}
                                resizeMode ={"cover"}
                              />
                          </View>
                          <View style={{flex:0.7,paddingLeft:10}}>
                              <View style={{marginTop:20}}>
                                    <Text style={[styles.text,{color:"#000",fontWeight:"bold"}]}>{item.clinicname.name}</Text>
                              </View>
                                <View style={{ marginTop: 10,flexDirection:"row" }}>
                                    <Text style={[styles.text, { color: "#000", }]}>Reason :</Text>
                                    <Text style={[styles.text, { color: "#000",  }]}> {item.reason}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 10,}}>
                                    <Text style={[styles.text, { color: "#000", }]}>{item.requesteddate}</Text>
                                    <Text style={[styles.text, { color: "#000", }]}>|</Text>
                                    <Text style={[styles.text, { color: "#000", }]}>{item.requestedtime}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10,}}>
                                    <View style={{flex:0.7}}>
                                        <Text style={[styles.text,{color:this.validateColor(item.status)}]}>{item.status}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:"space-around",alignItems:"center",flex:0.3}}>
                                         <TouchableOpacity style={[styles.boxWithShadow,{backgroundColor:"#fff",height:30,width:30,borderRadius:15,alignItems:"center",justifyContent:'center'}]}
                                          onPress ={()=>{this.chatClinic(item)}}
                                         >
                                            <Ionicons name="md-chatbox" size={20} color="#63BCD2" />
                                         </TouchableOpacity>
                                        <TouchableOpacity style={[styles.boxWithShadow, { backgroundColor: "#fff", height: 30, width: 30, borderRadius: 15, alignItems: "center", justifyContent: 'center' }]}
                                            onPress={() => {
                                                Linking.openURL(
                                                    `https://www.google.com/maps/dir/?api=1&destination=` +
                                                    item.clinicname.lat +
                                                    `,` +
                                                    item.clinicname.long +
                                                    `&travelmode=driving`
                                                );
                                            }}
                                        >
                                            <FontAwesome5 name="directions" size={20} color="#63BCD2" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                          </View>
                     </View>
               
                       
                   

                
                    </TouchableOpacity>
                )
                }else{
                    return(
                        <TouchableOpacity
                            onPress={() => { this.viewAppointments(item)}}
                            style={{
                                marginTop: 10,
                                minHeight: height * 0.17,
                                backgroundColor: "#eee",
                                marginHorizontal: 10,
                                borderRadius: 10,
                         }}
                        >

                 
                        <View
                            style={{
                                
                                flexDirection: "row",
                            }}

                        >
                            <View style={{flex:0.6}}>
                                    <View style={{ paddingLeft:10 ,paddingTop:10}}>
                                        <Text style={[styles.text, {fontWeight:"bold",color:"#000"}]}>{item.patientname.name}</Text>
                                    </View>
                                    <View style={{ paddingLeft: 10, paddingTop: 10 ,flexDirection:"row"}}>
                                        <View>
                                            <Text style={[styles.text, { fontWeight: "bold" }]}>Reason : </Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.text, { fontWeight: "bold" }]}>{item.reason}</Text>
                                        </View>
                                     
                                    </View>
                                    <View style={{ paddingLeft: 10, paddingTop: 10 ,flexDirection:"row"}}>
                                        <View>
                                            <Text style={[styles.text, {}]}>{item.requesteddate}</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.text]}> | </Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.text]}> {item.requestedtime} </Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingLeft: 10, paddingTop: 10 ,}}>
                                        <Text style={[styles.text, { fontWeight: "bold", color: this.validateColor(item.status) }]}>{item.status}</Text>
                                    </View>
                               </View>
                               <View style={{flex:0.4}}>

                                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>

                                        {item.status == "Pending" ? <TouchableOpacity style={{ height: height * 0.05, width: "80%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "#32CD32" }}
                                            onPress={() => { this.setState({ modal: true, selectedAppointment: item, selectedIndex: index, today: item.requesteddate, time: item.requestedtime }) }}
                                        >
                                            <Text style={[styles.text, { color: "#fff" }]}>Accept</Text>
                                        </TouchableOpacity> : <TouchableOpacity style={{ height: height * 0.05, width: "70%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "orange" }}
                                            onPress={() => {

                                                this.setState({ selectedAppointment: item, selectedIndex: index, }, () => {
                                                    this.completeAppointment()
                                                })
                                            }}
                                        >
                                            <Text style={[styles.text, { color: "#fff" }]}>finish</Text>
                                        </TouchableOpacity>}
                                    </View>

                                    {item.status != "Completed" && <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity style={{ height: height * 0.05, width: "80%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "#B22222" }}
                                            onPress={() => {
                                                this.setState({ selectedAppointment: item, selectedIndex: index }, () => {
                                                    this.RejectAppointment()
                                                })
                                            }}
                                        >
                                            <Text style={[styles.text, { color: "#fff" }]}>Reject</Text>
                                        </TouchableOpacity>
                                    </View>}
                               </View>
                                {/* <View style={{ flex: 0.6, justifyContent: "center" }}>
                                    <View style={{ flexDirection: "row", margin: 5, flex: 0.5 }}>

                                        <Text style={[styles.text, { fontWeight: "bold" }]}>Name   :</Text>
                                        <Text style={[styles.text, { marginLeft: 10 }]}>{item.patientname.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", margin: 5, flex: 0.5 }}>
                                        <Text style={[styles.text, { fontWeight: "bold" }]}>Reason:</Text>
                                        <View style={{ justifyContent: 'center', flex: 1 }}>
                                            <Text style={[styles.text, { marginLeft: 10 }]}>{item.reason}</Text>

                                        </View>

                                    </View>
                                </View> */}



                            {/* <View style={{ flex: 0.4, flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
                               
                              


                                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>

                                    {item.status =="Pending"?<TouchableOpacity style={{ height: height * 0.05, width: "80%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "#32CD32" }}
                                            onPress={() => { this.setState({ modal: true, selectedAppointment: item, selectedIndex: index, today: item.requesteddate, time: item.requestedtime})}}
                        >
                            <Text style={[styles.text, { color: "#fff" }]}>Accept</Text>
                                    </TouchableOpacity> : <TouchableOpacity style={{ height: height * 0.05, width: "70%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "orange"  }}
                                                onPress={() => {
                                                  
                                                    this.setState({ selectedAppointment: item, selectedIndex: index, },()=>{
                                                this.completeAppointment()
                                            }) }}
                                    >
                                        <Text style={[styles.text, { color: "#fff" }]}>finish</Text>
                                    </TouchableOpacity>}
                                </View> 
                              
                                {item.status != "Completed" && <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ height: height * 0.05, width: "80%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "#B22222" }}
                                        onPress={() => {
                                            this.setState({ selectedAppointment: item, selectedIndex: index }, () => {
                                                this.RejectAppointment()
                                            })
                                        }}
                        >
                            <Text style={[styles.text, { color: "#fff" }]}>Reject</Text>
                        </TouchableOpacity>
                    </View>}
                            </View> */}
                            
                        </View>
                        {/* <View style ={{
                            margin:10,
                            alignItems:"center",
                            justifyContent:"center",
                            flexDirection:"row"
                        }}>
                        
                            <View style={{flex:1}}>
                                    {
                                        this.validateInformation(item)
                                    }
                            </View>
                       
                        
                        </View> */}
                        </TouchableOpacity>
                    )
                }
                 
              }} 
            />
        )
    }
    validateStatus =(status)=>{
        if (status == "Completed"){
            return "green"
        }
        if (status == "Rejected") {
            return "red"
        }
        if (status == "Accepted") {
            return "Yellow"
        }
      
    }
    SecondRoute =()=>{
        return(
            <FlatList
            contentContainerStyle={{paddingBottom:90}}
                data={this.state.Appointments2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    if (this.props.user.profile.occupation == "Customer") {
                        let dp = null
                        if (item.doctordetails.dp) {
                            dp = `${url}${item.doctordetails.dp}`
                        }
                        return (
                            <TouchableOpacity
                                onPress={() => { this.viewAppointments(item) }}
                                style={{
                                    marginTop: 10,
                                    minHeight: height * 0.2,
                                    backgroundColor: "#eee",
                                    marginHorizontal: 10,
                                    borderRadius: 10,
                                }}
                            >
                                <View style={{ flexDirection: "row", flex: 1, }}>
                                    <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                        <Image
                                            style={{ height: '80%', width: "95%", borderRadius: 5 }}
                                            source={{ uri: dp }}
                                            resizeMode={"cover"}
                                        />
                                    </View>
                                    <View style={{ flex: 0.7, paddingLeft: 10 }}>
                                        <View style={{ marginTop: 20 }}>
                                            <Text style={[styles.text, { color: "#000", fontWeight: "bold" }]}>{item.clinicname.name}</Text>
                                        </View>
                                        <View style={{ marginTop: 10, flexDirection: "row" }}>
                                            <Text style={[styles.text, { color: "#000", }]}>Reason :</Text>
                                            <Text style={[styles.text, { color: "#000", }]}> {item.reason}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginTop: 10, }}>
                                            <Text style={[styles.text, { color: "#000", }]}>{item.requesteddate}</Text>
                                            <Text style={[styles.text, { color: "#000", }]}>|</Text>
                                            <Text style={[styles.text, { color: "#000", }]}>{item.requestedtime}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, }}>
                                            <View style={{ flex: 0.7 }}>
                                                <Text style={[styles.text, { color: this.validateColor(item.status) }]}>{item.status}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", flex: 0.3 }}>
                                                <TouchableOpacity style={[styles.boxWithShadow, { backgroundColor: "#fff", height: 30, width: 30, borderRadius: 15, alignItems: "center", justifyContent: 'center' }]}
                                                    onPress={() => { this.chatClinic(item) }}
                                                >
                                                    <Ionicons name="md-chatbox" size={20} color="#63BCD2"/>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.boxWithShadow, { backgroundColor: "#fff", height: 30, width: 30, borderRadius: 15, alignItems: "center", justifyContent: 'center' }]}
                                                    onPress={() => {
                                                        Linking.openURL(
                                                            `https://www.google.com/maps/dir/?api=1&destination=` +
                                                            item.clinicname.lat +
                                                            `,` +
                                                            item.clinicname.long +
                                                            `&travelmode=driving`
                                                        );
                                                    }}
                                                >
                                                    <FontAwesome5 name="directions" size={20} color="#63BCD2"/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>





                            </TouchableOpacity>

                        )
                    } else {
                        return (
                             <TouchableOpacity
                                onPress={() => { this.viewAppointments(item) }}
                                style={{
                                    marginTop: 10,
                                    minHeight: height * 0.15,
                                    backgroundColor: "#eee",
                                    marginHorizontal: 10,
                                    borderRadius: 10,
                                }}

                            >
                               

                                <View

                                    style={{
                                        flex:1,
                                        flexDirection: "row"
                                    }}

                                >
                                    <View style={{ flex: 0.6 }}>
                                        <View style={{flex:0.6}}>

                                        
                                        <View style={{ paddingLeft: 10, paddingTop: 10 }}>
                                            <Text style={[styles.text, { fontWeight: "bold", color: "#000" }]}>{item.patientname.name}</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10, paddingTop: 10, flexDirection: "row" }}>
                                            <View>
                                                <Text style={[styles.text, { fontWeight: "bold" }]}>Reason : </Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.text, { fontWeight: "bold" }]}>{item.reason}</Text>
                                            </View>

                                        </View>
                                        </View>
                                        <View style={{ flexDirection: 'row',  alignItems: "center", flex:0.4,}}>
                                            <TouchableOpacity style={[styles.boxWithShadow, { backgroundColor: "#fff", height: 30, width: 30, borderRadius: 15, alignItems: "center", justifyContent: 'center',marginLeft:10 }]}
                                                onPress={() => { }}
                                            >
                                                <Ionicons name="md-chatbox" size={20} color="#63BCD2" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.boxWithShadow, { backgroundColor: "#fff", height: 30, width: 30, borderRadius: 15, alignItems: "center", justifyContent: 'center' ,marginLeft:10}]}
                                                onPress={() => { }}
                                            >
                                                <Ionicons name="call" size={20} color="#63BCD2" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                     <View style={{flex:0.4,alignItems:'center',justifyContent:"center"}}>
                                         {
                                             this.validateInformation(item)
                                         }
                                         <View style={{marginTop:5}}>
                                             <Text style={[styles.text,{color:this.validateColor(item.status)}]}>{item.status}</Text>
                                         </View>
                                     </View>
                                    {/* <View style={{ flex: 0.6, justifyContent: "center" }}>
                                                     <View style={{ flexDirection: "row", margin: 5, flex: 0.5 }}>

                                        <Text style={[styles.text, { fontWeight: "bold" }]}>Name   :</Text>
                                        <Text style={[styles.text, { marginLeft: 10 }]}>{item.patientname.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", margin: 5, flex: 0.5 }}>
                                        <Text style={[styles.text, { fontWeight: "bold" }]}>Reason:</Text>
                                        <View style={{ justifyContent: 'center', flex: 1 }}>
                                            <Text style={[styles.text, { marginLeft: 10 }]}>{item.reason}</Text>

                                        </View>

                                    </View>
                                    </View> */}

                                    {/* TABS */}
{/* 
                                    <View style={{ flex: 0.4, flexDirection: "row", alignItems: "center", justifyContent: 'center', }}>
                                        <View style={{ alignItems: 'center', justifyContent: "center" }}>
                                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                                <Text style={[styles.text]}>Status:</Text>
                                            </View>
                                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                                <Text style={[styles.text, { color: this.validateColor(item.status) }]}>{item.status}</Text>

                                            </View>
                                        </View>

                                    </View> */}

                                </View>

                                {/* <View style={{
                                    margin: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "row"
                                }}>

                                    <View style={{ flex: 1 }}>
                                        {
                                            this.validateInformation(item)
                                        }
                                    </View>


                                </View> */}
                            </TouchableOpacity>

                           
                        )
                    }
                }}
            />
        )
       
    }
    renderScene = SceneMap({
        NewAppointments: this.FirstRoute,
        Completed: this.SecondRoute,
    });
    // renderScene = (routes) => {

    //     return(<FlatList 
    //         data ={this.state.Appointments}
    //         keyExtractor ={(item,index)=>index.toString()}
    //         renderItem ={({item,index})=>{

                
    //             if (this.props.user.profile.occupation !="Doctor"){
    //                 let dp =null
    //                 if (item.doctordetails.dp){
    //                     dp = `${url}${item.doctordetails.dp}`
    //                 }
    //             return(
    //                 <View
    //                     style={{
    //                         marginTop: 10,
    //                         minHeight: height * 0.1,
    //                         backgroundColor: "#eee",
    //                         marginHorizontal: 10,
    //                         borderRadius: 10,
    //                         flexDirection: "row"
    //                     }}

    //                 >
    //                     <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
    //                         onPress={() => { this.props.navigation.navigate('ProfileView') }}
    //                     >
    //                         <Image
    //                             source={{ uri: dp||"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
    //                             style={{ height: 60, width: 60, borderRadius: 30 }}
    //                         />
    //                     </TouchableOpacity>
    //                     <View style={{ flex: 0.4, justifyContent: "space-around", alignItems: "center", }}>
    //                         <Text style={[styles.text]}>{item.doctordetails.name}</Text>
    //                         <Text style={[styles.text]}>{item.clinicname}</Text>
    //                     </View>

    //                     {/* TABS */}

    //                     <View style={{ flex: 0.4, flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
    //                         <View style={{ alignItems: 'center', justifyContent: "center" }}>
    //                             <Text style={[styles.text]}>Status:</Text>
    //                             <Text style={[styles.text]}>{item.status}</Text>
    //                         </View>
                     
    //                     </View>
    //                 </View>

    //             )
    //             }else{
    //                 return(
    //                     <View
    //                         style={{
    //                             marginTop: 10,
    //                             minHeight: height * 0.1,
    //                             backgroundColor: "#eee",
    //                             marginHorizontal: 10,
    //                             borderRadius: 10,
    //                             flexDirection: "row"
    //                         }}

    //                     >
    //                         <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
    //                             onPress={() => { this.props.navigation.navigate('ProfileView') }}
    //                         >
    //                             <Image
    //                                 source={{ uri: item.patientname.dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
    //                                 style={{ height: 60, width: 60, borderRadius: 30 }}
    //                             />
    //                         </TouchableOpacity>
    //                         <View style={{ flex: 0.4, justifyContent: "space-around", alignItems: "center", }}>
    //                             <Text style={[styles.text]}>{item.patientname.name}</Text>
    //                             <Text style={[styles.text]}>{item.patientname.mobile}</Text>
    //                         </View>

                       

    //                         <View style={{ flex: 0.4, flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
    //                                {/* this */}
    //                             {item.status != "Completed"  ? 
                                
                                
    //                             <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                    
    //                                 {item.status =="Pending"?<TouchableOpacity style={{ height: height * 0.05, width: "80%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "#32CD32" }}
    //                                     onPress={() => { this.setState({ modal: true, selectedAppointment:item,selectedIndex:index})}}
    //                     >
    //                         <Text style={[styles.text, { color: "#fff" }]}>Accept</Text>
    //                                 </TouchableOpacity> : <TouchableOpacity style={{ height: height * 0.05, width: "70%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "#32CD32"  }}
    //                                         onPress={() => { this.setState({  selectedAppointment: item, selectedIndex: index },()=>{
    //                                             this.completeAppointment()
    //                                         }) }}
    //                                 >
    //                                     <Text style={[styles.text, { color: "#fff" }]}>finish</Text>
    //                                 </TouchableOpacity>}
    //                             </View> :
    //                             // or
    //                             <View style={{ alignItems: 'center', justifyContent: "center" }}>
    //                                 <Text style={[styles.text]}>Status:</Text>
    //                                 <Text style={[styles.text]}>{item.status}</Text>
    //                             </View>}
    //                             {item.status != "Completed" && <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
    //                                 <TouchableOpacity style={{ height: height * 0.05, width: "80%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "#B22222" }}
    //                                     onPress={() => {
    //                                         this.setState({ selectedAppointment: item, selectedIndex: index }, () => {
    //                                             this.RejectAppointment()
    //                                         })
    //                                     }}
    //                     >
    //                         <Text style={[styles.text, { color: "#fff" }]}>Reject</Text>
    //                     </TouchableOpacity>
    //                 </View>}
    //                         </View>
    //                     </View>
    //                 )
    //             }
    //         }}
    //     />
               
    //     )
    // }
    indexChange = async (index,) => {
        //    if(index == 0){
        //      this.getAppointments()
        //    }
        //    if(index == 1){
        //        this.getAppointments2()
        //    }
            this.setState({ index })
        
    }
    Modal =()=>{
      
        return(
            <Modal 
                deviceHeight={screenHeight}
              isVisible={this.state.modal}
              onBackdropPress={()=>{this.setState({modal:false})}}
            >
                 <View style={{flex:1,justifyContent:"center"}}>
                     <View style={{height:height*0.3,backgroundColor:"#eee",borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                          <Text style={[styles.text,{fontWeight:"bold",fontSize:18}]}>Select Date:</Text>
                          <View style={{flexDirection:"row"}}>
                            <TouchableOpacity
                                style={{ marginTop: 10 }}
                                onPress={() => { this.setState({ show: true }) }}
                            >
                                <FontAwesome name="calendar" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 10, marginTop: 7}}>
                                <Text>{this.state?.today}</Text>
                            </View>
                   
                          </View>
                         
                        <Text style={[styles.text, { fontWeight: "bold", fontSize: 18}]}>Select Time</Text>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity
                                style={{ marginTop: 10 }}
                                onPress={() => { this.setState({ show2: true }) }}
                            >
                                <FontAwesome5 name="clock" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={{alignItems:"center",justifyContent:"center",marginLeft:10,marginTop:7}}>
                                <Text>{this.state?.time}</Text>
                            </View>
                            
                        </View>
                        <View>
                            <TouchableOpacity style={{backgroundColor:themeColor,height:height*0.05,width:width*0.4,alignItems:'center',justifyContent:"center",borderRadius:10,marginTop:30}}
                              onPress ={()=>{this.acceptAppointment()}}
                            >
                                <Text style={[styles.text,{color:"#fff"}]}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                     </View>
                     
                 </View>
            </Modal>
        )
    }
    render() {
        const { index, routes } = this.state
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <StatusBar backgroundColor={themeColor} />
                              {/* HEADERS */}
                        <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                    
                            <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: '#fff', marginLeft: 20, fontWeight: 'bold' ,fontSize:25}]}>Appointments</Text>
                            </View>
                   {this.state.index ==1&&<View style={{flex:0.4,alignItems:"center",justifyContent:"center"}}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#fff" }]}>{this.state.today}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{ marginLeft: 20 }}
                                        onPress={() => { this.setState({show:true})}}
                                    >
                                        <Fontisto name="date" size={24} color={"#fff"} />
                                    </TouchableOpacity>


                                    <DateTimePickerModal
                                        isVisible={this.state.show}
                                        mode="date"
                                        onConfirm={this.handleConfirm}
                                        onCancel={this.hideDatePicker}
                                    />
                                </View>
                            </View>}
                        </View>
                        <TabView
                            style={{ backgroundColor: "#ffffff" }}
                            navigationState={{ index, routes }}
                            renderScene={this.renderScene}
                            onIndexChange={(index) => { this.indexChange(index) }}
                            initialLayout={initialLayout}
                            renderTabBar={(props) =>
                                <TabBar
                                    {...props}
                                    renderLabel={({ route, focused, color }) => (
                                        <Text style={{ color: focused ? themeColor : 'gray', margin: 8, fontWeight: "bold" }}>
                                            {route.title}
                                        </Text>
                                    )}
                                    style={{ backgroundColor: "#fff", height: 50, fontWeight: "bold", color: "red" }}
                                    labelStyle={{ fontWeight: "bold", color: "red" }}
                                    indicatorStyle={{ backgroundColor: themeColor, height: 5 }}
                                />
                            }

                        />
                         {/* Appointments */}
                        {this.Modal()}
                        {/* {this.state.show && (
                            <DateTimePicker
                                testID="dateTimePicker1"
                                value={this.state.date}
                                mode={"date"}
                                is24Hour={true}
                                display="default"
                                onChange={(time) => { this.onChange(time) }}
                            />
                        )}
                        {this.state.show2 && (
                            <DateTimePicker
                                testID="dateTimePicker2"
                                value={this.state.date}
                                mode={"time"}

                                display="default"
                                onChange={(time) => { this.onChange2(time) }}
                            />
                        )} */}
                        <DateTimePickerModal
                            isVisible={this.state.show}
                            mode="date"
                            onConfirm={this.handleConfirm}
                            onCancel={this.hideDatePicker}
                        />
                        <DateTimePickerModal
                        
                            isVisible={this.state.show2}
                            mode="time"
                            onConfirm={this.handleConfirm2}
                            onCancel={this.hideDatePicker2}
                        />
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
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user:state.selectedUser
    }
}
export default connect(mapStateToProps, { selectTheme })(Appointments);
