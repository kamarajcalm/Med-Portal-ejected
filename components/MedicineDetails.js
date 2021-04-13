import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Switch} from 'react-native';
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
        afterNoon:false
    };
  }
    toggleSwitch =()=>{
        this.setState({ afterFood:!this.state.afterFood})
    }
  render() {
      const{item,index} =this.props
    return (
        <View
            key={index}
            style={styles.card}
        >
            <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center",}}>
                <Image
                    source={{ uri: item.img }}
                    style={{ height: "80%", width: "80%", resizeMode: "contain", borderRadius: 15 }}
                />
            </View>
            <View style={{ flex: 0.7, alignItems: "center", justifyContent: "space-around" }}>
                <View>
                    <Text style={[styles.text,{fontWeight:"bold",fontSize:20}]}>{item.name}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={{ height: height * 0.03, width: width * 0.1, backgroundColor: this.state.morning ?themeColor:"gray",alignItems:"center",justifyContent:'center',borderRadius:10}}
                        onPress={() => { this.setState({ morning: !this.state.morning})}}
                     >
                        <Text style={[styles.text, { color: "#fff"}]}>Mor</Text>
                     </TouchableOpacity>
                    <TouchableOpacity style={{ height: height * 0.03, width: width * 0.1, backgroundColor: this.state.afterNoon ? themeColor : "gray", alignItems: "center", justifyContent: 'center',marginLeft:20 ,borderRadius:10}}
                        onPress={() => { this.setState({ afterNoon: !this.state.afterNoon }) }}
                    >
                        <Text style={[styles.text, { color: "#fff"}]}>Aft</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: height * 0.03, width: width * 0.1, backgroundColor: this.state.night ? themeColor : "gray", alignItems: "center", justifyContent: 'center', marginLeft: 20,borderRadius:10}}
                        onPress={() => { this.setState({ night: !this.state.night }) }}
                    >
                        <Text style={[styles.text, { color: "#fff"}]}>nig</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:'center'}}>
                   <Text style={[styles.text,{fontWeight:'bold'}]}>After food</Text>
                   {/* <TouchableOpacity style={{marginLeft:10}}
                        onPress={() => { this.setState({ afterFood:!this.state.afterFood})}}
                   >
                        <Octicons name="primitive-dot" size={30} color={this.state.afterFood ? "#3299a8" : "gray"} />

                   </TouchableOpacity> */}
                    <Switch
                    style={{marginLeft:20}}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={this.state.afterFood ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={()=>{this.toggleSwitch()}}
                        value={this.state.afterFood}
                    />
                </View>
            </View>
            
         <TouchableOpacity
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
        height: height * 0.2,
        borderRadius: 10,
        flexDirection: "row",
        flex:1
    }
})