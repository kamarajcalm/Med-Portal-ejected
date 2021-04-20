import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity, SafeAreaView} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';

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
   getLocation =async()=>{
     let { status } = await Location.requestPermissionsAsync()
     if (status !== 'granted') {
       console.warn('Permission to access location was denied');
       return;
     }
     let location = await Location.getCurrentPositionAsync({});
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
            <MapView 
                
               style={styles.map} 
               region={this.state?.location}
     
            >
             { location&&<Marker
                coordinate={{ latitude: location?.latitude, longitude: location?.longitude }}
               
              />}
            </MapView>
            
           
         
            <TouchableOpacity style={{position:"absolute",top:15,width:width*0.9,height:height*0.05,borderRadius:20,backgroundColor:"#fff",justifyContent:"space-around",paddingHorizontal:20,flexDirection:"row",alignItems:"center"}}
          onPress={() => this.props.navigation.navigate('SearchDoctors')}
            >
                 <AntDesign name="search1" size={24} color={themeColor} />
                 <View style={{alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text]}>Search Doctor by name or place</Text>
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