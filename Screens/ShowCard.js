import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import settings from '../AppSettings';
const themeColor =settings.themeColor;
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
 class ShowCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        card:this.props.route.params.item
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
  render() {
      const{ card} = this.state
      const config = {
          velocityThreshold: 0.6,
          directionalOffsetThreshold: 80
      };
    return (
      <>
                      {/*Headers  */}
            <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, justifyContent: "center" }}>
                <TouchableOpacity style={{width:width*0.2,marginLeft:20}}
                  onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                </TouchableOpacity>
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
                

                <Animatable.View style={{ height: height*0.7, backgroundColor: "#ffff", width: width * 0.8, borderRadius:20,alignItems:'center',justifyContent:'center',elevation:6}}
                    animation="zoomInUp" 
                >
                    <View style={{ margin: 20, alignItems: 'center', justifyContent: "space-around", flexDirection: 'row' ,flex:1}}>
                        <View>
                            <Text>{card.name}</Text>
                        </View>
                        <View>
                            <Text>{card.doctor}</Text>
                        </View>
                        <View>
                            <Text>{card.No}</Text>
                        </View>
                    </View>
                </Animatable.View>

              
            </GestureRecognizer>
            </>
    );
  
   
  }
}
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(ShowCard)