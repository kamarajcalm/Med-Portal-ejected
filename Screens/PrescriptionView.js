import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions,Image} from 'react-native';
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height
// import Image from 'react-native-scalable-image';
export default class PrescriptionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
         item: this.props.route.params.item,
    };
  }

  render() {
    return (
        <View style={{flex:1}}> 
            <Image
                style={{
                    height:height,
                    width:width,
                    resizeMode:"stretch"
                }}

                width={Dimensions.get('window').width} // height will be calculated automatically
                source={require('../assets/1.png')}
            />
            <View style={{position:"absolute",height,width,alignItems:"center",justifyContent:"center"}}>
                
              <View>

                    <View style={{ marginTop: 10, flexDirection: "row" }}>


                        <View style={{ paddingLeft: 20 }}>
                            {<View style={{}}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ borderColor: "#000", borderRightWidth: 1, width: width * 0.2 }}>Morning </Text>
                                    <Text style={[styles.text, { fontSize: 12, marginLeft: 10 }]}>{1} tablet { "afterFood" }</Text>


                                </View>

                            </View>}
                            { <View style={{}}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ borderColor: "#000", borderRightWidth: 1, width: width * 0.2 }}>Afternoon </Text>
                                    <Text style={[styles.text, { fontSize: 12, marginLeft: 10 }]}>{2} tablet {"afterFood"}</Text>



                                </View>

                            </View>}
                            {<View style={{}}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ borderColor: "#000", borderRightWidth: 1, width: width * 0.2 }}>Night </Text>

                                    <Text style={[styles.text, { fontSize: 12, marginLeft: 10 }]}>{3} tablet { "afterFood" }</Text>


                                </View>
                            </View>}
                            <View style={{ marginTop: 10 }}>
                                <Text style={[styles.text, { }]}>Comments:</Text>
                                <View>
                                    <Text style={[styles.text, { marginLeft: 10 }]}>{"hjgj"}</Text>
                                </View>
                            </View>
                            <View style={{ }}>
                                <Text>Qty: {55}</Text>
                            </View>
                        </View>


                    </View>
              </View>
            </View>
        </View>
     
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex:1,
        height:"100%",
        width:"100%",
        resizeMode:"stretch",
        // alignSelf:'stretch'
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    }
});