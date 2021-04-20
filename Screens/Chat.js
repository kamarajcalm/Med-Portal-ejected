import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView} from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const { height, width } = Dimensions.get("window");
import { Ionicons } from '@expo/vector-icons';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;


const data =[
  {
    dp:"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name:"kamaraj",
    lastmsg:"hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "ayush",
    lastmsg: "fine"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "abi",
    lastmsg: "hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "subham",
    lastmsg: "hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "kamaraj",
    lastmsg: "hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "ayush",
    lastmsg: "fine"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "abi",
    lastmsg: "hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "subham",
    lastmsg: "hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "kamaraj",
    lastmsg: "hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "ayush",
    lastmsg: "fine"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "abi",
    lastmsg: "hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "subham",
    lastmsg: "hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "kamaraj",
    lastmsg: "hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "ayush",
    lastmsg: "fine"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "abi",
    lastmsg: "hi how r u?"
  },
  {
    dp: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    name: "subham",
    lastmsg: "hi how r u?"
  },
]
 class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
componentDidMount(){
 
}
  render() {
    return (
      <>
        <SafeAreaView style={styles.topSafeArea} />
        <SafeAreaView style={styles.bottomSafeArea}>
        <View style={{flex:1,backgroundColor:"#fff"}}>
            <StatusBar backgroundColor={themeColor} />
                    {/* HEADERS */}
            <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
              <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
      
              >
              
              </View>
              <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                <Text style={[styles.text, { color: '#fff', marginLeft: 20 ,fontWeight:'bold'}]}>Conversation</Text>
              </View>
              <View style={{ flex: 0.2 }}>
              </View>
            </View>
                         {/* CHATS */}
               <FlatList 
                  onScroll={()=>{console.log(this.flatRef)}}
                  style={{marginBottom:90}}
                  data={data}
                  
                  keyExtractor={(item,index)=>index.toString()}
                 
                  renderItem ={({item,index})=>{
                       return(
                         <TouchableOpacity style={{height:height*0.1,backgroundColor:"#fafafa",marginTop:1,flexDirection:'row'}}
                           onPress={() => { this.props.navigation.navigate('ChatScreen',{item:item})}}
                         >
                              <View style={{flex:0.3,alignItems:"center",justifyContent:"center"}}>
                                  <Image 
                                    source={{uri:item.dp}}
                                    style= {{height:60,width:60,borderRadius:30,}}
                                  />
                              </View>
                              <View style={{flex:0.7,}}>
                                  <View style={{flex:0.4,justifyContent:"center"}}>
                                      <Text style={[styles.text,{fontWeight:'bold',fontSize:16}]}>{item.name}</Text>
                                  </View>
                                  <View style={{flex:0.6,}}>
                                       <Text style={[styles.text]}>{item.lastmsg}</Text>
                                  </View>
                              </View>
                         </TouchableOpacity>
                       )
                  }}
               />          
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
export default connect(mapStateToProps, { selectTheme })(Chat);