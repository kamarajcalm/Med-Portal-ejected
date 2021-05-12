import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView, ScrollView} from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../AppSettings';
import medicine from '../components/Medicine';
import Medicine from '../components/Medicine';
import HttpsClient from '../api/HttpsClient';
import { LinearGradient } from 'expo-linear-gradient';
const { height, width } = Dimensions.get("window");
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
import RazorpayCheckout from 'react-native-razorpay';
const url = settings.url;
import axios from 'axios';

class PaymentPage extends Component {
    constructor(props) {


        super(props);
        this.state = {
          plans:[
              {
                  name:"1 Month Subscriptions",
                  cost:"₹500"
              },
            {
                name: "3 Month Subscriptions",
                cost: "₹1400"
            },
            {
                name: "6 Month Subscriptions",
                cost: "₹2800"
            },
            {
                name: "year Subscriptions",
                cost: "₹4700"
            },
          ]
        };
    }
    componentDidMount() {
   
    }
    makeOrder = async()=>{
        let api =` https://api.razorpay.com/v1/orders`
        let sendData ={
            amount: 50000,
            currency: "INR",
            receipt: "receipt#1",
            partial_payment:false,
        }
        let post = await axios.post(api,sendData)
       console.log(post)
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
                            <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff", fontWeight: "bold", fontSize: 20 }]}> Recharge</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                            </View>
                        </View>

                                                   {/* Current Pack */}
                       
                                                {/* Our plans */}

                        <View style={{alignItems:'center',justifyContent:"center"}}>
                            <Text style={[styles.text,{fontWeight:"bold",fontSize:18}]}>Our plans</Text>
                        </View>

                                              {/* Recharge cards */}
                        <ScrollView
                           showsVerticalScrollIndicator={false}
                        >
                            {
                                this.state.plans.map((i,index)=>{
                                    return(
                                         <LinearGradient
                                            key={index}
                                            style={[styles.card2, styles.elevation]}
                                            colors={['#4c669f', '#3b5998', '#192f6a']}
                                         >
                                            <TouchableOpacity 
                                             style={{flex:1}}
                                                onPress={() => {
                                                    var options = {
                                                        description: 'cascaca',
                                                        image: 'https://i.imgur.com/3g7nmJC.png',
                                                        currency: 'INR',
                                                        key: 'rzp_test_qlBHML4RDDiVon',
                                                        name: 'Acme Corp',
                                                        order_id:'order_H9o4idkggm3qMG',//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
                                                        prefill: {
                                                            email: 'kamraj089@gmail.com',
                                                            contact: '9191919191',
                                                            name: 'kamaraj'
                                                        },
                                                        theme: { color: '#1f1f1f' }
                                                    }
                                                    RazorpayCheckout.open(options).then((data) => {
                                                        console.log(data,"scs")
                                                        // handle success
                                                        alert(`Success: ${data.razorpay_payment_id}`);
                                                    }).catch((error) => {
                                                        // handle failure
                                                        console.log(error,"eeeee")
                                                        alert(`Error: ${error.code} | ${error.description}`);
                                                    });
                                                }}
                                            >
                                                <View style={{ alignItems: "center", justifyContent: "center", flex: 0.3 }}>
                                                    <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 ,color:"#fff"}]}>{i.name}</Text>
                                                </View>
                                                <View style={{ alignItems: 'center', justifyContent: "center", flex: 0.7 }}>
                                                    <Text style={styles.text, { fontSize: 22 ,color:"#fff"}}>{i.cost}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    )
                                })
                            }
                           
                        </ScrollView>
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
    elevation: {
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
        backgroundColor: "#333",
        elevation: 6,
        margin: 20,
        height: height * 0.3,
        borderRadius: 10,

    },
    card2: {
        backgroundColor: "#333",
        elevation: 6,
        margin: 20,
        height: height * 0.2,
        borderRadius: 10,

    },

})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user: state.selectedUser,
    }
}
export default connect(mapStateToProps, { selectTheme })(PaymentPage);