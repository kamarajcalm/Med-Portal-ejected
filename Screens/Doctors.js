import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity, SafeAreaView, Image, ActivityIndicator} from 'react-native';
import MapView,{Marker,PROVIDER_GOOGLE,Callout} from 'react-native-maps';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import png from '../assets/marker/stethoscope.png'
import { WebView } from 'react-native-webview';
import { Svg, Image as ImageSvg } from "react-native-svg";
const { height, width } = Dimensions.get("window");
const themeColor = settings.themeColor;
const fontFamily =settings.fontFamily;

 class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location:null
    };
  }
   getMarkers =()=>{
       
   }
   getLocation =async()=>{
     let { status } = await Location.requestPermissionsAsync()
     if (status !== 'granted') {
       console.warn('Permission to access location was denied');
       return;
     }
     let location = await Location.getCurrentPositionAsync({});
     this.getMarkers(location.coords.latitude,location.coords.longitude)
     this.setState({ location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421}})
   }
 componentDidMount(){
   this.getLocation()
 }
  render() {
    const {location} =this.state
    console.log(location?.latitude,"kkkk")
    return (
        <>
        
        <SafeAreaView style={styles.bottomSafeArea}>
        <View style={styles.container}>
            <StatusBar backgroundColor={themeColor} />
         {location?<MapView 
               provider ={PROVIDER_GOOGLE}
               style={styles.map} 
               region={this.state?.location}
     
            >
             <Marker
                coordinate={{ latitude: location?.latitude, longitude: location?.longitude }}
                >
                <MapView.Callout 
                tooltip={true}
                  onPress={()=>{console.log("pressed")}}
                >
                   <View style={{height:height*0.2,backgroundColor:"#fff",width:width*0.4,alignItems:"center",justifyContent:"center"}}>
                      <Text style={{height:60}}>
                      <Image
                        source={{
                          uri: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        }}
                        style={{ width: 40, height: 40, resizeMode: "cover" }}
                      />
                      </Text>
                    
                      <Text style={[styles.text]}>Doctor Name</Text>
                      <Text style={[styles.text,{color:"gray"}]}>Specialization</Text>
            
                     
              
                  
                 
                   </View>
                  
                </MapView.Callout>

                </Marker>
                
            </MapView>:<View>
                 <ActivityIndicator size ="large" color ={themeColor} />
              </View>}
            
           
         
            <TouchableOpacity style={{position:"absolute",top:15,width:width*0.9,height:height*0.05,borderRadius:20,backgroundColor:"#fff",justifyContent:"space-around",paddingHorizontal:20,flexDirection:"row",alignItems:"center"}}
          onPress={() => this.props.navigation.navigate('SearchDoctors')}
            >
                 <AntDesign name="search1" size={24} color={themeColor} />
                 <View style={{alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text,{fontSize:12}]}>doctor, clinic, specialization or health issues</Text>
                 </View>
                 
            </TouchableOpacity>
        </View>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex:1,
        width: Dimensions.get("screen").width,
        height: Dimensions.get( "screen").height,
    },
    text:{
      fontFamily,
    },
  topSafeArea: {
    flex: 0,
    backgroundColor: themeColor
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
});
const mapStateToProps = (state) => {

  return {
    theme: state.selectedTheme,

  }
}
export default connect(mapStateToProps, { selectTheme })(Doctors);