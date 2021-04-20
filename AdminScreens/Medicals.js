import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const { height, width } = Dimensions.get("window");
import { Ionicons, AntDesign } from '@expo/vector-icons';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const DATA = [
  {
    name: "sri devi clinic",
    place: "bengaluru"
  },
  {
    name: "sri devi clinic",
    place: "bengaluru"
  },
  {
    name: "sri devi clinic",
    place: "bengaluru"
  },
  {
    name: "sri devi clinic",
    place: "bengaluru"
  },
  {
    name: "sri devi clinic",
    place: "bengaluru"
  },
  {
    name: "sri devi clinic",
    place: "bengaluru"
  },

]
class Medicals extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {

  }
  render() {
    return (
      <>
        <SafeAreaView style={styles.topSafeArea} />
        <SafeAreaView style={styles.bottomSafeArea}>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar backgroundColor={themeColor} />
            {/* HEADERS */}
            <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
              <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}

              >
                <Ionicons name="ios-search" size={20} color="#fff" />
              </TouchableOpacity>
              <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                <Text style={[styles.text, { color: '#fff', fontWeight: 'bold', fontSize: 18 }]}>Medicals</Text>
              </View>
              <TouchableOpacity style={{ flex: 0.2 }}
                onPress={() => { this.props.navigation.navigate("CreateMedicals")}}
              >
                <Ionicons name="add-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            {/* CHATS */}
            <FlatList


              data={DATA}

              keyExtractor={(item, index) => index.toString()}

              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={{ height: height * 0.1, backgroundColor: "#fafafa", marginTop: 1, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ChatScreen', { item: item }) }}
                  >
                    <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                      <Image
                        source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/practo-fabric/practices/711061/lotus-multi-speciality-health-care-bangalore-5edf8fe3ef253.jpeg" }}
                        style={{ height: 60, width: 60, borderRadius: 30, }}
                      />
                    </View>
                    <View style={{ flex: 0.7, }}>
                      <View style={{ flex: 0.4, justifyContent: "center" }}>
                        <Text style={[styles.text, { fontWeight: 'bold', fontSize: 16 }]}>{item.name}</Text>
                      </View>
                      <View style={{ flex: 0.6, }}>
                        <Text style={[styles.text]}>{item.place}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
            <View style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20
            }}>
              <TouchableOpacity
              style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:themeColor,borderRadius:5}}
                onPress={() => { this.props.navigation.navigate('CreateRep') }}
              >
             <Text style={[styles.text,{color:"#fff"}]}>Create Owners</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontFamily
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

  }
}
export default connect(mapStateToProps, { selectTheme })(Medicals);

