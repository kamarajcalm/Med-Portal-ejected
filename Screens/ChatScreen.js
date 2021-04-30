import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, SafeAreaView } from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const { height, width } = Dimensions.get("window");
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';

import wamp from 'wamp.js2';
import HttpsClient from '../api/HttpsClient';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const wampServer = settings.wampServer;
const url =settings.url
class ChatScreen extends Component {
  constructor(props) {
      
    super(props);
    this.state = {
        message:"",
        item:this.props.route.params.item,
        pk:1,
        audio:null,
        showRecordMessage:false,
        recording:false,
        Messages:[]
    };
  }

    messageHandler = (args) => {
        var details = args[0]
        console.log(details, 'dfijd');
        
        
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        });
        if (result.cancelled == true) {
            return
        }
        let filename = result.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        var type = match ? `image/${match[1]}` : `image`;
        const photo = {
            uri: result.uri,
            type: type,
            name: filename,
        };
        this.setState({ selectedFile: photo, selectedType: 'image' })
    //  let sendd =new FormData();
    //  sendd.append('img',photo)
    // console.log(sendd,"hhh"),
    // client.send(sendd)
    };
    getChatMessage =()=>{
      
        this.setConnection()
    }
    setConnection = (task) => {

        var connection = new wamp.Connection({ url: wampServer, realm: 'default' });
      
        if (connection != null ) {
            connection.onopen = (session, details) => {
                session.subscribe(this.state.item.uid, this.messageHandler).then(
                    (sub) => {
                    },
                    (err) => {
                    });
            }
            connection.open();
            
   
        } else if (task == "close"){
            connection.close()
        }
       
    }
  componentDidMount(){
   this.getChatMessage()
   console.log(this.state.item)
  
  }
 componentWillUnmount(){
  
 }

    showMessage =()=>{
        this.setState({showRecordMessage:true})
        setTimeout(()=>{
            this.setState({ showRecordMessage: false})
        },1000)
    }
startRecording =async()=>{
    try {
        console.log('Requesting permissions..');
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });
        console.log('Starting recording..');
        this.setState({ recording:true})
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
        this.setState({ audio: recording})
        console.log('Recording started');
      recording.getStatusAsync()
            .then(function (result) {
                console.log(result.durationMillis)
            })
            .catch((err)=>{
               console.log(err,"jjjj")
            });
    } catch (err) {
        console.error('Failed to start recording', err);
    }
}
stopRecording =async()=>{
    try{
         var audio_chunks = [];
        console.log('Stopping recording..');
        await this.state.audio.stopAndUnloadAsync();
        const uri = this.state.audio.getURI();
        console.log('Recording stopped and stored at', uri);
        this.setState({ recording: false })
        this.setState({ audio: undefined })
       
      
        let filename = uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
 
        var type = match ? `audio/${match[1]}` : `audio`;
        let selectedFile ={
            uri,
            type,
            name:filename
        }
        console.log(selectedFile)
        var sendData = {
         
            bodyType: 'formData',
            thread: this.state.item.groupPk,
            sender: this.props.user.id,
            msgType: 'voice',
            attachment:selectedFile,
            
        }
       console.log(sendData,"kkk")
        var data = await HttpsClient.post(url + '/api/prescription/chats/', sendData)
        console.log(data)
        const source = { uri: uri }
        const initialStatus ={}
        const onPlaybackStatusUpdate = null
        const { sound } = await Audio.Sound.createAsync(
            source,
            initialStatus,
            onPlaybackStatusUpdate,
            downloadFirst = true
        );
        console.log('Playing Sound');
        await sound.playAsync();
    }catch(err){
             console.log(err)
    }
   
    }   
    openCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
        if(result.cancelled == true){
          return
        }

        let filename = result.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
  
        const photo = {
            uri: result.uri,
            type: result.type,
            name: result.name
        };
        this.setState({ selectedFile: photo, selectedType: 'image' })


    }
    getPhotosFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
        if(result.cancelled == true){
          return
        }
        let filename = result.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        var type = match ? `image/${match[1]}` : `image`;
    
        const photo = {
            uri: result.uri,
            type: result.type,
            name: filename
        };
        this.setState({ selectedFile: photo, selectedType: 'image' })
    }
sendMessage =async()=>{
    var sendData = {
        message: this.state.message,
        bodyType: 'formData',
        thread: this.state.item.groupPk,
        sender: this.props.user.id,
        msgType: 'text'

    }
    if (this.state.selectedFile != null) {
        sendData.attachment = this.state.selectedFile
        if (this.state.selectedType != null) {
            sendData.msgType = this.state.selectedType
        }
    }
    var data = await HttpsClient.post(url + '/api/prescription/chats/', sendData)
   
}
    modalAttach = (event) => {
        this.setState({ attachModal: !this.state.attachModal });
        if (event == 'gallery') this.getPhotosFromGallery();
        if (event == 'camera') {
            this.setState({ isCameraVisible: true });
            return this.openCamera()
        }

    };
  render() {
      const{ item }=this.state
    return (
          <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.bottomSafeArea}>
      <View style={{flex:1}}>
            {/* HEADERS */}
            <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                  onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center",flexDirection:"row" }}>
                  
                        <Image
                            source={{ uri: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                            style={{ height: 60, width: 60, borderRadius: 30, }}
                            
                        />
                 
                      
                    <Text style={[styles.text, { color: '#fff', marginLeft: 20, fontWeight: 'bold' ,fontSize:20}]}>{item?.name}</Text>
                </View>
                <View style={{ flex: 0.2 }}>
                </View>
            </View>
            <FlatList 
              style={{marginTop:20}}
              data={this.state.Messages}
              keyExtractor={(item,index)=>index.toString()}
              renderItem={({item,index})=>{
                  if(item.pk!=this.state.pk){
                      return (
                          <View style={{ alignSelf: "flex-start", backgroundColor:'#eeee', padding: 10, borderRadius: 20, marginRight: 10, marginTop: 10,marginLeft:20,maxWidth:width*0.6}}>
                              <Text style={[styles.text]}>{item.message}</Text>
                              <View style={styles.leftArrow}></View>

                              <View style={styles.leftArrowOverlap}></View>
                          </View>
                      )
                  }
                  return(
                      <View style={{ alignSelf: 'flex-end', backgroundColor: themeColor, padding: 10, borderRadius: 20, marginRight: 20, marginTop: 10, maxWidth: width * 0.6}}>
                          <Text style={[styles.text,{color:"#fff"}]}>{item.message}</Text>
                          <View style={styles.rightArrow}></View>

                          <View style={styles.rightArrowOverlap}></View>
                      </View>
                  )
              }}
            />
            <View style={{flexDirection:'row'}}> 
                <View style={{ backgroundColor: "#fafafa",minHeight: height * 0.05, maxHeight: height * 0.2, borderRadius: 15,flex:1,marginLeft:20,marginBottom:10 ,flexDirection:"row"}}>
                    <View style={{ flex:0.8 }}>
                        {!this.state.recording?
                            <TextInput
                                multiline={true}
                                style={{ width: "100%", minHeight: height * 0.05, maxHeight: height * 0.2, paddingLeft: 5 }}
                                selectionColor={themeColor}
                                placeholder="Write a message...."
                                onChangeText={(text) => {
                                    this.setState({message:text})
                                   
                                }}
                            />:
                            <View style={{justifyContent:'center',height:height*0.05,}}>
                                <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={[styles.text,{color:themeColor,marginLeft:20}]}>Recording.....</Animatable.Text>
                            </View>
                        }
                      
                    </View>
                    <TouchableOpacity style={{ flex: 0.2,alignItems:'center',justifyContent:"center"}}
                      onPress={()=>{this._pickImage()}}
                    >
                        <Entypo name="attachment" size={24} color={themeColor} />
                    </TouchableOpacity>
                </View>

                <View style={{height:height*0.05,alignItems:'center',justifyContent:"center",}}>
                    {this.state.message .length>0? <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", height: height * 0.07, backgroundColor: themeColor, borderRadius: 30, height: height * 0.05, width: 40, margin: 10 }}
                                onPress={() => { this.sendMessage()}}
                    >
                        <Feather name="send" size={24} color="#fff" />
                    </TouchableOpacity> : 
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", height: height * 0.07, backgroundColor: themeColor, borderRadius: 30,  height:height*0.05, width: 40,margin:10 }}
                            onPress={()=>{this.showMessage()}}
                            onPressOut={() => {this.stopRecording()}}
                            onLongPress={() => {this.startRecording()}}
                    >
                        <FontAwesome name="microphone" size={24} color="#fff" />
                    </TouchableOpacity>}
                </View>
                {this.state.showRecordMessage&&<View 
                
                style={{position:"absolute",bottom:60,backgroundColor:themeColor,width:width*0.5,height:height*0.05,alignItems:"center",justifyContent:"center",borderRadius:10,right:25}}>
                    <Text style={[styles.text,{color:"#fff",fontSize:12}]}>Hold to record,release to send</Text>
                    <View style={styles.rightArrow}></View>

                    <View style={styles.rightArrowOverlap}></View>
                </View>}
                
               
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
    rightArrow: {
        position: "absolute",
        backgroundColor: themeColor,
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10
    },

    rightArrowOverlap: {
        position: "absolute",
        backgroundColor: "#fff",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20

    },
    leftArrow: {
        position: "absolute",
        backgroundColor: "#eeee",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },

    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: "#fff",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20

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
        user:state.selectedUser
    }
}
export default connect(mapStateToProps, { selectTheme })(ChatScreen);