import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import settings from '../AppSettings';
import axios from 'axios';
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
 class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
    request =async()=>{
     let data =await axios.get('http:192.168.29.98:8000/api/profile/users')
     console.log(data.data,"hhhh")
    }
componentDidMount(){
  // this.request()
}
  render() {
    return (
        <View style={{ flex: 1, }}>
            <StatusBar backgroundColor={themeColor} />
            <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, justifyContent: "center" }}>
                <View>
                    <Text style={{ color: '#fff', fontFamily: "openSans", marginLeft: 20 }}>Profile</Text>
                </View>
            </View>
            <View style={{flex:1}}>
                 <View style={{height:height*0.12,alignItems:"center",justifyContent:'center'}}>
                     <Image
                        source={{ uri:"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"}}
                        style={{height:60,width:60,borderRadius:30}}
                     />
                     <Text style={[styles.text]}>kamaraj</Text>
                 </View>
                               {/* STATISTICS */}
                 <View style={{height:height*0.15,alignItems:"center",justifyContent:"space-around",flexDirection:"row"}}>
                      <View style={{alignItems:'center',justifyContent:'center'}}>
                          <Text style={[styles.text]}>Total patients</Text>
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>100</Text>
                      </View>
                      <View style={{alignItems:"center",justifyContent:"center"}}>
                     <Text style={[styles.text]}>Total Priscription</Text>
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>250</Text>
                      </View>
                 </View>
                <View>
                     <View style={{margin:20}}>
                         <Text style={[styles.text],{textDecorationLine:"underline",fontWeight:"bold",fontSize:18,color:"gray"}}>INFO:</Text>
                     </View>
                    <View style={{ marginLeft:27 ,flexDirection:"row"}}>
                        <Text style={[styles.text], {fontWeight:"bold"}}>Age:</Text>
                         <Text style={[styles.text,{marginLeft:10}]}>20</Text>
                    </View>
                    <View style={{ marginLeft: 27,marginTop:10,flexDirection:"row" }}>
                        <Text style={[styles.text], { fontWeight: "bold" }}>height:</Text>
              <Text style={[styles.text, { marginLeft: 10 }]}>6.7 feet</Text>
                    </View>
                    <View style={{ marginLeft: 27, marginTop: 10 ,flexDirection:"row"}}>
                        <Text style={[styles.text], { fontWeight: "bold"  }}>weight: </Text>
              <Text style={[styles.text, { marginLeft: 10 }]}>50kg</Text>
                    </View>
                    <View style={{ marginLeft: 27, marginTop: 10  ,flexDirection:"row"}}>
                          <Text style={[styles.text], { fontWeight: "bold" }}>Age:</Text>
              <Text style={[styles.text, { marginLeft: 10 }]}>50kg</Text>
                    </View>
                    <View style={{ marginLeft: 27, marginTop: 10 ,flexDirection:"row"}}>
                          <Text style={[styles.text], { fontWeight: "bold"}}>blood group: </Text>
              <Text style={[styles.text, { marginLeft: 10 }]}> o+ve</Text>
                    </View>
                    <View style={{ marginLeft: 27, marginTop: 10 ,flexDirection:"row"}}>
                         <Text style={[styles.text], { fontWeight: "bold"}}>Medical history: </Text>
                         <Text style={[styles.text, { marginLeft: 10 }]}>none</Text>
                    </View>
                  <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row" }}>
                    <Text style={[styles.text], { fontWeight: "bold" }}>Location: </Text>
                    <Text style={[styles.text, { marginLeft: 10 }]}>Bengaluru</Text>
                  </View>
            <View style={{ marginLeft: 27, marginTop: 10, flexDirection: "row" }}>
              <Text style={[styles.text], { fontWeight: "bold" }}>PhoneNo: </Text>
              <Text style={[styles.text, { marginLeft: 10 ,fontWeight:"bold",color:"gray"}]}>7010117137</Text>
            </View>
                </View> 
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{ marginTop: height*0.1, backgroundColor: themeColor, width: width * 0.3, height: height * 0.05, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
              <Text style={[styles.text],{color:'#fff'}}>Log out</Text>
            </TouchableOpacity>
          </View>
            </View>
          
      </View>
    );
  }
}
const styles =StyleSheet.create({
   text:{
     fontFamily
   }
})

const mapStateToProps = (state) => {

  return {
    theme: state.selectedTheme,

  }
}
export default connect(mapStateToProps, { selectTheme })(Profile)