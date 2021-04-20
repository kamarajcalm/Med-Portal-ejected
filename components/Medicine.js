import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet} from 'react-native';
import settings from '../AppSettings'
import { AntDesign } from '@expo/vector-icons';
const { height, width } = Dimensions.get("window");
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
export default class Medicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected:false,
    };
  }

  render() {
      const {item} =this.props
    return (
        <TouchableOpacity
            onPress={() => { this.props.selection(item);this.setState({ selected: !this.state.selected }) }}
            style={{ height: height * 0.1, marginTop: 10, flexDirection: "row" }}
        >
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                <Image
                    source={{ uri: item.img }}
                    style={{ height: "80%", width: "80%", resizeMode: "contain", borderRadius: 15 }}
                />
            </View>
            <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                <Text style={[styles.text]}>{item.name}</Text>
            </View>
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                
            >
                <AntDesign name="medicinebox" size={24} color={this.state.selected?"green":"gray" } />
            </View>
         
        </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
  

})