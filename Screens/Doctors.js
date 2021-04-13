import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { AntDesign } from '@expo/vector-icons';
const { height, width } = Dimensions.get("window");
const themeColor = settings.themeColor;
const fontFamily =settings.fontFamily;

 class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={themeColor} />
            <MapView style={styles.map} />
            <TouchableOpacity style={{position:"absolute",top:15,width:width*0.9,height:height*0.05,borderRadius:20,backgroundColor:"#fff",justifyContent:"space-around",paddingHorizontal:20,flexDirection:"row",alignItems:"center"}}
          onPress={() => this.props.navigation.navigate('SearchDoctors')}
            >
                 <AntDesign name="search1" size={24} color={themeColor} />
                 <View style={{alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text]}>Search Doctor by name or place</Text>
                 </View>
                 
            </TouchableOpacity>
        </View>
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
        width: Dimensions.get("screen").width,
        height: Dimensions.get( "screen").height,
    },
    text:{
      fontFamily,
    }
});
const mapStateToProps = (state) => {

  return {
    theme: state.selectedTheme,

  }
}
export default connect(mapStateToProps, { selectTheme })(Doctors);