import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    SafeAreaView,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    TextInput
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import settings from '../AppSettings';
import { Fontisto } from '@expo/vector-icons';
import moment from 'moment';
import { connect } from 'react-redux';
import { selectTheme,selectClinic } from '../actions';
import authAxios from '../api/authAxios';
import HttpsClient from "../api/HttpsClient";
import Modal from 'react-native-modal';
import { Ionicons, Entypo, Feather, MaterialCommunityIcons, FontAwesome, FontAwesome5, EvilIcons} from '@expo/vector-icons';
const url =settings.url
const fontFamily = settings.fontFamily;
const themeColor =settings.themeColor
const cardHeight = 250;
const MARGIN = 20
const CARD_HEIGHT =cardHeight+MARGIN*2
const cardTitle = 75;
const cardPadding = 20;

const { height,width } = Dimensions.get("window");
const screenHeight =Dimensions.get('screen').height;

class Priscription extends React.Component {
    constructor(props) {
        const Date1 = new Date()
        const day = Date1.getDate()
        const month = Date1.getMonth() + 1
        const year = Date1.getFullYear()
        const today = `${year}-${month}-${day}`
    
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            y: new Animated.Value(0),
            showList: true,
            today,
            mode: 'date',
            date: new Date(),
            show: false,
            user:this.props.user,
            isDoctor:false,
            loading:true,
            showModal:false,
            selectedClinic:null,
            clinics:[],
            prescriptions:[],
            isReceptionist:false,
            isFetching:false,
            search:false
        };
    }
    onChange = (selectedDate) => {
        if (selectedDate.type == "set") {
            this.setState({ today: moment(new Date(selectedDate.nativeEvent.timestamp)).format('YYYY-MM-DD'), show: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {
                if(this.state.isDoctor){
                    this.getPrescription()
                }else{
                    this.getClinicPrescription()
                }
             
            })

        } else {
            return null
        }

    }
    getPateintPrescription = async()=>{
        let api = `${url}/api/prescription/prescriptions/?forUser=${this.props.user.id}`
        let data =await HttpsClient.get(api)
        console.log(api)
        if(data.type =="success"){
            this.setState({ prescriptions:data.data,isFetching:false})
        }
    }
    getPrescription = async()=>{
      
        let api = `${url}/api/prescription/prescriptions/?doctor=${this.props.user.id}&date=${moment(this.state.date).format("YYYY-MM-DD")}`
        console.log(api)
        let data  =await HttpsClient.get(api)
    
      if(data.type == 'success'){
          this.setState({ prescriptions:data.data})
          this.setState({ loading: false ,isFetching:false})
      }
    }
    getClinicPrescription = async()=>{
        let api = `${url}/api/prescription/prescriptions/?clinic=${this.props.user.profile.recopinistclinics[0].clinicpk}&date=${moment(this.state.date).format("YYYY-MM-DD")}`
        let data = await HttpsClient.get(api)
  console.log(api)
        if (data.type == 'success') {
            this.setState({ prescriptions: data.data })
            this.setState({ loading: false ,isFetching:false})
        }
     
    }
    getClinics = async()=>{
        const api = `${url}/api/prescription/getDoctorClinics/?doctor=${this.props.user.id}`
        const data = await HttpsClient.get(api)
        console.log(api)
       console.log(data)
        if(data.type=="success"){
      
            this.setState({ clinics: data.data.workingclinics})
            let activeClinic = data.data.workingclinics.filter((i)=>{
                return i.active
            })
         console.log(activeClinic[0])
            this.props.selectClinic(activeClinic[0]||data.data.workingclinics[0])
      
        }
    }
    setActiveClinic = async(item) => {
        const api = `${url}/api/prescription/doctorActive/`
        let sendData ={
            deactiveClinic:this.props.clinic.pk,
            activeClinic:item.pk
        }
        let patch = await HttpsClient.post(api,sendData)
        if(patch.type =="success"){
        
            this.props.selectClinic(item)
            this.setState({showModal:false})
        }
    
    }
    findUser =()=>{
        if (this.props.user.profile.occupation =="Doctor"){
           
              this.getClinics()
              this.getPrescription()
              this.setState({isDoctor:true,})
        } else if (this.props.user.profile.occupation == "ClinicRecoptionist"){
            this.getClinicPrescription()
            this.setState({ isReceptionist: true, })
        }
        else{
            this.getPateintPrescription()
        }

        this.setState({ loading: false })
    }
    componentDidMount(){
       this.findUser()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if(this.state.isDoctor){
                this.getPrescription()
            }
            
        });
    }
    searchPriscriptions =(text)=>{
     let filter  =this.state.prescriptions.filter((i)=>{
         return i.clinicname.name.includes(text)
     })
        this.setState({ prescriptions:filter})
    }
    componentWillUnmount(){
        this._unsubscribe();
    }
    showDifferentPriscription =(item,index)=>{
      if(this.state.isDoctor){
          return(
              <TouchableOpacity style={[styles.card, { flexDirection: "row", borderRadius: 5 }]}
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
                          <Text style={[styles.text, { fontSize: 18, }]}>{item.username}</Text>
                      </View>

                  </View>
                  <View style={{ flex: 0.3, justifyContent: 'center', alignItems: "center" }}>
                      <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                          <Text>{moment(item.created).format("DD/MM/YYYY")}</Text>

                      </View>
                      <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                          <Text>{moment(item.created).format("h:mm a")}</Text>
                      </View>

                  </View>
              </TouchableOpacity>
          )
      }
      if(this.state.isReceptionist){

           let dp =null
          if (item?.doctordetails?.dp){
              dp = `${url}${item?.doctordetails?.dp}`
          }
         
          return(
              <TouchableOpacity style={[styles.card, { flexDirection: "row", borderRadius: 5 }]}
                  onPress={() => { this.props.navigation.navigate('showCard', { item }) }}
              >
                  <View style={{ flex: 0.3, alignItems: 'center', justifyContent: "center" }}>
                      <Image
                          source={{ uri:dp|| "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                          style={{ height: 60, width: 60, borderRadius: 30 }}
                      />
                  </View>
                  <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                      <View >
                          <Text style={[styles.text, { fontSize: 18, }]}>{item?.username}</Text>
                          <Text style={[styles.text, { fontSize: 12, }]}>{item?.doctordetails?.name}</Text>
                  
                      </View>

                  </View>
                  <View style={{ flex: 0.3, justifyContent: 'center', alignItems: "center" }}>
                      <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                          <Text>{moment(item.created).format("DD/MM/YYYY")}</Text>

                      </View>
                      <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                          <Text>{moment(item.created).format("h:mm a")}</Text>
                      </View>

                  </View>
              </TouchableOpacity>
          )
      }
        
      // if patient
      return(
          <TouchableOpacity style={[styles.card, { flexDirection: "row", borderRadius: 5 }]}
              onPress={() => { this.props.navigation.navigate('showCard', { item }) }}
          >
              {/* <View style={{ flex: 0.3, alignItems: 'center', justifyContent: "center" }}>
                  <Image
                      source={{ uri: item?.doctordetails?.dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                      style={{ height: 60, width: 60, borderRadius: 30 }}
                  />
              </View> */}
              <View style={{ flex: 0.7,}}>
                  <View style={{justifyContent:"space-around",flex:1}}>
                      <Text style={[styles.text, { fontSize: 18,}]}>{item?.clinicname.name}</Text>
                      <Text style={[styles.text, { fontSize: 12,fontWeight:"bold" }]}>Reason:</Text>
                      <Text style={[styles.text, { fontSize: 12, }]}>{item.ongoing_treatment}</Text>
                  </View>

              </View>
              <View style={{ flex: 0.3, justifyContent: 'center', alignItems: "center" }}>
                  <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                      <Text>{moment(item.created).format("DD/MM/YYYY")}</Text>

                  </View>
                  <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                      <Text>{moment(item.created).format("h:mm a")}</Text>
                  </View>

              </View>
          </TouchableOpacity>
      )
    }
    onRefresh =()=>{
        this.setState({isFetching:true})
        if(this.state.isDoctor){
            this.getPrescription()
        }else if(this.state.isReceptionist){
            this.getClinicPrescription()
        }else{
            this.getPateintPrescription()
        }
    }
    validateHeaders =()=>{
        if(this.state.isDoctor){
            return(<View style={{flex:1,justifyContent:'center'}}>
                <TouchableOpacity style={{ flexDirection:"row",}}
                    onPress={() => { this.setState({ showModal: true }) }}
                >
                    <Text style={{ color: '#fff', fontFamily: "openSans", marginLeft: 20, fontSize: 25, fontWeight: "bold" }}>{this.props?.clinic?.name}</Text>
                   <View style={{alignItems:'center',justifyContent:"center",marginLeft:10}}>
                        <FontAwesome5 name="angle-down" size={24} color="#fff" />
                   </View>
                
                </TouchableOpacity>

            </View>
                
             
                   
                
            )
        }

        return(
            <>
                {!this.state.search?<View style={{ flex: 1, flexDirection:"row"}}>
                    <View style={{flex:0.8,justifyContent:'center'}}>
                        <Text style={{ color: '#fff', fontFamily: "openSans", marginLeft: 20, fontSize: 30, fontWeight: "bold" }}>Prescription</Text>

                    </View>
                    <TouchableOpacity style={{flex:0.2,alignItems:'center',justifyContent:"center"}}
                     onPress={()=>{this.setState({search:true})}}
                    >
                        <Feather name="search" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>:
                    <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" ,flex:1}}>
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                            onPress={() => { this.setState({ search: false }); }}
                        >
                            <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.8 }}>
                            <TextInput

                                style={{ height: height * 0.04, width: width * 0.7, backgroundColor: "#fff", borderRadius: 10, paddingLeft: 20 }}
                                placeholder="search"
                                onChangeText={(text) => { this.searchPriscriptions(text) }}
                            />
                        </View>
                    </View>
                }
                
            </>
        )
    }
    render() {
        const y= new Animated.Value(0);
        const onScroll = Animated.event([{nativeEvent:{contentOffset:{y}}}],{
            useNativeDriver:true
        })
        return (
           
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                <StatusBar backgroundColor={themeColor} barStyle={"default"}/>
                    {/* HEADERS */}
                    <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: "row" }}>
                        {
                            this.validateHeaders()
                        }
                    </View>
   {  !this.state.loading?       <View style={{flex:1,backgroundColor:"#f3f3f3f3"}}>
           
                 
                        {this.state.isDoctor || this.state.isReceptionist&&<View style={{height: height * 0.07,alignItems:"center",justifyContent:"space-around",flexDirection:"row"}}>
                 <View style={{flexDirection:"row"}}>
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
                        <Text style={[styles.text,]}> Total:{this.state.prescriptions.length}</Text>
                    </View>
                </View>}
                        <FlatList
                          contentContainerStyle={{ paddingBottom: 90 }}
                          onRefresh={() => this.onRefresh()}
                          refreshing={this.state.isFetching}
                          data={this.state.prescriptions}
                          keyExtractor={(item,index)=>index.toString()}
                          renderItem={({item,index})=>{
                               return(
                                   <View>
                                       {
                                           this.showDifferentPriscription(item,index)
                                       }
                              
                                   </View>
                                  
                               )
                          }}
                        />
                          
            

                  { this.state.isDoctor&&<View style={{
                            position: "absolute",
                            bottom: 100,
                            left: 20,
                            right: 20,
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",

                            borderRadius: 20
                        }}>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('addPriscription') }}
                            >
                                <AntDesign name="pluscircle" size={40} color={themeColor} />
                            </TouchableOpacity>
                        </View>}
            </View>:<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color={themeColor}/>
                </View>}
                    <Modal
                        deviceHeight={screenHeight}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        isVisible={this.state.showModal}
                        onBackdropPress={() => { this.setState({showModal : false })}}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            
                            <View style={{ height: height * 0.3, width: width * 0.9, backgroundColor: "#fff", borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                                <View style={{ alignItems: "center", justifyContent: "center",marginTop:10 }}>
                                    <Text style={[styles.text, { color: "#000", fontWeight: "bold" ,fontSize:16}]}>Select Clinic</Text>
                                </View>
                                <FlatList
                                    data={this.state.clinics}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity style={{ flexDirection: "row", marginTop: 20, alignItems: 'center', justifyContent: "space-around", width }}
                                                onPress={() => { this.setActiveClinic(item) }}
                                            >
                                                <Text style={[styles.text]}>{item.name}</Text>
                                                <View >
                                                    <FontAwesome name="dot-circle-o" size={24} color={this.props.clinic == item ? themeColor : "gray"} />

                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />

                            </View>
                        </View>
                    </Modal>
         </SafeAreaView>
        
        </>
        );
    }
}

const styles = StyleSheet.create({
    text:{
       fontFamily
    },
    root: {
         flex:1,
         marginHorizontal:20
    },
    container: {
        flex: 1
    },
    content: {
        height: height * 2
    },
    card: {
        
        backgroundColor:"#eeee",
        height:height*0.1,
        marginHorizontal:10,
        marginVertical:3
       
    },
    topSafeArea: {
        flex: 0,
        backgroundColor: themeColor
    },
    bottomSafeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
});
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user:state.selectedUser,
        clinic:state.selectedClinic

    }
}
export default connect(mapStateToProps, { selectTheme, selectClinic })(Priscription)