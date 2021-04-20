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
        nightCount:0
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
            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>{item.name}</Text>
            </View>
            <View style={{flexDirection:"row",flex:0.5,}}>
                <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center", }}>
                    <Image
                        source={{ uri: item.img }}
                        style={{ height: "80%", width: "80%", resizeMode: "contain", borderRadius: 15 }}
                    />
                </View>
                <View style={{ flex: 0.7,justifyContent:"center"}}>

                    <View style={{ flexDirection: "row",}}>
                        <View style={{ flex: 0.33, alignItems: 'center', justifyContent: "center" }}>
                            <TouchableOpacity style={{ height: height * 0.03, width: width * 0.1, backgroundColor: this.state.morning ? themeColor : "gray", alignItems: "center", justifyContent: 'center', borderRadius: 10 }}
                                onPress={() => { this.props.timingSelect(item, index); this.setState({ morning: !this.state.morning }, () => { this.setState({ morningCount: 0 }) }) }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>Mor</Text>
                            </TouchableOpacity>
                            {this.state.morning && <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around", width: width * 0.15, marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ morningCount: this.state.morningCount - 1 }) }}
                                >
                                    <Entypo name="circle-with-minus" size={15} color="black" />
                                </TouchableOpacity>

                                <View>
                                    <Text style={[styles.text, { color: "gray" }]}>{this.state.morningCount}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ morningCount: this.state.morningCount + 1 }) }}
                                >
                                    <AntDesign name="pluscircle" size={15} color="black" />
                                </TouchableOpacity>
                            </View>}
                        </View>
                        <View style={{ flex: 0.33, alignItems: 'center', justifyContent: "center" }}>
                            <TouchableOpacity style={{ height: height * 0.03, width: width * 0.1, backgroundColor: this.state.afterNoon ? themeColor : "gray", alignItems: "center", justifyContent: 'center', borderRadius: 10 }}
                                onPress={() => { this.setState({ afterNoon: !this.state.afterNoon }, () => { this.setState({ afterNoonCount: 0 }) }) }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>Aft</Text>
                            </TouchableOpacity>
                            {this.state.afterNoon && <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around", width: width * 0.15, marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ afterNoonCount: this.state.afterNoonCount - 1 }) }}
                                >
                                    <Entypo name="circle-with-minus" size={15} color="black" />
                                </TouchableOpacity>


                                <View>
                                    <Text style={[styles.text, { color: "gray" }]}>{this.state.afterNoonCount}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ afterNoonCount: this.state.afterNoonCount + 1 }) }}
                                >
                                    <AntDesign name="pluscircle" size={15} color="black" />
                                </TouchableOpacity>
                            </View>}
                        </View>
                        <View style={{ flex: 0.33, alignItems: 'center', justifyContent: "center" }}>
                            <TouchableOpacity style={{ height: height * 0.03, width: width * 0.1, backgroundColor: this.state.night ? themeColor : "gray", alignItems: "center", justifyContent: 'center', borderRadius: 10 }}
                                onPress={() => { this.setState({ night: !this.state.night }, () => { this.setState({ nightCount: 0 }) }) }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>nig</Text>
                            </TouchableOpacity>
                            {this.state.night && <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around", width: width * 0.15, marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ nightCount: this.state.nightCount - 1 }) }}
                                >
                                    <Entypo name="circle-with-minus" size={15} color="black" />
                                </TouchableOpacity>


                                <View>
                                    <Text style={[styles.text, { color: "gray" }]}>{this.state.nightCount}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ nightCount: this.state.nightCount + 1 }) }}
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
                       selectionColor={themeColor}
                       keyboardType="numeric"
                       style={{height:"80%",width: 50,backgroundColor:'#eee',borderRadius:5,marginLeft:5,paddingLeft:5}}
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
        height: height * 0.25,
        borderRadius: 10,
      
    }
})