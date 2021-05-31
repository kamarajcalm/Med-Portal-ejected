import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView, Alert, ActivityIndicator} from 'react-native';
import { Ionicons, Entypo, AntDesign, FontAwesome, FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../AppSettings';
import medicine from '../components/Medicine';
import Medicine from '../components/Medicine';
import HttpsClient from '../api/HttpsClient';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
const { height, width } = Dimensions.get("window");
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const screenHeight = Dimensions.get("screen").height;
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import {  } from 'react-native-paper';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const url = settings.url;
let types = [
    {
        label: "Box", value: 'Box'
    },
    {
        label: "Strip", value: 'Strip'
    },
    {
        label: "Quantity", value: 'Quantity'
    },

]
class ViewItem extends Component {
    constructor(props) {
        let item = props.route.params.item
        super(props);
        this.state = {
            modal: false,
            MedicineName: "",
            Price: '',
            type: types[0].value,
            items: [],
            NoofStripe:'',
            NoofMedicines:"",
            boxes:"",
            item,
            date: new Date(),
            show:false,
            today: null,
        };
    }
    showDatePicker = () => {
        this.setState({ show: true })
    };

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
    addMedicine = async () => {
        this.setState({ creating: true })
        if (this.state.type =="Box"){
            if (this.state.boxes == "") {
                this.setState({ creating: false })
                return this.showSimpleMessage("Please add No of boxes", "#dd7030",)
            }
            if (this.state.NoofStripe == "") {
                this.setState({ creating: false })
                return this.showSimpleMessage("Please add No of Stripe", "#dd7030",)
            }
            if (this.state.NoofMedicines == "") {
                this.setState({ creating: false })
                return this.showSimpleMessage("Please add No of Medicines", "#dd7030",)
            }
        } else if (this.state.type =="Strip"){
            if (this.state.NoofStripe == "") {
                this.setState({ creating: false })
                return this.showSimpleMessage("Please add No of Stripe", "#dd7030",)
            }
            if (this.state.NoofMedicines == "") {
                this.setState({ creating: false })
                return this.showSimpleMessage("Please add No of Medicines", "#dd7030",)
            }
        }else{
            if (this.state.NoofMedicines == "") {
                this.setState({ creating: false })
                return this.showSimpleMessage("Please add No of Medicines", "#dd7030",)
            }
        }
    
     
        let api = `${url}/api/prescription/createSubInventories/`
        let sendData = {
            title:this.state.item.title,
            type:this.state.type,
            category:this.state.item.id,
            number_of_boxes:Number(this.state.boxes),
            number_of_strips:Number(this.state.NoofStripe),
            number_of_medicines:Number(this.state.NoofMedicines),
            expiry_date:this.state.today
        }

        let post = await HttpsClient.post(api, sendData)
        console.log(post)
        if (post.type == "success") {
            this.setState({ modal: false })
            this.setState({ creating: false })
            this.showSimpleMessage("Added SuccessFully", "#00A300", "success")
            this.getItems()
        } else {
            this.setState({ creating: false })
            this.showSimpleMessage("Try again", "#B22222", "danger")
        }
    }
    getItems = async () => {
        let api = `${url}/api/prescription/subinventory/?category=${this.props.route.params.item.id}`
        console.log(api)
        let data = await HttpsClient.get(api)
        if (data.type == "success") {
            this.setState({ items: data.data })
        }
    }
    componentDidMount() {
        this.getItems()
    }
    deleteCategory = async (item) => {
        let api = `${url}/api/prescription/subinventory/${item.id}/`
        let del = await HttpsClient.delete(api)
        if (del.type == "success") {
            this.showSimpleMessage("Deleted SuccessFully", "#00A300", "success")
            this.getItems()
        } else {
            this.showSimpleMessage("Try again", "#B22222", "danger")
        }
    }
    showDiffrentFields =()=>{
      
        if (this.state.type =="Box"){

            return(
                <>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={[styles.text, { color: '#000' }]}>No of  boxes</Text>
                        <TextInput
                            keyboardType={"numeric"}
                            style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#fff", borderRadius: 5, marginTop: 10 }}
                            selectionColor={themeColor}
                            value={this.state.boxes}
                            onChangeText={(boxes) => { this.setState({ boxes }) }}
                        />
                    </View>
                <View style={{ marginHorizontal: 20 ,marginTop:10}}>
                    <Text style={[styles.text, { color: '#000' }]}>No of strip per boxes</Text>
                    <TextInput
                        keyboardType={"numeric"}
                        style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#fff", borderRadius: 5, marginTop: 10 }}
                        selectionColor={themeColor}
                        value={this.state.NoofStripe}
                            onChangeText={(NoofStripe) => { this.setState({ NoofStripe }) }}
                    />
                </View>
                    <View style={{ marginHorizontal: 20, marginTop: 10}}>
                        <Text style={[styles.text, { color: '#000' }]}>No of Medicines per strip</Text>
                        <TextInput
                            keyboardType={"numeric"}
                            style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#fff", borderRadius: 5, marginTop: 10 }}
                            selectionColor={themeColor}
                            value={this.state.NoofMedicines}
                            onChangeText={(NoofMedicines) => { this.setState({ NoofMedicines }) }}
                        />
                    </View>
                </>
            )
        }
        if (this.state.type =="Strip"){
            return(
                <>
                <View style={{ marginHorizontal: 20 ,marginTop:10}}>
                    <Text style={[styles.text, { color: '#000' }]}>No of strip per boxes</Text>
                    <TextInput
                        keyboardType={"numeric"}
                        style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#fff", borderRadius: 5, marginTop: 10 }}
                        selectionColor={themeColor}
                        value={this.state.NoofStripe}
                            onChangeText={(NoofStripe) => { this.setState({ NoofStripe }) }}
                    />
                </View>
                    <View style={{ marginHorizontal: 20, marginTop: 10}}>
                        <Text style={[styles.text, { color: '#000' }]}>No of Medicines per strip</Text>
                        <TextInput
                            keyboardType={"numeric"}
                            style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#fff", borderRadius: 5, marginTop: 10 }}
                            selectionColor={themeColor}
                            value={this.state.NoofMedicines}
                            onChangeText={(NoofMedicines) => { this.setState({ NoofMedicines }) }}
                        />
                    </View>
                    </>
            )
        }
        if (this.state.type == "Quantity") {
            return (
                <>
                  
                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                        <Text style={[styles.text, { color: '#000' }]}>No of Medicines</Text>
                        <TextInput
                            keyboardType={"numeric"}
                            style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#fff", borderRadius: 5, marginTop: 10 }}
                            selectionColor={themeColor}
                            value={this.state.NoofMedicines}
                            onChangeText={(NoofMedicines) => { this.setState({ NoofMedicines }) }}
                        />
                    </View>
                </>
            )
        }
    }
    modal = () => {
        return (
            <Modal
                deviceHeight={screenHeight}
                isVisible={this.state.modal}
                onBackdropPress={() => { this.setState({ modal: false }) }}
            >
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ height: height * 0.6, backgroundColor: "#eee", borderRadius: 10, }}>
                    
                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                            <Text style={[styles.text, { color: '#000' }]}>Select Type</Text>
                            <View style={{ marginTop: 10 }}>
                                <DropDownPicker
                                    items={types}
                                    defaultValue={types[0].value}
                                    containerStyle={{ height: 40, width: width * 0.4 }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: '#fafafa', width: width * 0.4 }}

                                    onChangeItem={(item) => {
                                        this.setState({ type: item.value })
                                    }}
                                />
                            </View>

                        </View>
                        {
                            this.showDiffrentFields()
                        }
                        <View style={{marginTop:10,marginHorizontal:20}}>
                            <Text style={[styles.text,{color:"#000"}]}>Expiry date</Text>
                            <View style={{flexDirection:"row",marginTop:10}}>
                                <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}
                                 onPress ={()=>{this.setState({show:true})}}
                                >
                                    <MaterialIcons name="date-range" size={24} color="black" />
                                </TouchableOpacity>
                                 <View style={{alignItems:'center',justifyContent:"center",marginLeft:10}}>
                                     <Text style={[styles.text]}>{this.state.today}</Text>
                                 </View>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity style={{ backgroundColor: themeColor, height: height * 0.05, width: width * 0.4, alignItems: 'center', justifyContent: 'center', marginTop: 25, borderRadius: 5 }}
                                onPress={() => { this.addMedicine() }}
                            >
                                {!this.state.creating ? <Text style={[styles.text, { color: '#fff' }]}>Add</Text> :
                                    <ActivityIndicator size={"small"} color={"#fff"} />
                                }
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </Modal>
        )
    }
    createAlert = (item) => {
        Alert.alert(
            "Do you want to delete?",
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.deleteCategory(item) } }
            ]
        );

    }
    renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#000" }]}>#</Text>
                </View>
                <View style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#000" }]}>Boxes</Text>
                </View>
                <View style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#000" }]}>Strips</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#000" }]}>Medicines</Text>
                </View>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text], { color: "#000" }}>Qty</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                      <Text style={[styles.text,{color:'#000'}]}>status</Text>
                </View>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                 
                </View>
            </View>
        )
    }
    render() {
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    {/*headers  */}
                    <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.7, }}>
                            <Text style={[styles.text, { color: "#fff", fontSize: 24, fontWeight: 'bold' }]}>{this.props.route.params.item.title}</Text>
                        </View>

                    </View>
                    <FlatList
                        ListHeaderComponent={this.renderHeader()}
                        data={this.state.items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginTop: 5, flex: 1, backgroundColor: "#eee",paddingVertical:10}}

                                >
                                
                                        <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={[styles.text, { color: "#000" }]}>{index+1}</Text>
                                        </View>
                                        <View style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#000" }]}>{item.number_of_boxes}</Text>
                                        </View>
                                        <View style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#000" }]}>{item.number_of_strips}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { color: "#000" }]}>{item.number_of_medicines}</Text>
                                        </View>
                                        <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text], { color: "#000" }}>{item.quantity}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={[styles.text, { fontSize: 10, color: "#000"}]}>{item.timeleft}</Text>
                                        </View>
                                        <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                                         onPress ={()=>{
                                             this.createAlert(item)
                                         }}
                                        >
                                            <Entypo name="cross" size={20} color="red" />
                                        </TouchableOpacity>

                                </TouchableOpacity>
                            )
                        }}
                    />
                    <DateTimePickerModal
                        testID="2"
                        isVisible={this.state.show}
                        mode="date"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                    />
                    <View style={{
                        position: "absolute",
                        bottom: 50,
                        left: 20,
                        right: 20,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",

                        borderRadius: 20
                    }}>
                        <TouchableOpacity
                            onPress={() => { this.setState({ modal: true }) }}
                        >
                            <AntDesign name="pluscircle" size={40} color={themeColor} />
                        </TouchableOpacity>
                    </View>
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
        user: state.selectedUser,
        medical: state.selectedMedical
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewItem);