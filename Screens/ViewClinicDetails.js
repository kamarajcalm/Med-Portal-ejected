import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
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

class ViewClinicDetails extends Component {
    constructor(props) {
        let item =props.route.params.item

        super(props);
        this.state = {
            item
        };
    }
 componentDidMount(){
     console.log(this.props.user)
 }
  
    render() {
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    <View style={{ flex: 1 }}>
                           {/* HEADERS */}
                        <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                            <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                            </TouchableOpacity>
                            <View style={{ flex: 0.6, alignItems:"center",justifyContent:"center"}}>
                                <Text style={[styles.text, { color: "#fff",fontWeight:"bold",fontSize:20 }]}> {this.state.item.name}</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                            </View>
                        </View>
                     
                       <View style={{}}>
                          <Image 
                            style={{height:height*0.2,resizeMode:"cover"}}
                                source={{ uri:"https://thumbs.dreamstime.com/z/medical-clinic-asia-picture-showing-nurse-station-patients-61053463.jpg"}}
                          />
                          <View style={{padding: 10,}}>
                              <Text style={[styles.text,{fontWeight:"bold",fontSize:18}]}>Address:</Text>
                              <View style={{padding: 10,}}>
                                  <Text style={[styles.text]}>{this.state.item.address}</Text>
                              </View>
                          </View>
                            <View style={{ padding: 10, }}>
                                <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>Doctors:</Text>
                                <View style={{ padding: 10, }}>
                                    <Text style={[styles.text]}>Doctors</Text>
                                </View>
                            </View>
                            <View style={{ padding: 10, }}>
                                <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>Receptionists:</Text>
                                <View style={{ padding: 10, }}>
                                    <Text style={[styles.text]}>Receptions</Text>
                                </View>
                            </View>
                       </View>
                    </View>
                    <View 
                     style={{position:'absolute',bottom:50,alignItems:'center',justifyContent:"center",width}}
                    >
                        <TouchableOpacity 
                         style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:themeColor,borderRadius:5}}
                        >
                            <Text style={[styles.text,{color:"#fff"}]}>Manage</Text>
                        </TouchableOpacity>
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
    card: {
        backgroundColor: "#fff",
        elevation: 6,
        margin: 20,
        height: height * 0.3
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
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewClinicDetails);