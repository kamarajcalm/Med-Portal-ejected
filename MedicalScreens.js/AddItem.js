import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../AppSettings';
import medicine from '../components/Medicine';
import Medicine from '../components/Medicine';
const { height, width } = Dimensions.get("window");
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const url = settings.url;
import { Modal, } from 'react-native-paper';
import HttpsClient from '../api/HttpsClient';
import SimpleToast from 'react-native-simple-toast';
import { FontAwesome } from '@expo/vector-icons';
import MedicineItems from './MedicineItems';
class AddItem extends Component {
    constructor(props) {
        let item =props.route.params.item
       
        let medicines = props.route.params.item.subData||[]
        console.log(item,"hhh")
        super(props);
        this.state = {
            showModal: false,
            catogoriesTitle: "",
            categories: [],
            item,
            MedicineTitle:"",
            medicine:null,
            shopprice:"",
            maxretailprice:"",
            marketprice:'',
            quantity:"",
            shopprice:"",
            qty:"",
            medicineFound:false,
            medicines,
            isFetching:false,
            selectedItem: "",
            selectedIndex: "",
            showModal2: false,
            addQuantity:""
        };
    }
    addMedicine = async()=>{
        let api = `${url}/api/prescription/addInventory/`
        let sendData ={
            medicine: this.state?.medicine?.id,
            shopprice:this.state.shopprice,
            maxretailprice:this.state.maxretailprice,
            type:"subcategory",
            maincategory:this.state.item.id,
            quantity:this.state.qty,
            title:this.state.MedicineTitle,
            medicineFound:this.state.medicineFound,
            
        }
       
        
        let post = await  HttpsClient.post(api,sendData)
       
       if(post.type =="success"){
          this.getMedicines()
           SimpleToast.show("added succesfully")
           this.setState({showModal:false})
       }else{
           SimpleToast.show("Try again")
       }
    }
    onRefresh =()=>{
        this.setState({ isFetching:true})
        this.getMedicines()
    }
    backFunction = (medicine) => {
        console.log(medicine,"iii")
        const { maxretailprice, marketprice,} = medicine
        this.setState({ medicine, MedicineTitle: medicine.title, maxretailprice, marketprice, medicineFound:true})
    }
    getMedicines =async()=>{
        let api = `${url}/api/prescription/maincategory/${this.state.item.id}/`
        const data =await HttpsClient.get(api)
        console.log(data)
        if(data.type =="success"){
            this.setState({ medicines: data.data.subData,isFetching:false})
        }else{
            SimpleToast.show(data.error.toString())
            this.setState({ isFetching: false})
        }
    }
    componentDidMount() {
    
    }
    addQuantity =(item,index)=>{
        console.log(item)
     
     this.setState({selectedItem:item,selectedIndex:index,showModal2:true})
    }
    AddItem = async()=>{
        let api = `${url}/api/prescription/subinventory/${this.state.selectedItem.subpk}/`
        let sendData ={
            quantity:this.state.addQuantity
        }
        let patch =await HttpsClient.patch(api,sendData)
        console.log(patch,"kkk")
      if(patch.type =="success"){
          let duplicate =this.state.medicines
          duplicate[this.state.selectedIndex] =patch.data
          this.setState({ medicines:duplicate,showModal2:false})
      }else{
          SimpleToast.show("Try again")
      }
    }
    render() {
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>

                    {/* HEADERS */}
                    <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.6, alignItems: 'center', justifyContent: "center" }}>
                            <Text style={[styles.text, { color: '#fff', fontWeight: 'bold', fontSize: 23, marginLeft: 20 }]}>{this.state.item.title}</Text>
                        </View>

                    </View>
                     <FlatList 
                       data ={this.state.medicines}
                       contentContainerStyle  ={{alignItems:"center",justifyContent:'space-around'}}
                       keyExtractor ={(item,index)=>index.toString()}
                       numColumns ={2}
                 
                    
                       renderItem ={({item,index})=>{
                           return(
                           
                               <MedicineItems item={item} index={index} addQuantity={(item, index) => { this.addQuantity(item, index)}}/>
                            
                           )  
                       }}
                     />
                    <View style={{
                        position: "absolute",
                        bottom: 20,
                        left: 20,
                        right: 20,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20
                    }}>
                        <TouchableOpacity
                            onPress={() => { this.setState({ showModal: true }) }}
                        >
                            <AntDesign name="pluscircle" size={40} color={themeColor} />
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>

                <Modal
                    style={{ alignItems: "center", justifyContent: "center" }}
                    visible={this.state.showModal}
                    onDismiss={() => { this.setState({ showModal: false }) }}
                    contentContainerStyle={{ height: height * 0.4, alignItems: 'center', justifyContent: "center", backgroundColor: "#fff", borderRadius: 15, width: width * 0.85 }}
                    dismissable={true}
                >
                    <ScrollView 
                      contentContainerStyle ={{padding: 20,}}
                     showsVerticalScrollIndicator ={false}
                    >
                        <View style={{flexDirection:"row"}}>
                            <Text>Enter Medicine or </Text>
                             <TouchableOpacity
                               style={{flexDirection:"row"}}
                                onPress={() => { this.props.navigation.navigate("SearchMedicinesMedical", { backFunction: (medicines) => { this.backFunction(medicines) } })}}
                             >
                                 <Text>search</Text>
                                 <View style={{marginLeft:10}}>
                                    <FontAwesome name="search" size={20} color="black" />
                                 </View>
                                
                             </TouchableOpacity>
                        </View>
                        
                        <TextInput
                            value={this.state.MedicineTitle}
                            style={{ marginTop: 20, width: width * 0.7, height: height * 0.05, backgroundColor: "#fafafa", paddingLeft: 15 ,}}
                            onChangeText={(text) => { this.setState({ MedicineTitle: text }) }}
                            selectionColor={themeColor}
                        />
                        <View>
                            <Text>Max Retail Price</Text>
                            <TextInput
                            keyboardType ={"numeric"}
                                value={this.state.maxretailprice.toString()}
                                style={{ marginTop: 20, width: width * 0.7, height: height * 0.05, backgroundColor: "#fafafa", paddingLeft: 15, }}
                                onChangeText={(text) => { this.setState({ maxretailprice: text }) }}
                                selectionColor={themeColor}
                            />
                        </View>
                        <View>
                            <Text>MarketPrice</Text>
                            <TextInput
                                keyboardType={"numeric"}
                                value={this.state.marketprice.toString()}
                                style={{ marginTop: 20, width: width * 0.7, height: height * 0.05, backgroundColor: "#fafafa", paddingLeft: 15, }}
                                onChangeText={(text) => { this.setState({ marketprice: text }) }}
                                selectionColor={themeColor}
                            />
                        </View>
                        <View>
                            <Text>Shop Price</Text>
                            <TextInput
                                keyboardType={"numeric"}
                                value={this.state.shopprice.toString()}
                                style={{ marginTop: 20, width: width * 0.7, height: height * 0.05, backgroundColor: "#fafafa", paddingLeft: 15, }}
                                onChangeText={(text) => { this.setState({ shopprice: text }) }}
                                selectionColor={themeColor}
                            />
                        </View>
                        <View>
                            <Text>Qty</Text>
                            <TextInput
                            keyboardType ={"numeric"}
                                value={this.state.qty.toString()}
                                style={{ marginTop: 20, width: width * 0.7, height: height * 0.05, backgroundColor: "#fafafa", paddingLeft: 15, }}
                                onChangeText={(text) => { this.setState({ qty: text }) }}
                                selectionColor={themeColor}
                            />
                        </View>
                        <View style={{ alignItems: "center", justifyContent: 'center' }}>
                            <TouchableOpacity style={[styles.button, { marginTop: 20 }]}
                                onPress={() => { this.addMedicine() }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>Add</Text>
                            </TouchableOpacity>
                        </View>
                         
                    </ScrollView>
                </Modal>
                           {/* ADD QTY */}
                <Modal 
                    style={{ alignItems: "center", justifyContent: "center" }}
                    visible={this.state.showModal2}
                    onDismiss={() => { this.setState({ showModal2: false }) }}
                    contentContainerStyle={{ height: height * 0.3, alignItems: 'center', justifyContent: "center", backgroundColor: "#fff", borderRadius: 15, width: width * 0.85 }}
                    dismissable={true}
                >
                    <View>
                        <Text>Enter Qty</Text>
                        <TextInput
                            keyboardType={"numeric"}
                            value={this.state.addQuantity.toString()}
                            style={{ marginTop: 20, width: width * 0.7, height: height * 0.05, backgroundColor: "#fafafa", paddingLeft: 15, }}
                            onChangeText={(text) => { this.setState({ addQuantity: text }) }}
                            selectionColor={themeColor}
                        />
                    </View>
                    <View style={{ alignItems: "center", justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.button, { marginTop: 20 }]}
                            onPress={() => { this.AddItem() }}
                        >
                            <Text style={[styles.text, { color: "#fff" }]}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
    button: {
        height: height * 0.05,
        width: width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeColor,
        borderRadius: 10,
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
export default connect(mapStateToProps, { selectTheme })(AddItem);