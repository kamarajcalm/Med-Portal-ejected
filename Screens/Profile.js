import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView, FlatList} from 'react-native';
import settings from '../AppSettings';
import axios from 'axios';
import Modal from 'react-native-modal';
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
import { Ionicons, Entypo, AntDesign, Feather, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
const url =settings.url;
import { connect } from 'react-redux';
import { selectTheme ,selectClinic} from '../actions';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import DoctorProfile from './DoctorProfile';
import HttpsClient from '../api/HttpsClient';
const DATA =["clinic 1","clinic 2","clinic3","clinic4"]
 class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:false,
      showClinics:false,
      clinics:[]
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
componentDidMount(){
  this.getClinics()
  console.log(this.props.clinic,"ccccccc")

}
  render() {
    return (
        <>
        <SafeAreaView style={styles.topSafeArea} />
        <SafeAreaView style={styles.bottomSafeArea}>
        <View style={{ flex: 1, }}>
            <StatusBar backgroundColor={themeColor} />
            <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, justifyContent: "center", flexDirection: "row" }}>
              
              <View style={{ flex: 0.5, alignItems: 'center', justifyContent: "center" }}>
                <Text style={[styles.text, { color: "#fff" }]}>Profile</Text>
              </View>
              <TouchableOpacity style={{ flex: 0.5, marginLeft: 20, alignItems: "center", justifyContent: 'center' ,flexDirection:"row"}}
                onPress={() => { this.setState({showModal:true})}}
              >
                <AntDesign name="logout" size={24} color="#fff" />
                <Text style={[styles.text,{marginLeft:10,color:"#fff"}]}>Log out</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                 <View style={{height:height*0.12,alignItems:"center",justifyContent:'center',flexDirection:"row"}}>
                      <View>
                        <Image
                          source={{ uri: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                          style={{ height: 60, width: 60, borderRadius: 30 }}
                        />
                        <Text style={[styles.text]}>kamaraj</Text>
                      </View>
                    
                <TouchableOpacity style={{}}
                  onPress={() => { this.props.navigation.navigate('ProfileEdit') }}
                >
                  <Entypo name="edit" size={20} color={themeColor} />
                </TouchableOpacity>
               
                 </View>
                               {/* STATISTICS */}
                 <View style={{height:height*0.15,alignItems:"center",justifyContent:"space-around",flexDirection:"row"}}>
                      <View style={{alignItems:'center',justifyContent:'center'}}>
                          <Text style={[styles.text]}>Total patients</Text>
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>100</Text>
                      </View>
                      <TouchableOpacity style={{alignItems:"center",justifyContent:"center"}}>
                          <Text style={[styles.text]}>Priscription balance</Text>
                          <View style={{flexDirection:"row"}}>
                               <Entypo name="wallet" size={24} color={themeColor} />
                                <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>250</Text>
                          </View>
                         
                      </TouchableOpacity>
                 </View>
              <DoctorProfile ClinicSelect={() => { this.ClinicSelect() }}/>
            </View>
                         {/* Modal */}
                  <View>
                    <Modal
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
                            onPress={() => { this.props.selectClinic(item) }}
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