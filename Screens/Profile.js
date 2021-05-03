import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView, FlatList} from 'react-native';
import settings from '../AppSettings';
import axios from 'axios';
import Modal from 'react-native-modal';
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const screenHeight = Dimensions.get("screen").height
import { Ionicons, Entypo, AntDesign, Feather, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
const url =settings.url;
import { connect } from 'react-redux';
import { selectTheme ,selectClinic} from '../actions';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import DoctorProfile from './DoctorProfile';
import HttpsClient from '../api/HttpsClient';
import ReceptionistsProfile from './ReceptionistsProfile';
import PatientProfile from './PatientProfile';
const DATA =["clinic 1","clinic 2","clinic3","clinic4"]
 class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:false,
      showClinics:false,
      clinics:[],
      isDoctor:false,
      isReceptionist:false,
      isPatient:false
    };
  }
    request =async()=>{
     let data =await axios.get('http:192.168.29.98:8000/api/profile/users')
     console.log(data.data,"hhhh")
    }
   logOut =()=>{
     this.setState({showModal:false})
     AsyncStorage.clear();
     AsyncStorage.removeItem('login')
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
   ClinicSelect =()=>{
     this.setState({ showClinics:true})
   }
   getClinics = async () => {
     const api = `${url}/api/prescription/getDoctorClinics/?doctor=${this.props.user.id}`
     const data = await HttpsClient.get(api)

     if (data.type == "success") {
       this.setState({ clinics: data.data.workingclinics })
     }
   }
   findUser = () => {
     if (this.props.user.profile.occupation == "Doctor") {
       this.getClinics()
       this.setState({ isDoctor: true, })
     } else if (this.props.user.profile.occupation == "ClinicRecoptionist") {
       this.setState({ isReceptionist: true, })
    }
    else {
       this.setState({ isPatient: true, })
     }

   
   }
componentDidMount(){
  this.findUser()

}
   setActiveClinic = async (item) => {
     const api = `${url}/api/prescription/doctorActive/`
     let sendData = {
       deactiveClinic: this.props.clinic.pk,
       activeClinic: item.pk
     }
     let patch = await HttpsClient.post(api, sendData)
     if (patch.type == "success") {
       this.props.selectClinic(item)
       this.setState({ showClinics: false })
     }

   }

   diffrentiateUsers =()=>{
     if(this.state.isDoctor){
       return (
         <>
           <View style={{ height: height * 0.15, alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>
             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
               <Text style={[styles.text]}>Total patients</Text>
               <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>100</Text>
             </View>
             <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
               <Text style={[styles.text]}>Priscription Valid Till</Text>
               <View style={{ flexDirection: "row" ,marginTop:5}}>
                 <Feather name="calendar" size={24} color={"gray"} />
                 <Text style={[styles.text, { color:themeColor, fontSize: 20 }]}>11-10-2091</Text>
               </View>

             </TouchableOpacity>
           </View>
           <DoctorProfile ClinicSelect={() => { this.ClinicSelect() }} clinics ={this.state.clinics} />
         </>
       )
     }
     if(this.state.isReceptionist){
       return(
         <>
           <View style={{ height: height * 0.15, alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>
             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
               <Text style={[styles.text]}>Total patients</Text>
               <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>100</Text>
             </View>
             <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
               <Text style={[styles.text]}>Priscription Valid Till</Text>
               <View style={{ flexDirection: "row", marginTop: 5 }}>
                 <Feather name="calendar" size={24} color={"gray"} />
                 <Text style={[styles.text, { color: themeColor, fontSize: 20 }]}>11-10-2091</Text>
               </View>

             </TouchableOpacity>
           </View>
           <ReceptionistsProfile />
         </>
       )
     }
     if(this.state.isPatient){
       return(
         <>
           <PatientProfile />
         </>
       )
    
     }
    
   }
  render() {
    console.log(this.props.user.profile.displayPicture)
    return (
        <>
        <SafeAreaView style={styles.topSafeArea} />
        <SafeAreaView style={styles.bottomSafeArea}>
        <View style={{ flex:1,}}>
            <StatusBar backgroundColor={themeColor} />

                             {/* headers */}

            <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, justifyContent: "center", flexDirection: "row" }}>
              
              <View style={{ flex: 0.5, alignItems: 'center', justifyContent: "center" }}>
                <Text style={[styles.text, { color: "#fff" ,fontSize:25,fontWeight:"bold"}]}>Profile</Text>
              </View>
              <TouchableOpacity style={{ flex: 0.5, marginLeft: 20, alignItems: "center", justifyContent: 'center' ,flexDirection:"row"}}
                onPress={() => { this.setState({showModal:true})}}
              >
                <AntDesign name="logout" size={24} color="#fff" />
                <Text style={[styles.text,{marginLeft:10,color:"#fff"}]}>Log out</Text>
              </TouchableOpacity>
            </View>


            <View style={{flex:1}}>
                 <View style={{alignItems:"center",justifyContent:'center',flexDirection:"row",}}>
                  <View>
                  <View style={{ alignItems: "center", justifyContent: "center" ,marginTop:20,flexDirection:"row",marginLeft:10}}>
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
                  <View style={{alignItems:'center',justifyContent:"center",marginTop:20}}>
                    <Text style={[styles.text,{fontWeight:"bold",fontSize:18}]}>{this.props.user.first_name}</Text>
                  </View>
                  </View>
                        

                   
                    
            
               
                 </View>
                               {/* STATISTICS */}
                        {
                          this.diffrentiateUsers()
                        }
                
            </View>
                         {/* Modal */}
                  <View>
                    <Modal
                       statusBarTranslucent={true}
                       deviceHeight ={screenHeight}
                         animationIn="slideInUp"
                         animationOut="slideOutDown"
                         isVisible={this.state.showModal}
                         onBackdropPress={() => { this.setState({ showModal: false }) }}
                      >
                        <View style={{ flex:1,alignItems:'center',justifyContent:'center'}}>
                             <View style={{height:height*0.3,width:width*0.9,backgroundColor:"#fff",borderRadius:20,alignItems:"center",justifyContent:"space-around"}}>
                                  <View>
                                    <Text style={[styles.text,{fontWeight:"bold",color:themeColor,fontSize:20}]}>Do you want to logout?</Text>
                                  </View>
                                  <View style={{flexDirection:"row",alignItems:'center',justifyContent:"space-around",width,}}>
                                      <TouchableOpacity style={{backgroundColor:themeColor,height:height*0.05,width:width*0.2,alignItems:"center",justifyContent:'center',borderRadius:10}}
                                         onPress={()=>{this.logOut()}}
                                        >
                                          <Text style={[styles.text,{color:"#fff"}]}>Yes</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity style={{ backgroundColor: themeColor, height: height * 0.05, width: width * 0.2, alignItems: "center", justifyContent: "center" ,borderRadius:10}}
                                        onPress={()=>{this.setState({showModal:false})}}
                                      >
                                        <Text style={[styles.text, { color: "#fff" }]}>No</Text>
                                      </TouchableOpacity>
                                  </View>
                             </View>
                        </View>
                      </Modal>
              <Modal
                statusBarTranslucent={true}
                deviceHeight ={screenHeight}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                isVisible={this.state.showClinics}
                onBackdropPress={() => { this.setState({ showClinics: false }) }}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ height: height * 0.3, width: width * 0.9, backgroundColor: "#fff", borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                    <FlatList
                      data={this.state.clinics}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => {
                        console.log(this.props.clinic,"clinic")
                        return (
                          <TouchableOpacity style={{ flexDirection: "row", marginTop: 20, alignItems: 'center', justifyContent: "space-around", width }}
                            onPress={() => { this.setActiveClinic(item) }}
                          >
                            <Text style={[styles.text]}>{item.name}</Text>
                            <View >
                              <FontAwesome name="dot-circle-o" size={24} color={this.props.clinic.name == item.name ? themeColor : "gray"} />

                            </View>
                          </TouchableOpacity>
                        )
                      }}
                    />
                 
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
const styles =StyleSheet.create({
   text:{
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
    clinic:state.selectedClinic
  }
}
export default connect(mapStateToProps, { selectTheme, selectClinic })(Profile)