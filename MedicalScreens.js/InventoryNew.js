import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView, Alert} from 'react-native';
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
import { ActivityIndicator, Modal, } from 'react-native-paper';
import HttpsClient from '../api/HttpsClient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
const initialLayout = { width: Dimensions.get('window').width };
class InventoryNew extends Component {
    constructor(props) {
        super(props);
        const routes = [
            { key: 'Items', title: 'Items' },
            { key: 'Orders', title: 'Orders' },
            { key: 'Sold', title: 'Sold' },

        ];
        this.state = {
            routes,
            index: 0,
            items:[],
            categoryName:'',
            creating:false,
            refreshing:false
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
    getItems = async()=>{
        this.setState({ refreshing:true})
        let api = `${url}/api/prescription/inventorycategory/?clinic=${this.props.medical.clinicpk}`

      let data =await HttpsClient.get(api)
      if(data.type =="success"){
          this.setState({ refreshing: false })
          this.setState({items:data.data})
      }else{
          this.setState({ refreshing: false })
      }
    }
    addCategory = async()=>{
        if(this.state.categoryName ==""){
         return this.showSimpleMessage("Please fill category", "#dd7030",)
        }
        this.setState({creating:true})
        let api = `${url}/api/prescription/createCategory/`
        let sendData ={
           title:this.state.categoryName,
            clinic: this.props.medical.clinicpk
        }
        let post = await HttpsClient.post(api,sendData)
        console.log(post,"ppp")
        if(post.type =="success"){
            this.setState({ creating: false })
            this.setState({ categoryName:""})
            this.getItems()
            this.showSimpleMessage("Added SuccessFully", "#00A300", "success")
        }else{
            this.setState({ creating: false })
            this.showSimpleMessage("Try again", "#B22222", "danger")
        }
    }
    deleteCategory = async(item)=>{
        let api = `${url}/api/prescription/inventorycategory/${item.id}/`
        let del =await HttpsClient.delete(api)
         if(del.type =="success"){
             this.showSimpleMessage("Deleted SuccessFully", "#00A300", "success")
             this.getItems()
         }else{
             this.showSimpleMessage("Try again", "#B22222", "danger")
         }
    }
    createAlert =(item)=>{
        Alert.alert(
            "Do you want to delete?",
           `${item.title}`,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.deleteCategory(item)} }
            ]
        );

    }
    componentDidMount() {
     this.getItems()  
    }
    header =()=>{
        return(
            <View style={{flexDirection:'row',}}>
                  <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
                      <Text style={[styles.text,{color:"#000"}]}>#</Text>
                  </View>
                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.text, { color: "#000" }]}>Category</Text>
                  </View>
                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.text, { color: "#000" }]}>Action</Text>
                  </View>
                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>

                  </View>
            </View>
        )
    }
    FirstRoute =()=>{
        return(
            <View style={{flex:1}}>
               <View style={{height:height*0.08,flexDirection:'row',backgroundColor:"#fff",alignItems:"center",justifyContent:"space-around"}}>
                    <View>
                       <TextInput 
                         value={this.state.categoryName}
                         style={{height:height*0.05,width:width*0.6,backgroundColor:"#fafafa",borderRadius:10}}
                         placeholder ={"Enter category"}
                         selectionColor ={themeColor}
                            onChangeText={(categoryName) => { this.setState({ categoryName})}}
                       />
                    </View>
                    <View>
                       <TouchableOpacity style={{height:height*0.05,width:width*0.3,alignItems:"center",justifyContent:"center",backgroundColor:themeColor,borderRadius:10}}
                        onPress ={()=>{this.addCategory()}}
                       >
                            {this.state.creating?<ActivityIndicator size ={"small"} color={"#fff"}/>: <Text style={[styles.text,{color:"#fff"}]}>Add</Text>}
                       </TouchableOpacity>
                    </View>
               </View>
               <FlatList 
                 refreshing={this.state.refreshing}
                 onRefresh ={()=>{this.getItems()}}
                 data ={this.state.items}
                 keyExtractor ={(item,index)=>index.toString()}
                 ListHeaderComponent={this.header()}
                 renderItem ={({item,index})=>{
                    return(
                        <View style={{ flexDirection: 'row',marginTop:15 }}>
                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={[styles.text, {  }]}>{index+1}</Text>
                            </View>
                            <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={[styles.text, { }]}>{item.title}</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => { this.props.navigation.navigate('ViewCategory',{item})}}
                            >
                                <Text style={[styles.text, {  textDecorationLine:"underline"}]}>View</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}
                             onPress ={()=>{this.createAlert(item)}}
                            >
                                <Entypo name="cross" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    )
                 }}
               />
            </View>
        )
    }
    SecondRoute =()=>{
        return (
            <View>

            </View>
        )
    }
    ThirdRoute =()=>{
        return (
            <View>

            </View>
        )
    }
    indexChange = async (index) => {
   
        this.setState({ index })

    }
    renderScene = SceneMap({
        Items: this.FirstRoute,
        Orders: this.SecondRoute,
        Sold: this.ThirdRoute,
    });
    render() {
        const { index, routes } = this.state
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>

                    {/* HEADERS */}
                  
                    <TabView
                        style={{ backgroundColor: "#ffffff" }}
                        navigationState={{ index, routes }}
                        renderScene={this.renderScene}
                        onIndexChange={(index) => { this.indexChange(index) }}
                        initialLayout={initialLayout}
                        renderTabBar={(props) =>
                            <TabBar
                                {...props}
                                renderLabel={({ route, focused, color }) => (
                                    <Text style={{ color: focused ? themeColor : 'gray', margin: 8, fontWeight: "bold" }}>
                                        {route.title}
                                    </Text>
                                )}
                                style={{ backgroundColor: "#fff", height: 50, fontWeight: "bold", color: "red" }}
                                labelStyle={{ fontWeight: "bold", color: "red" }}
                                indicatorStyle={{ backgroundColor: themeColor, height: 5 }}
                            />
                        }

                    />
                  
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
export default connect(mapStateToProps, { selectTheme })(InventoryNew);