import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView, FlatList} from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import settings from '../AppSettings';
const fontFamily =settings.fontFamily;
const themeColor =settings.themeColor;
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width
const url = settings.url
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import HttpsClient from '../api/HttpsClient';
import Toast from 'react-native-simple-toast';
 class ShowCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        card:this.props.route.params.item,
        valid:this.props.route.params.item.active,
    };
    } 
    onSwipeUp(gestureState) {
       this.props.navigation.goBack()
    }

    onSwipeDown(gestureState) {
        this.props.navigation.goBack()
    }

    onSwipeLeft(gestureState) {
        this.props.navigation.goBack()
    }

    onSwipeRight(gestureState) {
        this.props.navigation.goBack()
    }
    onSwipe(gestureName, gestureState) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        this.setState({ gestureName: gestureName });
        switch (gestureName) {
            case SWIPE_UP:
                this.setState({ backgroundColor: 'red' });
                break;
            case SWIPE_DOWN:
                this.setState({ backgroundColor: 'green' });
                break;
            case SWIPE_LEFT:
                this.setState({ backgroundColor: 'blue' });
                break;
            case SWIPE_RIGHT:
                this.setState({ backgroundColor: 'yellow' });
                break;
        }
    }
    validate =async()=>{
        let api = `${url}/api/prescription/prescriptions/${this.state.card.id}/`
        console.log(api)
        let sendData ={
            active:!this.state.valid
        }
        let post = await HttpsClient.patch(api,sendData)
        if(post.type == "success"){
            this.setState({ valid: !this.state.valid })
        }else{
            Toast.show("try again");
        }
      
    }
     header =()=>{
         return(
             <View style={{ flexDirection: "row" ,marginTop:20}}>
                 <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                     <Text style={[styles.text,{fontWeight:"bold",fontSize:12}]}>Medicine</Text>
                 </View>
                 <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                     <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>AfterFood</Text>
                 </View>
                 <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                     <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>morning</Text>
                 </View>
                 <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                     <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>AfterNoon</Text>
                 </View>
                 <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                     <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>Night</Text>
                 </View>
                 <View style={{ flex: 0.2 ,alignItems:'center',justifyContent:"center"}}>
                     <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>Qty</Text>
                 </View>
                 <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                     <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>days</Text>
                 </View>
             </View>
         )
     }
  render() {
      const{ card} = this.state
      const config = {
          velocityThreshold: 0.6,
          directionalOffsetThreshold: 80
      };
    return (
      <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.bottomSafeArea}>
                      {/*Headers  */}
            <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, justifyContent:"center",flexDirection:"row"}}>
                <TouchableOpacity style={{flex: 0.2,marginLeft:20,alignItems:"center",justifyContent:'center'}}
                  onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={{flex:0.6,alignItems:'center',justifyContent:"center"}}>
                   <Text style={[styles.text,{color:"#fff"}]}>Priscription Details</Text>   
                </View>
                    <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                       
                    </View>
            </View>
            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                onSwipeUp={(state) => this.onSwipeUp(state)}
                onSwipeDown={(state) => this.onSwipeDown(state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={{
                    flex: 1,
                    backgroundColor:"#fff",
                    alignItems:"center",
                    paddingTop:50
                }}
            >
                

                <Animatable.View style={[styles.elevation,{ height: height*0.65, backgroundColor: "#ffff", width: width * 0.9, borderRadius:20,}]}
                    animation="slideInDown" 
                
                >
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity style={{alignItems:'center',justifyContent:"center",marginTop:20}}
                          onPress={()=>{this.props.navigation.navigate('ProfileView')}}
                        >
                                <Image
                                    source={{ uri: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                    style={{ height: 60, width: 60, borderRadius: 30 }}
                                />
                                <View>
                                    <Text style={[styles.text]}>{card.username}</Text>
                                </View>
                        </TouchableOpacity>
                           
                         <FlatList 
                            ListHeaderComponent ={this.header()}
                            data={card.medicines}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={({item,index})=>{
                                return(
                                    <View style={{flexDirection:"row",marginTop:10}}>
                                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>{item.medicinename}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>{item.after_food?"yes":"no"}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>{item.morning_count}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>{item.afternoon_count}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>{item.night_count}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>{item.total_qty}</Text>
                                        </View>
                                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                                            <Text style={[styles.text, { fontWeight: "bold", fontSize: 12 }]}>{item.days}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                         />
                    </View>
                </Animatable.View>

                    {this.props.user.profile.occupation == "Doctor"&& <View style={{marginTop:30}}>
                  <TouchableOpacity style={{width:width*0.3,height:height*0.05,alignItems:"center",justifyContent:'center',borderRadius:10,backgroundColor:this.state.valid?themeColor:'gray'}}
                   onPress={()=>{this.validate()}}
                  >
                      <Text style={[styles.text,{color:"#fff"}]}>{this.state.valid?"Make InValid":"MakeValid"}</Text>
                  </TouchableOpacity>
              </View>}
            </GestureRecognizer>
            </SafeAreaView>
            </>
    );
  
   
  }
}
const styles=StyleSheet.create({
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
    elevation:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0,
        shadowRadius: 4.65,
        elevation: 6,
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user: state.selectedUser,
    }
}
export default connect(mapStateToProps, { selectTheme })(ShowCard)