import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView, TextInput} from 'react-native';
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const { height, width } = Dimensions.get("window");
import { Ionicons } from '@expo/vector-icons';
import authAxios from '../api/authAxios';
import HttpsClient from '../api/HttpsClient';
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const url = settings.url
class Clinics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics:[]
        };
    }
    getClinics =async()=>{
        const api =`${url}/api/prescription/clinics/`
        console.log(api)
        const data =await HttpsClient.get(api)
        
        if(data.type=="success"){
            this.setState({ clinics:data.data})
        }
    }
    searchClincs = async(query)=>{
      
        let api = `${url}/api/prescription/clinics/?storeType=Clinic&search=${query}`
        console.log(api)
        const data = await HttpsClient.get(api)
        console.log(data,"jj")
        if (data.type == "success") {
            this.setState({ clinics: data.data })
        }
    }
    componentDidMount() {
      this.getClinics()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {

            this.getClinics()
        });
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    render() {
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <StatusBar backgroundColor={themeColor} />
                        {/* HEADERS */}
                     {!this.state.search ?  <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                            <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                              onPress={()=>{this.setState({search:true})}}
                            >
                                <Ionicons name="ios-search" size={20} color="#fff" />
                            </TouchableOpacity>
                            <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.text, { color: '#fff', fontWeight: 'bold',fontSize:18 }]}>Clincs</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 0.2 }}
                                onPress={() => { this.props.navigation.navigate('CreateClincs')}}
                            >
                                <Ionicons name="add-circle" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View> : <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                            <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                                onPress={() => { this.setState({ search: false }) ;}}
                            >
                                <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                            </TouchableOpacity>
                            <View style={{ flex: 0.8 }}>
                                <TextInput
                                    
                                     style={{ height: height * 0.04, width: width * 0.7, backgroundColor: "#fff", borderRadius: 10, paddingLeft: 20 }}
                                    placeholder="search"
                                    onChangeText={(text) => { this.searchClincs(text) }}
                                />
                            </View>
                        </View>}
                        {/* CHATS */}
                        <FlatList
                         
                           
                            data={this.state.clinics}

                            keyExtractor={(item, index) => index.toString()}

                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={{ height: height * 0.1, backgroundColor: "#fafafa", marginTop: 1, flexDirection: 'row' }}
                                        onPress={() => { this.props.navigation.navigate('ClinicDetails',{item}) }}
                                    >
                                        <View style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                                            <Image
                                                source={{ uri: item.displayPicture||"https://s3-ap-southeast-1.amazonaws.com/practo-fabric/practices/711061/lotus-multi-speciality-health-care-bangalore-5edf8fe3ef253.jpeg" }}
                                                style={{ height: 60, width: 60, borderRadius: 30, }}
                                            />
                                        </View>
                                        <View style={{ flex: 0.7, }}>
                                            <View style={{ flex: 0.4, justifyContent: "center" }}>
                                                <Text style={[styles.text, { fontWeight: 'bold', fontSize: 16 }]}>{item.companyName}</Text>
                                            </View>
                                            <View style={{ flex: 0.6, }}>
                                                <Text style={[styles.text]}>{item.city}</Text>
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
        user:state.selectedUser
    }
}
export default connect(mapStateToProps, { selectTheme })(Clinics);
