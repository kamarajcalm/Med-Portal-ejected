import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView, ToastAndroid } from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const { height, width } = Dimensions.get("window");
import { Ionicons } from '@expo/vector-icons';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const screenHeight =Dimensions.get("screen").height;
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
const initialLayout = { width: Dimensions.get('window').width };
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';
import HttpsClient from '../api/HttpsClient';
import { FontAwesome, FontAwesome5, Octicons} from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';
const url = settings.url
class Appointments extends Component {
    constructor(props) {
        const routes = [
            { key: 'NewAppoinments', title: 'New Appoinments' },
            { key: 'Completed', title: 'All Appoinments'},

        ];
        super(props);
        this.state = {
            index: 0,
            routes: routes,
            modal:false,
            mode: 'time',
            date: new Date(),
            show: false,
            appoinments:[],
            selectedAppointment:null,
            selectedIndex:null,
            appoinments2:[],
            today:"jhj"
        };
    }
    getAppointments2 = async () => {
        let api = ""
        if (this.props.user.profile.occupation == "Doctor") {
            api = `${url}/api/prescription/appointments/?doctor=${this.props.user.id}`
        } else if (this.props.user.profile.occupation == "ClinicRecoptionist") {
            api = `${url}/api/prescription/appointments/?clinic=${this.props.user.profile.recopinistclinics[0].clinicpk}`
        }
        
        else {
            api = `${url}/api/prescription/appointments/?requesteduser=${this.props.user.id}`
        }

        const data = await HttpsClient.get(api)
        console.log(data)
        if (data.type == "success") {
            let appoinments = this.state.appoinments

            this.setState({ appoinments2: data.data })
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
        console.log(api)
        const data =await HttpsClient.get(api,"lll")
        console.log(data)
        if(data.type =="success"){
            let appoinments= this.state.appoinments

            this.setState({ appoinments:data.data})
        }
    }
    onChange = (selectedDate) => {
        if (selectedDate.type == "set") {
            this.setState({ today: moment(new Date(selectedDate.nativeEvent.timestamp)).format('YYYY-MM-DD'), show: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {


            })

        } else {
            return null
        }

    }
    onChange2 = (selectedDate) => {
        if (selectedDate.type == "set") {
            this.setState({ time: moment(new Date(selectedDate.nativeEvent.timestamp)).format('hh:mm a'), show2: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {


            })

        } else {
            return null
        }

    }
    componentDidMount() {
        
      this.getAppointments();
      this.getAppointments2();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            
                this.getAppointments();
                this.getAppointments2();
            

        });
    }
    componentWillUnmount(){
        this._unsubscribe();
    }
    acceptAppoinment =async()=>{
        let api = `${url}/api/prescription/appointments/${this.state.selectedAppointment.id}/`
        let sendData ={
            accepteddate:this.state.today,
            acceptedtime:this.state.time,
            status:"Accepted"
        }
        console.log(sendData)
      let post = await HttpsClient.patch(api,sendData)
      if(post.type =="success"){
          let duplicate = this.state.appoinments
          duplicate[this.state.selectedIndex]=post.data
          Toast.show("Accepted SuccessFully")
          this.setState({ modal:false,appoinments:duplicate})
      }else{
          Toast.show("Try again")
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
            let duplicate = this.state.appoinments
            duplicate.splice(this.state.selectedIndex, 1)
            Toast.show("Rejected SuccessFully")
            this.setState({ modal: false, appoinments: duplicate })
        } else {
            Toast.show("Try again")
            this.setState({ modal: false })
        }
    }
    completeAppointment =async()=>{
        let api = `${url}/api/prescription/appointments/${this.state.selectedAppointment.id}/`
        let sendData = {
            status: "Completed"
        }
        console.log(sendData)
        let post = await HttpsClient.patch(api, sendData)
        if (post.type == "success") {
            let duplicate = this.state.appoinments
            duplicate.splice(this.state.selectedIndex,1)
            Toast.show("Completed SuccessFully")
            this.setState({ modal: false, appoinments: duplicate })
            this.getAppointments2();
        } else {
            Toast.show("Try again")
            this.setState({ modal: false })
        }
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
        if (item.status =="Pending"){
            return(
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                    <View style={{flexDirection:"row",marginTop:5}}>
                        <Text style={[styles.text, { color: "gray" }]}>Requseted date:</Text>
                        <Text style={[styles.text, ]}>{item.requesteddate}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={[styles.text, { color: "gray" }]}> Time:</Text>
                        <Text style={[styles.text, ]}>{item.requestedtime}</Text>
                    </View>
                </View>
            )
        }
        if (item.status == "Accepted") {
            return (
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Text style={[styles.text, { color: "gray" }]}>Accepted date:</Text>
                        <Text style={[styles.text,]}>{item.accepteddate}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={[styles.text, { color: "gray" }]}> Time:</Text>
                        <Text style={[styles.text,]}>{item.acceptedtime}</Text>
                    </View>
                </View>
            )
        }
    }
    viewAppoinments =(item)=>{
        if(this.props.user.profile.occupation =="Customer"){
           return   this.props.navigation.navigate('ViewAppoinment',{item})
        }
        return this.props.navigation.navigate('ViewAppoinmentDoctors',{item})
    }
    validateColor =(status)=>{
        if(status =="Completed"){
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
    FirstRoute =()=>{
        return(
            <FlatList 
              data={this.state.appoinments}
              keyExtractor ={(item,index)=>index.toString()}
              renderItem ={({item,index})=>{
             
            if (this.props.user.profile.occupation == "Customer") {
              
                            let dp =null
                            if (item.doctordetails.dp){
                                dp = `${url}${item.doctordetails.dp}`
                            }
               
                return(
                    <TouchableOpacity
                        onPress={() => { this.viewAppoinments(item) }}
                      style={{
                            marginTop: 10,
                            minHeight: height * 0.1,
                            backgroundColor: "#eee",
                            marginHorizontal: 10,
                            borderRadius: 10,
                      }}
                    >

                 
                    <View
              
                        style={{
                           
                            flexDirection: "row"
                        }}

                    >
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.navigate('ProfileView') }}
                        >
                            <Image
                                source={{ uri: dp||"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                style={{ height: 60, width: 60, borderRadius: 30 }}
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 0.4, justifyContent: "space-around", alignItems: "center", }}>
                            <Text style={[styles.text]}>{item.doctordetails.name}</Text>
                            <Text style={[styles.text]}>{item.clinicname}</Text>
                        </View>

                        {/* TABS */}

                        <View style={{ flex: 0.4, flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', justifyContent: "center" }}>
                                <Text style={[styles.text]}>Status:</Text>
                                <Text style={[styles.text,{color:this.validateColor(item.status)}]}>{item.status}</Text>
                            </View>

                        </View>

                    </View>
                        <View style={{
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


                        </View>
                    </TouchableOpacity>
                )
                }else{
                    return(
                        <TouchableOpacity
                            onPress={() => { this.viewAppoinments(item)}}
                         style={{
                                marginTop: 10,
                                minHeight: height * 0.1,
                                backgroundColor: "#eee",
                                marginHorizontal: 10,
                                borderRadius: 10,
                         }}
                        >

                 
                        <View
                            style={{
                               
                                flexDirection: "row"
                            }}

                        >
                            <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                                onPress={() => { this.props.navigation.navigate('ProfileView') }}
                            >
                                <Image
                                    source={{ uri: item.patientname.dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                    style={{ height: 60, width: 60, borderRadius: 30 }}
                                />
                            </TouchableOpacity>
                            <View style={{ flex: 0.4, justifyContent: "space-around", alignItems: "center", }}>
                                <Text style={[styles.text]}>{item.patientname.name}</Text>
                                <Text style={[styles.text]}>{item.patientname.mobile}</Text>
                            </View>



                            <View style={{ flex: 0.4, flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
                                   {/* this */}
                              


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
                            </View>
                            
                        </View>
                        <View style ={{
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
                       
                        
                        </View>
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
                data={this.state.appoinments2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    if (this.props.user.profile.occupation == "Customer") {
                        let dp = null
                        if (item.doctordetails.dp) {
                            dp = `${url}${item.doctordetails.dp}`
                        }
                        return (
                            <TouchableOpacity
                                style={{
                                    marginTop: 10,
                                    minHeight: height * 0.1,
                                    backgroundColor: "#eee",
                                    marginHorizontal: 10,
                                    borderRadius: 10,
                                    flexDirection: "row"
                                }}

                            >
                                <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                                    onPress={() => { this.props.navigation.navigate('ProfileView') }}
                                >
                                    <Image
                                        source={{ uri: dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                        style={{ height: 60, width: 60, borderRadius: 30 }}
                                    />
                                </TouchableOpacity>
                                <View style={{ flex: 0.4, justifyContent: "space-around", alignItems: "center", }}>
                                    <Text style={[styles.text]}>{item.doctordetails.name}</Text>
                                    <Text style={[styles.text]}>{item.clinicname}</Text>
                                </View>

                                {/* TABS */}

                                <View style={{ flex: 0.4, flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
                                    <View style={{ alignItems: 'center', justifyContent: "center" }}>
                                        <Text style={[styles.text]}>Status:</Text>
                                        <Text style={[styles.text, { color: this.validateColor(item.status) }]}>{item.status}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>

                        )
                    } else {
                        return (
                            <View
                                style={{
                                    marginTop: 10,
                                    minHeight: height * 0.1,
                                    backgroundColor: "#eee",
                                    marginHorizontal: 10,
                                    borderRadius: 10,
                                    flexDirection: "row"
                                }}

                            >
                                <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                                    onPress={() => { this.props.navigation.navigate('ProfileView') }}
                                >
                                    <Image
                                        source={{ uri: item.patientname.dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                        style={{ height: 60, width: 60, borderRadius: 30 }}
                                    />
                                </TouchableOpacity>
                                <View style={{ flex: 0.4, justifyContent: "space-around", alignItems: "center", }}>
                                    <Text style={[styles.text]}>{item.patientname.name}</Text>
                                    <Text style={[styles.text]}>{item.patientname.mobile}</Text>
                                </View>



                                <View style={{ flex: 0.4, flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
                                   
                                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                                        
                                        <Octicons name="primitive-dot" size={24} color={this.validateStatus(item.status)} />
                                    </View>
                                </View>
                            </View>
                        )
                    }
                }}
            />
        )
       
    }
    renderScene = SceneMap({
        NewAppoinments: this.FirstRoute,
        Completed: this.SecondRoute,
    });
    // renderScene = (routes) => {

    //     return(<FlatList 
    //         data ={this.state.appoinments}
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
                              onPress ={()=>{this.acceptAppoinment()}}
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
                                <Text style={[styles.text, { color: '#fff', marginLeft: 20, fontWeight: 'bold' ,fontSize:25}]}>Appoinments</Text>
                            </View>
                           
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
                         {/* Appoinments */}
                        {this.Modal()}
                        {this.state.show && (
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
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user:state.selectedUser
    }
}
export default connect(mapStateToProps, { selectTheme })(Appointments);
