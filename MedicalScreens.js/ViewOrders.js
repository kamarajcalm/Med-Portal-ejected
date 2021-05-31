import React, { Component } from 'react';
import { View, Text, Dimensions,ActivityIndicator, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView,Alert } from 'react-native';
import { Ionicons, Entypo, AntDesign ,MaterialIcons} from '@expo/vector-icons';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../AppSettings';
import medicine from '../components/Medicine';
import Medicine from '../components/Medicine';
import HttpsClient from '../api/HttpsClient';
import moment from 'moment';
const { height, width } = Dimensions.get("window");
const screenHeight = Dimensions.get("screen").height
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
const url = settings.url;
let types = [
    {
        label: "Pending", value: 'Pending'
    },
    {
        label: "Cancelled", value: 'Cancelled'
    },
    {
        label: "Received", value: 'Received'
    },
    {
        label: "Distrubutor Cancelled", value: 'Distrubutor Cancelled'
    },

]
import Modal from 'react-native-modal';
class ViewOrders extends Component {
    constructor(props) {
        let item =props.route.params.item
        super(props);
        this.state = {
            item,
            date: new Date(),
            show: false,
            today: this.props.route.params.item.expected_arriving,
            orderDetails: this.props.route.params.item.order_details,
            Discount: this.props.route.params.item.discount.toString(),
            Amount: this.props.route.params.item.amount.toString(),
            selectedStatus:this.props.route.params.item.status
        };
    }
    updateOrders = async () => {
        this.setState({ creating: true })
        if (this.state.orderDetails == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add order Details", "#dd7030",)
        }
        if (this.state.today == null) {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add expected Arriving", "#dd7030",)
        }
        if (this.state.Amount == "") {
            this.setState({ creating: false })
            return this.showSimpleMessage("Please add amount", "#dd7030",)
        }
        let api = `${url}/api/prescription/inventoryorders/${this.state.item.id}/`
        let sendData = {
            status: this.state.selectedStatus,
            order_details: this.state.orderDetails,
            expected_arriving: this.state.today,
            discount: this.state.Discount,
            amount: this.state.Amount,
         
        }
        let post = await HttpsClient.patch(api, sendData)
        console.log(post)
        if (post.type == "success") {
            this.setState({ 
                modal: false, 
                orderDetails: post.data.order_details, 
                Discount: post.data.discount.toString(), 
                Amount: post.data.amount.toString(), 
                selectedStatus:post.data.status 
            })
            this.setState({ creating: false })
            this.showSimpleMessage("Edited SuccessFully", "#00A300", "success")

        } else {
            this.setState({ creating: false })
            this.showSimpleMessage("Try again", "#B22222", "danger")
        }
    }
    hideDatePicker = () => {
        this.setState({ show: false })
    };
    handleConfirm = (date) => {

        this.setState({ today: moment(date).format('YYYY-MM-DD'), show: false, date: new Date(date) }, () => {


        })
        this.hideDatePicker();
    };
    showSimpleMessage(content, color, type = "info", props = {}) {
        const message = {
            message: content,
            backgroundColor: color,
            icon: { icon: "auto", position: "left" },
            type,
            ...props,
        };

        showMessage(message);
    }
    deleteCategory2 = async (item) => {
        let api = `${url}/api/prescription/inventoryorders/${this.state.item.id}/`
        let del = await HttpsClient.delete(api)
        if (del.type == "success") {
            this.showSimpleMessage("Deleted SuccessFully", "#00A300", "success")
            this.props.navigation.goBack()
        } else {
            this.showSimpleMessage("Try again", "#B22222", "danger")
        }
    }
    createAlert2 = (item) => {
        Alert.alert(
            "Do you want to delete?",
            `${this.state.item.order_details}`,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.deleteCategory2(item) } }
            ]
        );

    }
    modal=() => {
        return (
            <Modal
                deviceHeight={screenHeight}
                isVisible={this.state.modal}
                onBackdropPress={() => { this.setState({ modal: false }) }}
            >
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ height: height * 0.6, backgroundColor: "#eee", borderRadius: 10, }}>
                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <Text style={[styles.text, { color: '#000' }]}>Select status</Text>
                            <View style={{ marginTop: 10 }}>
                                <DropDownPicker
                                    items={types}
                                    defaultValue={this.state.selectedStatus}
                                    containerStyle={{ height: 40, width: width * 0.4 }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: '#fafafa', width: width * 0.4 }}

                                    onChangeItem={(item) => {
                                        this.setState({ selectedStatus: item.value })
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={[styles.text, { color: '#000' }]}>order Details</Text>
                                <TextInput
                                    multiline={true}
                                    style={{ width: width * 0.8, height: height * 0.07, backgroundColor: "#fff", borderRadius: 5, marginTop: 10 ,textAlignVertical:"top"}}
                                    selectionColor={themeColor}
                                    value={this.state.orderDetails}
                                    onChangeText={(orderDetails) => { this.setState({ orderDetails }) }}
                                />
                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={[styles.text, { color: "#000" }]}>Expected Arriving</Text>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => { this.setState({ show: true }) }}
                                    >
                                        <MaterialIcons name="date-range" size={24} color="black" />
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center', justifyContent: "center", marginLeft: 10 }}>
                                        <Text style={[styles.text]}>{this.state.today}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={[styles.text, { color: '#000' }]}>Discount</Text>
                                <TextInput
                                    keyboardType={"numeric"}
                                    style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#fff", borderRadius: 5, marginTop: 10 }}
                                    selectionColor={themeColor}
                                    value={this.state.Discount}
                                    onChangeText={(Discount) => { this.setState({ Discount }) }}
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={[styles.text, { color: '#000' }]}>Amount</Text>
                                <TextInput
                                    keyboardType={"numeric"}
                                    style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#fff", borderRadius: 5, marginTop: 10 }}
                                    selectionColor={themeColor}
                                    value={this.state.Amount}
                                    onChangeText={(Amount) => { this.setState({ Amount }) }}
                                />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <TouchableOpacity style={{ backgroundColor: themeColor, height: height * 0.05, width: width * 0.4, alignItems: 'center', justifyContent: 'center', marginTop: 25, borderRadius: 5 }}
                                    onPress={() => { this.updateOrders() }}
                                >
                                    {!this.state.creating ? <Text style={[styles.text, { color: '#fff' }]}>Add</Text> :
                                        <ActivityIndicator size={"small"} color={"#fff"} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </Modal>
        )
    }
    validateColor =(status)=>{
        if (status == "Pending"){
            return "orange"
        }
        if (status == "Cancelled") {
            return "red"
        }
        if (status == "Received") {
            return "green"
        }
        if (status == "Distrubutor Cancelled") {
            return "red"
        }
    }
    render() {
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    {/* Headers */}
                    <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6,alignItems:"center",justifyContent:"center" }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 24, fontWeight: 'bold' }]}>Order Details</Text>
                        </View>
                        <View style={{flex:0.2}}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 24, fontWeight: 'bold' }]}></Text>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                         <View style={{marginTop:10,marginHorizontal:10}}>
                             <Text style={[styles.text,{color:"#000"}]}>Order Details :</Text>
                             <View style={{marginTop:5,marginLeft:10}}>
                                <Text style={[styles.text]}>{this.state.orderDetails}</Text>
                             </View>
                         </View>
                        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                            <Text style={[styles.text, { color: "#000" }]}>Order Created :</Text>
                            <View style={{ marginTop: 5, marginLeft: 10 }}>
                                <Text style={[styles.text]}>{moment(this.state.item.created).format('YYYY-MM-DD')}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                            <Text style={[styles.text, { color: "#000" }]}>Expected Arriving :</Text>
                            <View style={{ marginTop: 5, marginLeft: 10 }}>
                                <Text style={[styles.text]}>{this.state.today}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                            <Text style={[styles.text, { color: "#000" }]}>Amount</Text>
                            <View style={{ marginTop: 5, marginLeft: 10,flexDirection:'row' }}>
                              
                                <Text style={[styles.text]}>₹ {this.state.Amount}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                            <Text style={[styles.text, { color: "#000" }]}>Discount</Text>
                            <View style={{ marginTop: 5, marginLeft: 10, flexDirection: 'row' }}>

                                <Text style={[styles.text]}>₹ {this.state.Discount}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                            <Text style={[styles.text, { color: "#000" }]}>Status</Text>
                            <View style={{ marginTop: 5, marginLeft: 10, flexDirection: 'row' }}>

                                <Text style={[styles.text, { color: this.validateColor(this.state.selectedStatus)}]}> {this.state.selectedStatus}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{position:"absolute",width,alignItems:"center",justifyContent:"space-around",bottom:30,flexDirection:'row'}}>
                        <TouchableOpacity 
                          style={{height:height*0.05,width:width*0.3,backgroundColor:themeColor,alignItems:"center",justifyContent:"center",borderRadius:5}}
                          onPress ={()=>{this.setState({modal:true})}}
                        >
                            <Text style={[styles.text],{color:"#fff"}}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ height: height * 0.05, width: width * 0.3, backgroundColor: "red",alignItems:"center",justifyContent:"center" ,borderRadius:5}}
                            onPress ={()=>{this.createAlert2()}}
                        >
                            <Text style={[styles.text], { color: "#fff" }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                        testID="2"
                        isVisible={this.state.show}
                        mode="date"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                    />
                    {
                        this.modal()
                    }
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

    }
}
export default connect(mapStateToProps, { selectTheme })(ViewOrders);