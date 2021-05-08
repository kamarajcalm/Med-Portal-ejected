import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView, FlatList } from 'react-native';
import settings from '../AppSettings';
import axios from 'axios';
import Modal from 'react-native-modal';
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
import { Ionicons, Entypo, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
import { connect } from 'react-redux';
import { selectTheme ,selectClinic} from '../actions';
import { NavigationContainer, CommonActions } from '@react-navigation/native';

class DoctorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    changeClinic=()=>{
       
    }
  
    componentDidMount(){
   
        console.log(this.props.user,"popo")
    }
    render() {
        return (
            <ScrollView style={{ }}
             contentContainerStyle ={{paddingBottom:90}}
            >
                <View style={{ marginHorizontal: 10 }}>
                  
                    <View style={{ backgroundColor: "gray", borderRadius: 10 ,elevation:5}}>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Age:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text,{color:"#fff"}]}>90</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>specialization:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.specialization}</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Qualification:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.qualification}</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Mobile:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.mobile}</Text>
                            </View>


                        </View>
                    </View>

                </View>
              
              <View style={{margin:10}}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={[styles.text, { fontWeight: "bold", }]}>Address</Text>
                    </View>
                    <View style={{ backgroundColor: "gray", borderRadius: 10, elevation: 5 }}>
                    <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                    >
                        <View style={{ flex: 0.5, justifyContent: "center" }}>
                            <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Area:</Text>
                        </View>
                        <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                            <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.address}</Text>
                        </View>


                    </View>
                        <View style={{ backgroundColor: "gray", borderRadius: 10, elevation: 5 }}>
                            <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                            >
                                <View style={{ flex: 0.5, justifyContent: "center" }}>
                                    <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>City:</Text>
                                </View>
                                <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.city}</Text>
                                </View>


                            </View>
                        </View>
                        <View style={{ backgroundColor: "gray", borderRadius: 10, elevation: 5 }}>
                            <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                            >
                                <View style={{ flex: 0.5, justifyContent: "center" }}>
                                    <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>State:</Text>
                                </View>
                                <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.state}</Text>
                                </View>


                            </View>
                        </View>
                        <View style={{ backgroundColor: "gray", borderRadius: 10, elevation: 5 }}>
                            <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                            >
                                <View style={{ flex: 0.5, justifyContent: "center" }}>
                                    <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Pincode:</Text>
                                </View>
                                <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.profile.pincode}</Text>
                                </View>


                            </View>
                        </View>
              </View>
                  
              </View>
              
              <View style={{margin:10}}>
                  <View style={{marginVertical:10}}>
                      <Text style={[styles.text,{fontWeight:"bold",}]}>Clinic List</Text>
                  </View>

                  <FlatList 
                    data={this.props.clinics}
                    keyExtractor ={(item,index)=>index.toString()}
                    renderItem ={({item,index})=>{
                        console.log(item)
                       return(
                           <View style={{ backgroundColor: "gray", borderRadius: 10 }}>
                               <TouchableOpacity style={{ flexDirection: "row", minHeight: height * 0.05,borderBottomColor:"#fff" ,borderBottomWidth:0.185}}
                                   onPress={() => { this.props.navigation.navigate('ViewClinicDetails',{item}) }}
                               >
                                   <View style={{ flex: 0.5, justifyContent: "center" }}>
                                       <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>{item.name}</Text>
                                   </View>
                                   <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                       <AntDesign name="rightcircleo" size={24} color="#fff" />
                                   </View>

                               </TouchableOpacity>
          
                           </View>
                        
                       )
                    }}
                  />
                  
              </View>
                <View style={{ margin: 10}}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={[styles.text, { fontWeight: "bold", }]}>Patient Attended</Text>
                    </View>
                    <View style={{ backgroundColor: "gray", borderRadius: 10, elevation: 5 }}>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>This Week:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>10</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>This Month:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>50</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>This Year:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>100</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection: "row", minHeight: height * 0.05, borderBottomColor: "#fff", borderBottomWidth: 0.185 }}

                        >
                            <View style={{ flex: 0.5, justifyContent: "center" }}>
                                <Text style={[styles.text, { fontWeight: "bold", color: "#fff", marginLeft: 10 }]}>Over All:</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 10, justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff" }]}>{this.props.user.totalPatients}</Text>
                            </View>


                        </View>
                        </View>
              </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily,
        fontSize:18
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
        user: state.selectedUser,
        clinic: state.selectedClinic
    }
}
export default connect(mapStateToProps, { selectTheme, selectClinic })(DoctorProfile)