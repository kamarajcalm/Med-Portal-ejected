import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Switch, TextInput} from 'react-native';
import settings from '../AppSettings'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
const { height, width } = Dimensions.get("window");
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
export default class MedicineDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        afterFood:false,
        morning:false,
        night:false,
        afterNoon:false,
        morningCount:0,
        afterNoonCount:0,
        nightCount:0,
        days:"",
        qty:''
    };
  }
    toggleSwitch =()=>{
        this.setState({ afterFood:!this.state.afterFood},()=>{
            this.props.changeFunction("after_food",this.state.afterFood,this.props.index)
        })
    }
    changeDays =(text)=>{
        this.setState({days:text},()=>{
            this.props.changeFunction("days", this.state.days, this.props.index)
        })
    }
    changeQty = (text)=>{
        this.setState({ qty: text }, () => {
            this.props.changeFunction("total_qty", this.state.qty, this.props.index)
        })
    }
  render() {
      const{item,index} =this.props
    return (
        <View
            key={index}
            style={styles.card}
        >
            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>{item.title}</Text>
            </View>
            <View style={{flexDirection:"row",flex:0.5,}}>
                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center", }}>
                    <Image
                        source={{ uri: "https://lh3.googleusercontent.com/proxy/-hC9-7bgQSA6mg2aIAdRbGAtwRX0MHjYEudKywiZGdS_wfVmm3DYdTrWFihHZtYTvevDjbaEnMSJW_dA8S2eITlWp3Q27yFEW_qge7xPHVOfuSzsuDru2IvyqXB28w" }}
                        style={{ height: "80%", width: "80%", resizeMode: "contain", borderRadius: 15 }}
                    />
                </View>
                <View style={{ flex: 0.7,justifyContent:"center"}}>

                    <View style={{ flexDirection: "row",}}>
                        <View style={{ flex: 0.33, alignItems: 'center', justifyContent: "center" }}>
                            <TouchableOpacity style={{ height: height * 0.03, width: width * 0.1, backgroundColor: this.state.morning ? themeColor : "gray", alignItems: "center", justifyContent: 'center', borderRadius: 10 }}
                                onPress={() => {  this.setState({ morning: !this.state.morning }, () => { 
                                   if(this.state.morning){
                                       this.props.changeFunction("morning_count",1,index)
                                       this.setState({ morningCount: 1})
                                   }else{
                                       this.changeFunction("morning_count",0,index)
                                       this.setState({ morningCount: 0 })
                                   }
                                }) }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>Mor</Text>
                            </TouchableOpacity>
                            {this.state.morning && <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around", width: width * 0.15, marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ morningCount: this.state.morningCount - 1 },()=>{
                                        this.props.changeFunction("morning_count", this.state.morningCount, index)
                                          if(this.state.morningCount==0){

                                              this.setState({ morning: !this.state.morning})
                                          }
                                    }) }}
                                >
                                    <Entypo name="circle-with-minus" size={15} color="black" />
                                </TouchableOpacity>

                                <View>
                                    <Text style={[styles.text, { color: "gray" }]}>{this.state.morningCount}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ morningCount: this.state.morningCount + 1 },()=>{
                                        this.props.changeFunction("morning_count", this.state.morningCount , index)
                                    }) }}
                                >
                                    <AntDesign name="pluscircle" size={15} color="black" />
                                </TouchableOpacity>
                            </View>}
                        </View>
                        <View style={{ flex: 0.33, alignItems: 'center', justifyContent: "center" }}>
                            <TouchableOpacity style={{ height: height * 0.03, width: width * 0.1, backgroundColor: this.state.afterNoon ? themeColor : "gray", alignItems: "center", justifyContent: 'center', borderRadius: 10 }}
                                onPress={() => { this.setState({ afterNoon: !this.state.afterNoon }, () => { 
                                 
                                    if (this.state.afterNoon) {
                                        this.props.changeFunction("afternoon_count", 1, index)
                                        this.setState({afterNoonCount:1})
                                    }else{
                                        this.props.changeFunction("afternoon_count", 0, index)
                                        this.setState({afterNoonCount:0})
                                    }
                                
                                }) }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>Aft</Text>
                            </TouchableOpacity>
                            {this.state.afterNoon && <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around", width: width * 0.15, marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ afterNoonCount: this.state.afterNoonCount - 1 },()=>{
                                        this.props.changeFunction("afternoon_count", this.state.afterNoonCount, index)
                                        if (this.state.afterNoonCount == 0) {
                                            this.setState({ afterNoon: !this.state.afterNoon })
                                        }
                                    }) }}
                                >
                                    <Entypo name="circle-with-minus" size={15} color="black" />
                                </TouchableOpacity>


                                <View>
                                    <Text style={[styles.text, { color: "gray" }]}>{this.state.afterNoonCount}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ afterNoonCount: this.state.afterNoonCount + 1 },()=>{
                                        this.props.changeFunction("afternoon_count", this.state.afterNoonCount , index)
                                    }) }}
                                >
                                    <AntDesign name="pluscircle" size={15} color="black" />
                                </TouchableOpacity>
                            </View>}
                        </View>
                        <View style={{ flex: 0.33, alignItems: 'center', justifyContent: "center" }}>
                            <TouchableOpacity style={{ height: height * 0.03, width: width * 0.1, backgroundColor: this.state.night ? themeColor : "gray", alignItems: "center", justifyContent: 'center', borderRadius: 10 }}
                                onPress={() => { this.setState({ night: !this.state.night }, () => { 
                                    if(this.state.night){
                                        this.props.changeFunction("night_count",1, index)
                                        this.setState({ nightCount: 1 })
                                    }else{
                                        this.props.changeFunction("night_count",0, index)
                                        this.setState({ nightCount: 0 })
                                    }
                                  
                                
                                }) }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>nig</Text>
                            </TouchableOpacity>
                            {this.state.night && <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around", width: width * 0.15, marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ nightCount: this.state.nightCount - 1 },()=>{
                                        this.props.changeFunction("night_count", this.state.nightCount , index)
                                        if (this.state.nightCount == 0) {
                                            this.setState({ night: !this.state.night })
                                        }
                                    }) }}
                                >
                                    <Entypo name="circle-with-minus" size={15} color="black" />
                                </TouchableOpacity>


                                <View>
                                    <Text style={[styles.text, { color: "gray" }]}>{this.state.nightCount}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ nightCount: this.state.nightCount + 1 },()=>{
                                        this.props.changeFunction("night_count", this.state.nightCount , index)
                                    }) }}
                                >
                                    <AntDesign name="pluscircle" size={15} color="black" />
                                </TouchableOpacity>
                            </View>}
                        </View>

                    </View>
                 
                </View>
            </View>
            
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", flex: 0.2 }}>
                <View style={{flexDirection:"row"}}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>After food</Text>

                    <Switch
                        style={{ marginLeft: 10 }}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={this.state.afterFood ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { this.toggleSwitch() }}
                        value={this.state.afterFood}
                    />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>No of days</Text>
                    <TextInput 
                       value={this.state.days}
                       selectionColor={themeColor}
                       keyboardType="numeric"
                       style={{height:"80%",width: 50,backgroundColor:'#eee',borderRadius:5,marginLeft:5,paddingLeft:5}}
                       onChangeText ={(text)=>{this.changeDays(text)}}
                    
                    />
                </View>
               
            </View>
          
         <TouchableOpacity
                onPress={() => { this.props.changeFunction("delete",item,index)}}
           style={{position:"absolute",top:10,right: 10,}}
         >
                <Entypo name="circle-with-cross" size={24} color="red" />
         </TouchableOpacity>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    text: {
        fontFamily,
        
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
        backgroundColor: "#fff",
        elevation: 6,
        margin: 10,
        height: height * 0.25,
        borderRadius: 10,
      
    }
})