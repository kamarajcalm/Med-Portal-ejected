import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView,useWindowDimensions} from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const { height, width } = Dimensions.get("window");
import { Ionicons } from '@expo/vector-icons';
import HttpsClient from '../api/HttpsClient';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const url =settings.url;
const initialLayout = { width: Dimensions.get('window').width };
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

 class Chat extends Component {
  constructor(props) {
    const routes = [
      { key: 'Clinics', title: 'Clinics & Medicals' },
      { key: 'Doctors', title: 'Doctors' },
    

    ];
    super(props);
    this.state = {
      index: 0,
      routes: routes,
      chats:[],
      clinics:[],
      doctors:[],
    };
  }
   getChats = async()=>{
   
     let api =''
     if(this.props.user.profile.occupation =="Customer"){
       api = `${url}/api/prescription/getThreads/?type=customer&customer=${this.props.user.id}`
     }
     if (this.props.user.profile.occupation == "ClinicRecoptionist") {
       api = `${url}/api/prescription/getThreads/?type=clinic&clinic=${this.props.user.profile.recopinistclinics[0].clinicpk}`
     }
     if (this.props.user.profile.occupation == "Doctor") {
       api = `${url}/api/prescription/getThreads/?type=doctor&doctor=${this.props.user.id}`
     }
     let data =await HttpsClient.get(api)
     console.log(data,"kkk")
     if(data.type =="success"){
       this.setState({ clinics: data.data.clinicchats, doctors: data.data.doctorchats, chats:data.data})
     }
   }
componentDidMount(){
 this.getChats()
}
   FirstRoute =()=>{
     return(
           <FlatList
           contentContainerStyle={{ paddingBottom: 90 }}

           data={this.state.clinics}

           keyExtractor={(item, index) => index.toString()}

           renderItem={({ item, index }) => {
             return (
               <TouchableOpacity style={{ height: height * 0.1, backgroundColor: "#fafafa", marginTop: 1, flexDirection: 'row' }}
                 onPress={() => { this.navigate(item,"clinic") }}
               >
                 <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                   <Image
                     source={{
                       uri: item.dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                     }}
                     style={{ height: 60, width: 60, borderRadius: 30, }}
                   />
                 </View>
                 <View style={{ flex: 0.7, }}>
                   <View style={{ flex: 0.4, justifyContent: "center" }}>
                     <Text style={[styles.text, { fontWeight: 'bold', fontSize: 16 }]}>{item.title}</Text>
                   </View>
                   <View style={{ flex: 0.6, }}>
                     <Text style={[styles.text]}>{item.lastmsg}</Text>
                   </View>
                 </View>
               </TouchableOpacity>
             )
           }}
         />
     )
   }
   SecondRoute = () => {
     return (
       <FlatList
         contentContainerStyle={{ paddingBottom: 90 }}

         data={this.state.doctors}

         keyExtractor={(item, index) => index.toString()}

         renderItem={({ item, index }) => {
           return (
             <TouchableOpacity style={{ height: height * 0.1, backgroundColor: "#fafafa", marginTop: 1, flexDirection: 'row' }}
               onPress={() => { this.navigate(item, "clinic") }}
             >
               <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                 <Image
                   source={{
                     uri: item.dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                   }}
                   style={{ height: 60, width: 60, borderRadius: 30, }}
                 />
               </View>
               <View style={{ flex: 0.7, }}>
                 <View style={{ flex: 0.4, justifyContent: "center" }}>
                   <Text style={[styles.text, { fontWeight: 'bold', fontSize: 16 }]}>{item.title}</Text>
                 </View>
                 <View style={{ flex: 0.6, }}>
                   <Text style={[styles.text]}>{item.lastmsg}</Text>
                 </View>
               </View>
             </TouchableOpacity>
           )
         }}
       />
     )
   }
navigate =(item,type)=>{
let itemArrange ={}
if(type=="clinic"){
    itemArrange = {
    groupPk: item.threadpk,
    uid: item.uid,
    clinictitle: item.title
  }
}
  if (type == "doctor") {
    itemArrange = {
      groupPk: item.threadpk,
      uid: item.uid,
      doctortitle: item.title
    }
  }
  this.props.navigation.navigate('ChatScreen', { item: itemArrange })
}
   renderScene = SceneMap({
     Clinics: this.FirstRoute,
     Doctors:this.SecondRoute,
   });
   indexChange = async (index,) => {
  
     this.setState({ index })

   }
   validateChats =()=>{
     const { index, routes } = this.state
     if (this.props.user.profile.occupation =="Customer"){
       return(
         <TabView
           style={{ backgroundColor: "#ffffff" }}
           navigationState={{ index, routes }}
           renderScene={this.renderScene}
           onIndexChange={(index) => { this.indexChange(index)}}
           initialLayout={initialLayout}
           renderTabBar={(props) =>
             <TabBar
               {...props}
               renderLabel={({ route, focused, color }) => (
                 <Text style={[styles.text,{ color: focused ? themeColor : 'gray', margin: 8, fontWeight: "bold" }]}>
                   {route.title}
                 </Text>
               )}
               style={{ backgroundColor: "#fff", height: 50, fontWeight: "bold", color: "red" }}
               labelStyle={{ fontWeight: "bold", color: "red" }}
               indicatorStyle={{ backgroundColor: themeColor, height: 5 }}
             />
           }

         />
    
    
       )
     }
     if (this.props.user.profile.occupation == "ClinicRecoptionist") {
        return(
          <FlatList
            contentContainerStyle={{ paddingBottom: 90 }}

            data={this.state.chats}

            keyExtractor={(item, index) => index.toString()}

            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={{ height: height * 0.1, backgroundColor: "#fafafa", marginTop: 1, flexDirection: 'row' }}
                  onPress={() => { this.navigate(item, "doctor") }}
                >
                  <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                    <Image
                      source={{
                        uri: item.dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      }}
                      style={{ height: 60, width: 60, borderRadius: 30, }}
                    />
                  </View>
                  <View style={{ flex: 0.7, }}>
                    <View style={{ flex: 0.4, justifyContent: "center" }}>
                      <Text style={[styles.text, { fontWeight: 'bold', fontSize: 16 }]}>{item.title}</Text>
                    </View>
                    <View style={{ flex: 0.6, }}>
                      <Text style={[styles.text]}>{item.lastmsg}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        )
     }
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
             
              <View style={{ }}>
                <Text style={[styles.text, { color: '#fff', marginLeft: 20 ,fontWeight:'bold',fontSize:25}]}>Chats</Text>
              </View>
            
            </View>
                         {/* CHATS */}


                        {
                          this.validateChats()
                        }
              
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
    user:state.selectedUser,
  }
}
export default connect(mapStateToProps, { selectTheme })(Chat);