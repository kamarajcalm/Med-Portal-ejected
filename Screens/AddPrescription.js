import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../AppSettings';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const { height ,width} = Dimensions.get("window");
const fontFamily =settings.fontFamily;
const themeColor=settings.themeColor;
const data=[
    {
        img:"https://caringals.com/wp-content/uploads/2020/05/1200x900jpg.jpg",
        name:'citrus' 
    },
    {
        img: "https://caringals.com/wp-content/uploads/2020/05/1200x900jpg.jpg",
        name: 'paracetomal'
    },
    {
        img: "https://caringals.com/wp-content/uploads/2020/05/1200x900jpg.jpg",
        name: 'antacin'
    },
    {
        img: "https://caringals.com/wp-content/uploads/2020/05/1200x900jpg.jpg",
        name: 'pencilin'
    },
]
import { AntDesign } from '@expo/vector-icons';
import MedicineDetails from '../components/MedicineDetails';
class AddPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data
    };
  }
timingSelect=(time,index)=>{
   console.log(time,index,"hhhhh")
}
  render() {
    return (
        <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.bottomSafeArea}>
        <View style={{flex:1}}>
                    {/* HEADERS */}
            <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection:'row',alignItems:"center"}}>
                <TouchableOpacity style={{flex:0.2,alignItems:"center",justifyContent:'center'}}
                  onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                    <Text style={[styles.text,{ color: '#fff',marginLeft: 20 }]}>Add Prescription</Text>
                </View>
                 <View style={{flex:0.2}}>
                </View>       
            </View>
            {/* FORMS */}

            <ScrollView contentContainerStyle={{ marginHorizontal:20}}>
                
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Mobile No</Text>
                    <TextInput
                         selectionColor={themeColor}
                         keyboardType="numeric"
                         style={{ width: width * 0.9, height: height * 0.05, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10}}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Patient's Name</Text>
                    <TextInput
                        selectionColor={themeColor}
                        style={{ width: width * 0.9, height: height * 0.05, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10 }}
                    />
                </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>On Going Treatment</Text>
                            <TextInput
                                
                                selectionColor={themeColor}
                                multiline={true}
                                keyboardType="numeric"
                                style={{ width: width * 0.9, height: height * 0.15, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10 }}
                            />
                        </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Health issues</Text>
                    <TextInput
                        selectionColor={themeColor}
                        multiline={true}
                        keyboardType="numeric"
                        style={{ width: width * 0.9, height: height * 0.15, backgroundColor: "#fafafa", borderRadius: 15, padding: 10, marginTop: 10 }}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.text], { fontWeight: "bold", fontSize: 18 }}>Add Medicines</Text>
                    <TouchableOpacity style={{marginTop:20,alignItems:"center",justifyContent:'center',flexDirection:"row"}}
                        onPress={() => { this.props.navigation.navigate("SearchMedicines") }}
                    >
                        <AntDesign name="pluscircle" size={30} color={themeColor} />
                    </TouchableOpacity>
                </View>
                {
                   this.state.data.map((item,index)=>{
                        return(
                            <MedicineDetails item={item} index={index} timingSelect={(time,index) => { this.timingSelect(time,index)}}/>
                        )
                    })
                }
                <View style={{height:height*0.15,alignItems:"center",justifyContent:'center'}}>
                    <TouchableOpacity style={{height:height*0.06,alignItems:"center",justifyContent:'center',backgroundColor:themeColor,width:width*0.3,borderRadius:15}}>
                           <Text style={[styles.text,{color:"#fff"}]}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
     </SafeAreaView>
       </>
        
    );
 
  }
}
const styles= StyleSheet.create({
  text:{
      fontFamily
  },
  elevation:{
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0,
      shadowRadius: 4.65,

      elevation: 8,
  },
    card: {
        backgroundColor: "#fff",
        elevation: 6,
        margin: 10,
        height: height * 0.2,
        borderRadius:10,
        flexDirection:"row"
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
export default connect(mapStateToProps, { selectTheme })(AddPrescription);