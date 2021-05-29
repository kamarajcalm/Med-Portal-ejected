import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView, Alert} from 'react-native';
import { Ionicons, Entypo, AntDesign ,FontAwesome,FontAwesome5} from '@expo/vector-icons';
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
import { ActivityIndicator } from 'react-native-paper';
const url = settings.url;
let types = [
    {
        label: "Tablet", value: 'Tablet'
    },
    {
        label: "Drops", value: 'Drops'
    },
    {
        label: "Others", value: 'Others'
    },
    {
        label: "Capsules", value: 'Capsules'
    },
    {
        label: "Liquid", value: 'Liquid'
    },

    {
        label: "Cream", value: 'Cream'
    },
    {
        label: "Injections", value: 'Injections'
    },
]
class ViewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal:false,
          MedicineName:"",
          Price:'',
          type:types[0].value,
            items:[]
        };
    }
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
    addMedicine = async()=>{
        this.setState({creating:true})
        if(this.state.MedicineName ==""){
            return this.showSimpleMessage("Please add MedicineName", "#dd7030",)
        }
        if (this.state.Price == "") {
            return this.showSimpleMessage("Please add Price", "#dd7030",)
        }
        let api = `${url}/api/prescription/createSubs/`
        let sendData ={
            title: this.state.MedicineName,
            price:this.state.Price,
            type:this.state.type,
            category:this.props.route.params.item.id
        }
        
        let post = await HttpsClient.post(api,sendData)
        console.log(post)
        if(post.type =="success"){
            this.setState({modal:false})
            this.setState({ creating: false })
            this.showSimpleMessage("Added SuccessFully", "#00A300", "success")
            this.getItems()
        }else{
            this.setState({ creating: false })
            this.showSimpleMessage("Try again", "#B22222", "danger")
        }
    }
    getItems =async()=>{
        let api = `${url}/api/prescription/maincategory/?category=${this.props.route.params.item.id}`
        let data = await HttpsClient.get(api)
        if(data.type =="success"){
              this.setState({items:data.data})
        }
    }
    componentDidMount(){
        this.getItems()
    }
    deleteCategory =async(item)=>{
        let api = `${url}/api/prescription/maincategory/${item.id}/`
        let del =await HttpsClient.delete(api)
        if(del.type =="success"){
            this.showSimpleMessage("Deleted SuccessFully", "#00A300", "success")
            this.getItems()
        }else{
            this.showSimpleMessage("Try again", "#B22222", "danger")
        }
    }
    modal =()=>{
        return (
            <Modal
                deviceHeight={screenHeight}
                isVisible={this.state.modal}
                onBackdropPress={() => { this.setState({ modal: false }) }}
            >
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ height: height * 0.5, backgroundColor: "#eee", borderRadius: 10,}}>
                         <View style={{margin:20}}>
                             <Text style={[styles.text,{color:'#000'}]}>Enter Medicine Name</Text>
                             <TextInput 
                               style={{width:width*0.8,height:height*0.05,backgroundColor:"#fff",borderRadius:5,marginTop:10}}
                               selectionColor={themeColor}
                               value ={this.state.MedicineName}
                               onChangeText={(MedicineName) => { this.setState({MedicineName})}}
                             />
                         </View>
                        <View style={{marginHorizontal:20}}>
                            <Text style={[styles.text, { color: '#000' }]}>Enter Price</Text>
                            <TextInput
                                keyboardType={"numeric"}
                                style={{ width: width * 0.8, height: height * 0.05, backgroundColor: "#fff", borderRadius: 5, marginTop: 10 }}
                                selectionColor={themeColor}
                                value={this.state.Price}
                                onChangeText={(Price) => { this.setState({ Price }) }}
                            />
                        </View>
                        <View style={{ marginHorizontal: 20 ,marginTop:10}}>
                            <Text style={[styles.text, { color: '#000' }]}>Select Type</Text>
                            <View style={{marginTop:10}}>
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
                                       this.setState({type:item.value})
                                    }}
                                />
                            </View>
                      
                        </View>
                        <View style={{alignItems:"center",justifyContent:"center"}}>
                            <TouchableOpacity style={{ backgroundColor: themeColor, height: height * 0.05, width: width * 0.4, alignItems: 'center', justifyContent: 'center', marginTop: 25, borderRadius: 5 }}
                             onPress ={()=>{this.addMedicine()}}
                            >
                               {!this.state.creating? <Text style={[styles.text, { color: '#fff' }]}>Add</Text>:
                               <ActivityIndicator  size={"small"} color= {"#fff"}/>
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
            `${item.title}`,
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
    renderHeader =()=>{
        return (
            <View style={{flexDirection:'row',flex:1,marginTop:10}}>
                <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text,{color:"#000"}]}>#</Text> 
                </View>
                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text,{color:"#000"}]}>Title</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text,{color:"#000"}]}>category</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text,{color:"#000"}]}>Price</Text>
                </View>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text],{color:"#000"}}>Qty</Text>
                </View>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center"}}>

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
                      ListHeaderComponent ={this.renderHeader()}
                      data ={this.state.items}
                      keyExtractor ={(item,index)=>index.toString()}
                      renderItem ={({item,index})=>{
                          return(
                              <TouchableOpacity 
                               style={{flexDirection:"row",marginTop:5,flex:1,backgroundColor:"#eee",padding: 10,}}
                                  onPress={() => { this.props.navigation.navigate('ViewItem', { item })}}
                              >
                                  <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                      <Text style={[styles.text, { color: "#000" }]}>{index+1}</Text>
                                  </View>
                                  <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                      <Text style={[styles.text, { color: "#000" }]}>{item.title}</Text>
                                  </View>
                                  <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                      <Text style={[styles.text, { color: "#000" }]}>{item.type}</Text>
                                  </View>
                                  <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                      <Text style={[styles.text, { color: "#000" }]}>{item.price}</Text>
                                  </View>
                                  <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                      <Text style={[styles.text], { color: "#000" }}>{item.totalQty}</Text>
                                  </View>
                                  <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                                    onPress ={()=>{this.createAlert(item)}}
                                  >
                                      <Entypo name="cross" size={20} color="red" />
                                  </TouchableOpacity>
                              </TouchableOpacity>
                          )
                      }}
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
                            onPress={() => { this.setState({modal:true})}}
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
export default connect(mapStateToProps, { selectTheme })(ViewCategory);