import React, { useRef ,useEffect,useState} from 'react';
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
    RefreshControl,
    Keyboard
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import settings from '../AppSettings';
import { Fontisto } from '@expo/vector-icons';
import moment from 'moment';
import { connect } from 'react-redux';
import { selectTheme, selectClinic } from '../actions';
import authAxios from '../api/authAxios';
import HttpsClient from "../api/HttpsClient";
import Modal from 'react-native-modal';
import { Ionicons, Entypo, Feather, MaterialCommunityIcons, FontAwesome, FontAwesome5, EvilIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Priscription1 from './Priscription1';
import { color } from 'react-native-reanimated';
const url = settings.url
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor

const { height, width } = Dimensions.get("window");
const screenHeight = Dimensions.get('screen').height;


const { diffClamp } = Animated;
const headerHeight = height*0.2;
const Date1 = new Date()
const today1 = moment(Date1).format("YYYY-MM-DD")
const getCloser = (value, checkOne, checkTwo) =>
Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;
const Priscription = (props) => {
          //   STATES
    const[collapsed,setCollapsed] =useState(false)
    const[check,setChecked] =useState(false)
    const [showList,setShowList] =useState(true)
    const [today, setToday] = useState(today1)
    const stateRef = useRef("");
    const [mode, setMode] = useState("date")
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [user, setUser] = useState(props.user)
    const [isDoctor, setIsDoctor] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showModal,setShowModal] =useState(false)
    const [selectedClinic, setSelectedClinic] = useState(null)
    const [clinics,setClinics] =useState([])
    const [prescriptions, setPrescriptions] =useState([])
    const [isReceptionist,setIsReceptionist] =useState(false)
    const [isFetching, setIsFetching] =useState(false)
    const [search,setSearch] =useState(false)
    const [button,setButton] =useState(true)

    //         search:false,


    const ref = useRef(null);

    const scrollY = useRef(new Animated.Value(0));
    const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -(headerHeight / 2)],
    });

    const translateYNumber = useRef();

    translateY.addListener(({ value }) => {
    
        translateYNumber.current = value;
    });

    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollY.current },
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
                translateYNumber.current === 0 ||
                translateYNumber.current === -headerHeight / 2
            )
        ) {
            if (ref.current) {
               
                ref.current.scrollToOffset({
                    offset:
                        getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
                            -headerHeight / 2
                            ? offsetY + headerHeight / 2
                            : offsetY - headerHeight / 2,
                });
            }
        }
    };
   const searchPriscriptions = (text) => {
        let filter =prescriptions.filter((i) => {
            return i.clinicname.name.includes(text)
        })
       setPrescriptions(filter)
    }
   const getClinics = async () => {
        const api = `${url}/api/prescription/getDoctorClinics/?doctor=${props.user.id}`
        const data = await HttpsClient.get(api)
        console.log(api,"clinic api")
       
        if (data.type == "success") {
            setClinics(data.data.workingclinics)
            let activeClinic = data.data.workingclinics.filter((i) => {
                return i.active
            })
            console.log(activeClinic[0],"accc")
            props.selectClinic(activeClinic[0] || data.data.workingclinics[0])

        }
      
    }
  const  getPrescription = async () => {
    
      let api = `${url}/api/prescription/prescriptions/?doctor=${props.user.id}&date=${stateRef.current}`
        console.log(api,"prescription api")
        let data = await HttpsClient.get(api)
//   console.log(data.data)
        if (data.type == 'success') {
            setPrescriptions(data.data)
            setLoading(false)
            setIsFetching(false)
           
        }
 
    }
    const findUser =()=>{
        if (props.user.profile.occupation == "Doctor") {
            getClinics()
            getPrescription()
            setIsDoctor(true)
        } else if (props.user.profile.occupation == "ClinicRecoptionist") {
           getClinicPrescription()
           setIsReceptionist(true)
           
        }
        else {
          getPateintPrescription()
        }
        setLoading(false)
       
    }
  const  getPateintPrescription = async () => {
        let api = `${url}/api/prescription/prescriptions/?forUser=${props.user.id}`
        let data = await HttpsClient.get(api)
        console.log(api)
        if (data.type == "success") {
            setPrescriptions(data.data)
            setIsFetching(false)
        }
    }
  const  getClinicPrescription = async () => {
        let api = `${url}/api/prescription/prescriptions/?clinic=${props.user.profile.recopinistclinics[0].clinicpk}&date=${moment(date).format("YYYY-MM-DD")}`
        let data = await HttpsClient.get(api)
        console.log(api)
        if (data.type == 'success') {
            setPrescriptions(data.data)
            setLoading(false)
            setIsFetching(false)
      
        }

    }
 const   setActiveClinic = async (item) => {
        const api = `${url}/api/prescription/clinicDoctors/${item.pk}/`
        let sendData = {
           active:true
        }
        let patch = await HttpsClient.patch(api, sendData)
        if (patch.type == "success") {

            props.selectClinic(item)
            setShowModal(false)
       
        }

    }
    useEffect(()=>{
        stateRef.current =today1
       findUser();
        const unsubscribe = props.navigation.addListener('focus', () => {
            
        
            if (props.user.profile.occupation == "Doctor"){
                getPrescription()
            }
      
       

        });
      
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
            unsubscribe
        };
    },[])
  const  showDatePicker = () => {
      setShow(true)
    };

   const hideDatePicker = () => {
       setShow(false)
  
    };
    useEffect(()=>{
     
    },[])
useEffect (()=>{
if(isDoctor){
    getPrescription()
}else{
    getClinicPrescription()
}
},[date])
const _keyboardDidShow =()=>{
    setButton(false);

}
    const _keyboardDidHide =()=>{
        setButton(true);
    }

   const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setToday(moment(date).format('YYYY-MM-DD'))
        setShow(false)
        setDate(new Date(date))
       stateRef.current = moment(date).format('YYYY-MM-DD')
        // this.setState({ , show: false, date:  }, () => {
        //     if (this.state.isDoctor) {
        //         this.getPrescription()
        //     } else {
        //         this.getClinicPrescription()
        //     }

        // })
       hideDatePicker();
    };
   const renderFilter = () => {
        if (isDoctor || isReceptionist) {
            return (

                <View style={{ height: height * 0.05, alignItems: "center", justifyContent: "space-around", flexDirection: "row", }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[styles.text, { color: "#fff" }]}>{today}</Text>
                        <TouchableOpacity
                            style={{ marginLeft: 20 }}
                            onPress={()=>{setShow(true)}}
                        >
                            <Fontisto name="date" size={24} color={"#fff"} />
                        </TouchableOpacity>
 

                        <DateTimePickerModal
                            isVisible={show}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <View>
                        <Text style={[styles.text,{color:"#fff"}]}> Total:{prescriptions?.length}</Text>
                    </View>
                </View>

            )
        }else{
            return null
        }
    }

 const   validateHeaders =()=>{
     console.log(props?.clinic?.name)
   if(isDoctor||isReceptionist){
       return (
           <View>
               <View style={{ height: headerHeight / 2, }}>
                   <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 20, marginTop: 10 }}>
                       <View>
                           <Text style={[styles.text, { fontSize: 25, color: "#fff", fontWeight: "bold" }]}>{props?.clinic?.name}</Text>
                       </View>
                       <TouchableOpacity
                           onPress={() => { setShowModal(true) }}
                           style={{ flexDirection: "row" }}

                       >
                           {isDoctor && <View style={{ alignItems: "center", justifyContent: "center" }}>
                               <Text style={[styles.text, { color: "#fff", marginRight: 5 }]}>Edit</Text>
                           </View>}
                           {isDoctor && <Feather name="edit" size={24} color="#fff" />}
                       </TouchableOpacity>
                   </View>
                   {
                       renderFilter()
                   }
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
     return (
         <View>
             <View style={{ height: headerHeight / 2, justifyContent:"center"}}>
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
  const  showDifferentPriscription = (item, index) => {
     
        if (isDoctor) {

            return (
                <TouchableOpacity style={[styles.card, { flexDirection: "row", borderRadius: 5 }]}
                    // onPress={() => { props.navigation.navigate('showCard', { item }) }}
                  onPress={() => { props.navigation.navigate('PrescriptionView', { item, }) }}
                >
                    <View style={{ flex: 0.7 }}>
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
        if (isReceptionist) {

            let dp = null
            if (item?.doctordetails?.dp) {
                dp = `${url}${item?.doctordetails?.dp}`
            }

            return (
                <TouchableOpacity style={[styles.card, { flexDirection: "row", borderRadius: 5 }]}
                    onPress={() => { props.navigation.navigate('showCard', { item }) }}
                >
                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: "center" }}>
                        <Image
                            source={{ uri: dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
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
        return (
            <TouchableOpacity style={[styles.card, { flexDirection: "row", borderRadius: 5 }]}
                onPress={() => { props.navigation.navigate('showCard', { item }) }}
            >
                {/* <View style={{ flex: 0.3, alignItems: 'center', justifyContent: "center" }}>
                  <Image
                      source={{ uri: item?.doctordetails?.dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                      style={{ height: 60, width: 60, borderRadius: 30 }}
                  />
              </View> */}
                <View style={{ flex: 0.7, }}>
                    <View style={{ justifyContent: "space-around", flex: 1 }}>
                        <Text style={[styles.text, { fontSize: 18, }]}>{item?.clinicname.name}</Text>
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
   const onRefresh = () => {
       setIsFetching(true)
     
        if (isDoctor) {
            getPrescription()
        } else if (isReceptionist) {
          getClinicPrescription()
        } else {
         getPateintPrescription()
        }
    }
   
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#1c1c1c" style="light" />
            <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
               {
                   validateHeaders()
               }
            </Animated.View>
            <Animated.View style={{flex:1,}}>
                <Animated.FlatList
                 
                     refreshControl ={
                         <RefreshControl 
                            onRefresh={() => onRefresh()}
                            refreshing={isFetching}
                            progressViewOffset={headerHeight}
                         />
                     }
                 
                    scrollEventThrottle={16}
                    contentContainerStyle={{ paddingTop: headerHeight ,paddingBottom:90}}
                    onScroll={handleScroll}
                    ref={ref}
                    onMomentumScrollEnd={handleSnap}
                    data={prescriptions}
                    renderItem={({ item, index }) => {
                        return (
                          <View>
                              {
                                  showDifferentPriscription(item,index)
                              }
                          </View>
                       


                        )


                    }}
                    keyExtractor={(item, index) => index.toString()}
                />

            </Animated.View>
            { isDoctor &&button&&<View style={{
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
                    onPress={() => { props.navigation.navigate('addPriscription') }}
                >
                    <AntDesign name="pluscircle" size={40} color={themeColor} />
                </TouchableOpacity>
            </View>}
            <Modal
                deviceHeight={screenHeight}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                isVisible={showModal}
                onBackdropPress={() => { setShowModal(false) }}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <View style={{ height: height * 0.3, width: width * 0.9, backgroundColor: "#fff", borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                            <Text style={[styles.text, { color: "#000", fontWeight: "bold", fontSize: 16 }]}>Select Clinic</Text>
                        </View>
                        <FlatList
                            data={clinics}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={{ flexDirection: "row", marginTop: 20, alignItems: 'center', justifyContent: "space-around", width }}
                                        onPress={() => { setActiveClinic(item) }}
                                    >
                                        <Text style={[styles.text]}>{item.name}</Text>
                                        <View >
                                            <FontAwesome name="dot-circle-o" size={24} color={props.clinic == item ? themeColor : "gray"} />

                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />

                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
        backgroundColor:themeColor,
        elevation:6
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

        backgroundColor: "#eeee",
        height: height * 0.1,
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
});

const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user: state.selectedUser,
        clinic: state.selectedClinic

    }
}
export default connect(mapStateToProps, { selectTheme, selectClinic })(Priscription)
