import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const { height, width } = Dimensions.get("window");
import { Ionicons } from '@expo/vector-icons';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
const initialLayout = { width: Dimensions.get('window').width };
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';

class Appointments extends Component {
    constructor(props) {
        const routes = [
            { key: 'New Appoinments', title: 'New Appoinments' },
            { key: 'Completed', title: 'Completed'},

        ];
        super(props);
        this.state = {
            index: 0,
            routes: routes,
            modal:false,
            mode: 'time',
            date: new Date(),
            show: false,
        };
    }
    componentDidMount() {

    }
    onChange = (selectedDate) => {
        if (selectedDate.type == "set") {
            this.setState({ today: moment(new Date(selectedDate.nativeEvent.timestamp)).format('YYYY-MM-DD'), show: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {
                console.log(this.state.today, "jjjj")

            })

        } else {
            return null
        }

    }
    renderScene = (routes) => {

        return(
                <View 
                            style={{
                                marginTop:10,
                                minHeight:height*0.1,
                                backgroundColor:"#eee",
                                marginHorizontal:10,
                                borderRadius:10,
                                flexDirection:"row"
                            }}
                             
                            > 
                                <TouchableOpacity style={{flex:0.2,alignItems:"center",justifyContent:'center'}}
                                onPress={() => { this.props.navigation.navigate('ProfileView')}}
                                >
                                <Image
                                    source={{ uri: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                    style={{ height: 60, width: 60, borderRadius: 30 }}
                                />
                                </TouchableOpacity>  
                            <View style={{ flex: 0.4,justifyContent: "space-around",alignItems:"center",}}>
                               <Text style={[styles.text]}>kamaraj</Text>
                               <Text style={[styles.text]}>11/04/2021</Text>
                            </View>
                                        {/* TABS */}
                       
                <View style={{flex:0.4,flexDirection:"row"}}>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ height: height * 0.05, width: "80%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "#32CD32" }}
                          onPress={()=>{this.setState({modal:true})}}
                        >
                            <Text style={[styles.text, { color: "#fff" }]}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ height: height * 0.05, width: "80%", borderRadius: 10, alignItems: 'center', justifyContent: "center", backgroundColor: "#B22222" }}>
                            <Text style={[styles.text, { color: "#fff" }]}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                            </View>
         
        )
    }
    indexChange = async (index,) => {
    
            this.setState({ index })
        
    }
    Modal =()=>{
        return(
            <Modal 
            
              isVisible={this.state.modal}
              onBackdropPress={()=>{this.setState({modal:false})}}
            >
                 <View style={{flex:1,justifyContent:"center"}}>
                     <View style={{height:height*0.3,backgroundColor:"#eee",borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                          <Text style={[styles.text]}>Select Date</Text>
                          <TouchableOpacity 
                            onPress={() => { this.setState({ show: true })}}
                          >
                            <Ionicons name="time" size={24} color="black" />
                          </TouchableOpacity>
                     </View>
                 </View>
            </Modal>
        )
    }
    render() {
        const { index, routes } = this.state
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <StatusBar backgroundColor={themeColor} />
                              {/* HEADERS */}
                        <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                            <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}

                            >

                            </View>
                            <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: '#fff', marginLeft: 20, fontWeight: 'bold' ,fontSize:18}]}>Appoinments</Text>
                            </View>
                            <View style={{ flex: 0.2 }}>
                            </View>
                        </View>
                        <TabView
                            style={{ backgroundColor: "#ffffff" }}
                            navigationState={{ index, routes }}
                            renderScene={this.renderScene}
                            onIndexChange={(index) => { this.indexChange(index) }}
                            initialLayout={initialLayout}
                            renderTabBar={(props) =>
                                <TabBar
                                    {...props}
                                    renderLabel={({ route, focused, color }) => (
                                        <Text style={{ color: focused ? themeColor : 'gray', margin: 8, fontWeight: "bold" }}>
                                            {route.title}
                                        </Text>
                                    )}
                                    style={{ backgroundColor: "#fff", height: 50, fontWeight: "bold", color: "red" }}
                                    labelStyle={{ fontWeight: "bold", color: "red" }}
                                    indicatorStyle={{ backgroundColor: themeColor, height: 5 }}
                                />
                            }

                        />
                         {/* Appoinments */}
                        {this.Modal()}
                        {this.state.show && (
                            <DateTimePicker
                                testID="TimePicker1"
                                value={this.state.date}
                                mode={this.state.mode}
                                is24Hour={false}
                                display="default"
                                onChange={(time) => { this.onChange(time) }}
                            />
                        )}
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
export default connect(mapStateToProps, { selectTheme })(Appointments);
