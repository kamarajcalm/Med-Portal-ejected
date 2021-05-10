import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, SafeAreaView, ToastAndroid, Pressable, ActivityIndicator} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../AppSettings';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const { height ,width} = Dimensions.get("window");
const fontFamily =settings.fontFamily;
const themeColor=settings.themeColor;
const url =settings.url;
const screenHeight =Dimensions.get('screen').height
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import MedicineDetails from '../components/MedicineDetails';
import HttpsClient from '../api/HttpsClient';
import Toast from 'react-native-simple-toast';
import SimpleToast from 'react-native-simple-toast';
import DropDownPicker from 'react-native-dropdown-picker';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
class AddPrescription extends Component {
  constructor(props) {
      let sex= [
          {
             label:"Male",value:'Male'
          },
          {
              label: "Female", value: 'Female'
          },
          {
              label: "Others", value: 'Others'
          },
    ]
    super(props);
    this.state = {
                mode: 'date',
                date: new Date(),
                medicines:[],
                mobileNo:"",
                patientsName:'',
                Reason:'',
                healthIssues:[],
                loading: false,
                doctorFees:"",
                sex,
                healthIssue:"",
                Age:"",
                selectedSex:sex[0].value,
                nextVisit:null,
               show1:false,
               appointment_taken:false,
               appointmentId:null,
               Address:""
    };
  }
  componentDidMount(){
      
  }
    changeFunction = (type, value, index)=>{
        let duplicate = this.state.medicines

        if (type =="delete"){
            duplicate.splice(index,1)
          return this.setState({ medicines:duplicate});
        }
        if (type =="morning_count"){
            duplicate[index].morning_count =value
            return   this.setState({ medicines:duplicate})
        }
        if (type == "afternoon_count"){
            duplicate[index].afternoon_count = value
            return   this.setState({ medicines: duplicate })
        }
        if (type == "night_count") {
            duplicate[index].night_count = value
            return   this.setState({ medicines: duplicate })
        }
        if (type =="after_food"){
            duplicate[index].after_food = value
            return   this.setState({ medicines: duplicate })
        }
        if (type == "total_qty") {
            duplicate[index].total_qty = value
            return   this.setState({ medicines: duplicate })
        }
        if (type == "days") {
            duplicate[index].days = value
            return  this.setState({ medicines: duplicate })
        }
        if (type == "comment") {
            duplicate[index].command = value
            return  this.setState({ medicines: duplicate })
        }
        if (type == "variant") {
            duplicate[index].variant = value
            return this.setState({ medicines: duplicate })
        }
}
    backFunction =(medicines)=>{
        medicines.forEach((i)=>{
            i.after_food =false,
            i.morning_count=0,
            i.afternoon_count =0,
            i.night_count = 0,
            i.total_qty =0,
            i.days =0,
            i.medicine =i.id
        })
        this.setState({ medicines:this.state.medicines.concat(medicines)})
    }
 addPriscription = async()=>{
        let api =`${url}/api/prescription/addPrescription/`
        if(this.state.medicines.length == 0){
            return SimpleToast.show("Please add medicine")
        }
        if (this.state.doctorFees =="") {
           
            return SimpleToast.show("Please fill doctorFees")
        }
        if (this.state.Reason =="") {
            return SimpleToast.show("Please fill Reason")
        }
        this.state.medicines.forEach((i)=>{
            try{
                i.total_qty = i.days * (i.morning_count + i.afternoon_count + i.night_count)
            }
            catch (e){
                console.log(e)
            }
            
        })
        
        let sendData ={
            doctor: this.props.user.id,
            medicines:this.state.medicines,
            health_issues:this.state.healthIssues,
            username:this.state.patientsName,
            usermobile:this.state.mobileNo,
            ongoing_treatment:this.state.onGoingTreatMent,
            doctor_fees:this.state.doctorFees,
            clinic: this.props.clinic.clinicpk,
            age:this.state.Age,
            sex:this.state.selectedSex,
            appointment:this.state.appointmentId,
            next_visit:this.state.nextVisit,
            address:this.state.Address
        }
       const post = await HttpsClient.post(api,sendData)
       console.log(post)
       if(post.type=="success"){
           Toast.show("Added SuccessFully")
           setTimeout(()=>{
             this.props.navigation.goBack()
           },1500)
       }else{
           Toast.show("Try again")
       }
       
    }
    onChange1 = (selectedDate) => {
        if (selectedDate.type == "set") {
        let nextVisit =  moment(new Date(selectedDate.nativeEvent.timestamp)).format('YYYY-MM-DD')
        this.setState({ nextVisit,show1:false})
        }
    }
    searchUser = async(mobileNo)=>{
        let api = `${url}/api/prescription/getAppointmentUser/?doctor=${this.props.user.id}&user=${mobileNo}&clinic=${this.props.clinic.clinicpk}&requesteddate=${moment(new Date()).format('YYYY-MM-DD')}`
        this.setState({ mobileNo })
        if(mobileNo.length>9){
            this.setState({loading:true})
           const data = await HttpsClient.get(api)
           console.log(api)
  console.log(data)
           if(data.type =="success"){
               if (data.data.user.mobile == mobileNo){
                  
                   this.setState({ 
                       patientsName: data.data.user.name, 
                       healthIssues: data.data.user.health_issues,
                       Reason: data.data.user.appointment_reason,
                       appointment_taken: data.data.user.appointment_taken,
                       appointmentId: data.data.user.appointment,
                    })
               }
             this.setState({loading:false})
           }
        }
    }
    showSimpleMessage(content,color, type = "info", props = {}) {
        const message = {
            message: content,
            backgroundColor:color,
            icon: { icon: "auto", position: "left" },
            type,
            ...props,
        };

        showMessage(message);
    }
    setModalVisible = (visible) => {
        this.setState({ loading: visible });
    }
    pushIssues =(issue)=>{
        if (this.state.healthIssue!=""){
            let duplicate = this.state.healthIssues
            duplicate.push(this.state.healthIssue)
          return  this.setState({ healthIssues: duplicate, healthIssue: "" })
        }else{
            return this.showSimpleMessage("Health issue should not be empty", "#dd7030")
        }
        
    }
    deleteIssues =(i,index)=>{
       let duplicate =this.state.healthIssues
       duplicate.splice(index,1)
       this.setState({healthIssues:duplicate})
    }
  render() {
      const { loading } = this.state;
   
    return (
        <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.bottomSafeArea}>
        <View style={{flex:1}}>
                    {/* HEADERS */}
            <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection:'row',alignItems:"center"}}>
                <TouchableOpacity style={{flex:0.2,alignItems:"center",justifyContent:'center'}}
                  onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text,{ color: '#fff',marginLeft: 20 ,fontWeight:"bold",fontSize:20}]}> Prescription</Text>
                </View>
                 <View style={{flex:0.2}}>
                </View>       
            </View>
            {/* FORMS */}

            <ScrollView 
             contentContainerStyle={{ marginHorizontal:20}}
             showsVerticalScrollIndicator={false}
             keyboardShouldPersistTaps={"handled"}
            >
                
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Mobile No</Text>
                    <TextInput
                         maxLength ={10}
                         value ={this.state.mobileNo}
                         selectionColor={themeColor}
                         keyboardType="numeric"
                                onChangeText={(mobileNo) => { this.searchUser(mobileNo)}}
                         style={{ width: width * 0.9, height: height * 0.05, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10}}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Patient's Name</Text>
                    <TextInput
                        value ={this.state.patientsName}
                        selectionColor={themeColor}
                        onChangeText={(patientsName) => { this.setState({ patientsName }) }}
                        style={{ width: width * 0.9, height: height * 0.05, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10 }}
                    />
                </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Age</Text>
                            <TextInput
                               keyboardType ={"numeric"}
                                value={this.state.Age}
                                selectionColor={themeColor}
                                onChangeText={(Age) => { this.setState({ Age }) }}
                                style={{ width: width * 0.9, height: height * 0.05, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10 }}
                            />
                        </View>
                        <View style={{ marginTop: 20 ,flexDirection:"row"}}>
                            <View style={{alignItems:"center",justifyContent:"center"}}>
                                <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Sex</Text>

                            </View>
                           
                             <View style={{marginLeft:10}}>
                                <DropDownPicker
                                    items={this.state.sex}
                                    defaultValue={this.state.sex[0]?.value}
                                    containerStyle={{ height: 40, width: width * 0.4 }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: '#fafafa', width: width * 0.4 }}
                                    onChangeItem={item => this.setState({
                                        selectedSex: item.value
                                    })}

                                />
                             </View>
                          
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Address</Text>
                            <TextInput
                                value={this.state.Address}
                                selectionColor={themeColor}
                             
                                onChangeText={(Address) => { this.setState({ Address }) }}
                                style={{ width: width * 0.9, height: height * 0.1, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10 ,textAlignVertical:"top"}}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Health issues</Text>
                            {
                                this.state?.healthIssues?.map((i,index)=>{
                                      return(
                                          <View style={{margin:10,flexDirection:"row"}}
                                           key={index}
                                          >
                                              <View style={{flex:0.7}}>
                                                  <Text>{index + 1}. {i}</Text>
                                              </View>
                                              <TouchableOpacity style={{flex:0.3}}
                                               onPress={()=>{this.deleteIssues(i,index)}}
                                              
                                              >
                                                  <Entypo name="circle-with-cross" size={24} color="red" />
                                              </TouchableOpacity>

                                          </View>
                                      )
                                })
                            }
                            <View style={{flexDirection:'row',alignItems:"center",justifyContent:"space-around"}}>
                                <TextInput
                                    value ={this.state.healthIssue}
                                    selectionColor={themeColor}
                                    multiline={true}
                                    onChangeText={(healthIssue) => { this.setState({ healthIssue}) }}
                                    style={{ width: width * 0.6, height: height * 0.07, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10, }}
                                />
                                <TouchableOpacity 
                                  style={{height:height*0.05,alignItems:"center",justifyContent:'center',width:width*0.2,borderRadius:10,backgroundColor:themeColor,marginTop:10}}
                                  onPress={()=>{this.pushIssues()}}
                               
                               >
                                    <Text style={[styles.text,{color:"#fff"}]}>Add</Text>
                                </TouchableOpacity>
                            </View>
                          
                        </View>
                       {this.state.mobileNo.length>9&& <View style={{ marginTop: 20 }}>
                            <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Appointment Details:</Text>
                            <View style={{flexDirection:"row",marginTop:5,marginLeft:10}}>
                                <Text style={[styles.text,{fontWeight:"bold",color:"gray"}]}>Appointment Taken:</Text>
                                <Text style={[styles.text,{marginLeft:10}]}>{this.state.appointment_taken?"yes":"No"}</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "gray" }]}>Token Id:</Text>
                                <Text style={[styles.text, { marginLeft: 10 }]}>{this.state.appointmentId}</Text>
                            </View>
                        </View>}
                        <View style={{ marginTop: 20 }}>
                            <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Reason for this Visit</Text>
                            <TextInput
                                value ={this.state.Reason}
                                onChangeText={(Reason) => { this.setState({ Reason}) }}
                                selectionColor={themeColor}
                                multiline={true}
                                style={{ width: width * 0.9, height: height * 0.15, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10, textAlignVertical:"top"}}
                            />
                        </View>
              
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Add Medicines</Text>
                    <TouchableOpacity style={{marginTop:20,alignItems:"center",justifyContent:'center',flexDirection:"row"}}
                                onPress={() => { this.props.navigation.navigate("SearchMedicines", { backFunction: (medicines) => { this.backFunction(medicines) }}) }}
                    >
                        <AntDesign name="pluscircle" size={30} color={themeColor} />
                    </TouchableOpacity>
                </View>
                {
                   this.state.medicines.map((item,index)=>{
                        return(
                            <MedicineDetails item={item} index={index} changeFunction={(type, value, index) => { this.changeFunction(type, value, index)}} />
                        )
                    })
                }
                        <View style={{ marginTop: 20 }}>
                            <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Doctor Fees</Text>
                            <TextInput
                                value={this.state.doctorFees}
                                selectionColor={themeColor}
                                keyboardType="numeric"
                                onChangeText={(doctorFees) => { this.setState({ doctorFees }) }}
                                style={{ width: width * 0.9, height: height * 0.05, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10 }}
                            />
                        </View>
                        <View style={{ marginTop: 20 ,flexDirection:"row",flex:1}}>
                            <View style={{flex:0.5,}}>
                             
                                    <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 ,}}>Next Visit</Text>

                                
                            </View>
                            <View style={{flex:0.5,alignItems:"center"}}>
                                 <TouchableOpacity 
                                   onPress ={()=>{this.setState({show1:true})}}
                                 >
                                    <AntDesign name="calendar" size={24} color="black" />
                                 </TouchableOpacity>
                               
                                <Text style={[styles.text]}>{this.state.nextVisit}</Text>
                            </View>
                           
                        </View>
                <View style={{height:height*0.15,alignItems:"center",justifyContent:'center'}}>
                    <TouchableOpacity style={{height:height*0.06,alignItems:"center",justifyContent:'center',backgroundColor:themeColor,width:width*0.3,borderRadius:15}}
                      onPress={()=>{this.addPriscription()}}
                    >
                           <Text style={[styles.text,{color:"#fff"}]}>CREATE</Text>
                    </TouchableOpacity>
                </View>
                        <View style={styles.centeredView}>
                            <Modal
                             isVisible={loading}
                             deviceHeight ={screenHeight}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                     <ActivityIndicator color={themeColor} size ="large" />
                                      
                                    </View>
                                </View>
                            </Modal>
                        
                        </View>
            </ScrollView>
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
        </View>
     </SafeAreaView>
       </>
        
    );
 
  }
}
const styles= StyleSheet.create({
  text:{
      fontFamily
  },
  elevation:{
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0,
      shadowRadius: 4.65,

      elevation: 8,
  },
    card: {
        backgroundColor: "#fff",
        elevation: 6,
        margin: 10,
        height: height * 0.2,
        borderRadius:10,
        flexDirection:"row"
    },
    topSafeArea: {
        flex: 0,
        backgroundColor: themeColor
    },
    bottomSafeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
         height:60,
         width:60,
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignItems:"center",
        justifyContent:"center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user:state.selectedUser,
        clinic: state.selectedClinic
    }
}
export default connect(mapStateToProps, { selectTheme })(AddPrescription);