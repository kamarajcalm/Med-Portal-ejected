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
    TextInput,
    BackHandler,

} from "react-native";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
const url =settings.url
const fontFamily = settings.fontFamily;
const themeColor =settings.themeColor

const { height,width } = Dimensions.get("window");
const screenHeight =Dimensions.get('screen').height;
const { diffClamp } = Animated;
const headerHeight = height * 0.2;
class Priscription extends React.Component {
    constructor(props) {
        const Date1 = new Date()
        const day = Date1.getDate()
        const month = Date1.getMonth() + 1
        const year = Date1.getFullYear()
        const today = `${year}-${month}-${day}`
    
        super(props);
        this.state = {
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
            search:false,
            textRef1:React.createRef(),
            textRef2:React.createRef(),
        
         
        };
         this.scrollY=new Animated.Value(0)
        this.translateYNumber= React.createRef()
    } 
showDatePicker = () => {
       this.setState({show:true})
    };

hideDatePicker = () => {
    this.setState({ show: false })
    };

 handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
     this.setState({ dob: moment(date).format('YYYY-MM-DD'), show: false, date: new Date(date) }, () => {
         

     })
        this.hideDatePicker();
    };

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
        console.log(this.ref,"pppp")
       this.findUser()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if(this.state.isDoctor){
                this.getPrescription()
            }
            
        });
     this.backHandler = BackHandler.addEventListener('hardwareBackPress',()=>{
         if(this.state.search){
             this.setState({search:false})
             return true;
         }
        
         return false;
         
        })
    }
    searchPriscriptions =(text)=>{
     let filter  =this.state.prescriptions.filter((i)=>{
         return i.clinicname.name.includes(text)
     })
        this.setState({ prescriptions:filter})
    }
    searchPriscriptions2 = (text) => {
        let filter = this.state.prescriptions.filter((i) => {
            let match = i.username.toUpperCase()
            console.log(match,"gjhgjh")
            return match.includes(text.toUpperCase())
        })
        console.log(filter)
        this.setState({ prescriptions: filter })
    }
    componentWillUnmount(){
        this.backHandler.remove();
        this._unsubscribe();
    }
    showDifferentPriscription =(item,index)=>{
      if(this.state.isDoctor){

          return(
              <TouchableOpacity style={[styles.card,{ flexDirection: "row", borderRadius: 5 }]}
                  onPress={() => { this.props.navigation.navigate('showCard', { item }) }}
                //   onPress={() => { this.props.navigation.navigate('PrescriptionView', { item }) }}
              >
                   <View style={{flex:0.7}}> 
                      <View style={{ justifyContent: "space-around", flex: 1 }}>
                          <Text style={[styles.text, { fontSize: 18, }]}>{item?.username}</Text>
                          <Text style={[styles.text, { fontSize: 12, fontWeight: "bold" }]}>Reason:</Text>
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
    renderFilter = () => {
        if (this.state.isDoctor ||this.state.isReceptionist) {
            return (

                <View style={{ alignItems: "center", justifyContent: "center", width: width * 0.32, }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff" }]}>{this.state.today}</Text>
                        </View>

                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={() => { setShow(true) }}
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

                </View>

            )
        } else {
            return null
        }
    }

  validateHeaders = () => {
        console.log(this.props?.clinic?.name)
        if (this.state.isDoctor||this.state.isReceptionist) {
            return (
                <View>
                    <View style={{ height: headerHeight / 2, flexDirection: "row", flex: 1 }}>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", width: width * 0.68, justifyContent: "space-around" }}
                            onPress={() => { this.setState({showModal:true}) }}
                        >
                            <View>
                                {this.state,isDoctor ? <Text style={[styles.text, { fontSize: 25, color: "#fff", fontWeight: "bold", marginLeft: 5 }]} numberOfLines={1}>{props?.clinic?.name}</Text> :
                                    <Text style={[styles.text, { fontSize: 25, color: "#fff", fontWeight: "bold", marginLeft: 5 }]} numberOfLines={1}>{props?.user?.profile?.recopinistclinics[0]?.clinicname}</Text>
                                }

                            </View>

                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                {this.state.isDoctor && <Entypo name="chevron-small-down" size={30} color="#fff" />}
                            </View>


                        </TouchableOpacity>
                        {
                            renderFilter()
                        }
                    </View>

                    <View style={{ marginHorizontal: 20, height: headerHeight / 3, alignItems: 'center', justifyContent: "center", marginBottom: 5 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', borderRadius: 10, backgroundColor: "#eee", width: "100%", height: height * 0.05, }}
                            onPress={() => { props.navigation.navigate('SearchPatient') }}
                        >
                            <View style={{ alignItems: 'center', justifyContent: "center", marginLeft: 5, flex: 0.1 }}>
                                <EvilIcons name="search" size={24} color="black" />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text]}>Search Patient</Text>
                            </View>

                        </TouchableOpacity>

                    </View>
                </View>

            )

        }
        return (
            <View>
                <View style={{ height: headerHeight / 2, justifyContent: "center" }}>
                    <Text style={{ color: '#fff', fontFamily: "openSans", marginLeft: 20, fontSize: 30, fontWeight: "bold" }}>Prescription</Text>
                </View>

                <View style={{ marginHorizontal: 20, height: headerHeight / 3, alignItems: 'center', justifyContent: "center", marginBottom: 5 }}>
                    <View style={{ flexDirection: 'row', borderRadius: 10, backgroundColor: "#eee", width: "100%", height: height * 0.05, }}>
                        <View style={{ alignItems: 'center', justifyContent: "center", marginLeft: 5, flex: 0.1 }}>
                            <EvilIcons name="search" size={24} color="black" />
                        </View>
                        <TextInput

                            selectionColor={themeColor}
                            style={{ height: "90%", flex: 0.8, backgroundColor: "#eee", paddingLeft: 10, marginTop: 3 }}
                            placeholder="search"
                            onChangeText={(text) => { searchPriscriptions(text) }}
                        />
                    </View>

                </View>
            </View>
        )
    }
    renderFilter =()=>{
    if(this.state.isDoctor||this.state.isReceptionist){
        return (

            <View style={{ height: height * 0.07, alignItems: "center", justifyContent: "space-around", flexDirection: "row", }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.text, { color: "#000" }]}>{this.state.today}</Text>
                    <TouchableOpacity
                        style={{ marginLeft: 20 }}
                        onPress={() => { this.setState({ show: true }) }}
                    >
                        <Fontisto name="date" size={24} color={themeColor} />
                    </TouchableOpacity>
                    {/* {this.state.show && (
                        <DateTimePicker
                            testID="dateTimePicker1"
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={(time) => { this.onChange(time) }}
                        />
                    )} */}

                    <DateTimePickerModal
                        isVisible={this.state.show}
                        mode="date"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                    />
                </View>
                <View>
                    <Text style={[styles.text,]}> Total:{this.state.prescriptions.length}</Text>
                </View>
            </View>

        )
    }

    }
    getCloser = (value, checkOne, checkTwo) =>
        Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;
    render() { 
       
        const scrollYClamped = diffClamp(this.scrollY, 0, headerHeight);

        const translateY = scrollYClamped.interpolate({
            inputRange: [0, headerHeight],
            outputRange: [0, -(headerHeight / 2)],
        });


        translateY.addListener(({ value }) => {
           this.translateYNumber.current = value;
        });

        const handleScroll = Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: { y: this.scrollY },
                    },
                },
            ],
            {
                useNativeDriver: true,
            },
        );

        const handleSnap = ({ nativeEvent }) => {
            const offsetY = nativeEvent.contentOffset.y;
            if (
                !(
                    this.translateYNumber.current === 0 ||
                    this.translateYNumber.current === -headerHeight / 2
                )
            ) {
                if (this.ref.current) {
                    this.ref.current.scrollToOffset({
                        offset:
                            this.getCloser(this.translateYNumber.current, -headerHeight / 2, 0) ===
                                -headerHeight / 2
                                ? offsetY + headerHeight / 2
                                : offsetY - headerHeight / 2,
                    });
                }
            }
        };
        return (
           
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                <StatusBar backgroundColor={themeColor} barStyle={"default"}/>
                    {/* HEADERS */}
                    <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
                        {
                          this.validateHeaders()
                        }

                    </Animated.View>
   {  !this.state.loading?<Animated.View style={{flex:1,backgroundColor:"#f3f3f3f3"}}>
           
                 {
                     this.renderFilter()
                 }
              
                        <Animated.FlatList
                            onScroll={handleScroll}
                            onMomentumScrollEnd={handleSnap}
                          ref ={ref=>this.ref =ref}
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
            </Animated.View>:<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
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
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
        backgroundColor: themeColor,
        elevation: 6
    },
    subHeader: {
        height: headerHeight / 2,
        width: '100%',
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontFamily
    },
    root: {
        flex: 1,
        marginHorizontal: 20
    },
    container: {
        flex: 1
    },
    content: {
        height: height * 2
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0,
        shadowRadius: 4.65,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "#fff",
        height: height * 0.2,
        marginHorizontal: 10,
        marginVertical: 3

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
});
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user:state.selectedUser,
        clinic:state.selectedClinic

    }
}
export default connect(mapStateToProps, { selectTheme, selectClinic })(Priscription)