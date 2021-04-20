import axios from 'axios';
import {AsyncStorage } from 'react-native';
async function getCredentials() {
    const sessionid = await AsyncStorage.getItem('sessionid');
    const csrf = await AsyncStorage.getItem('csrf');

    return { csrf: csrf, sessionid: sessionid }
}
const authAxios = async()=>{
    let token =await getCredentials()
    console.log(token.csrf,"kkkk")
  axios.create({
       headers:{
            "X-CSRFToken":token.csrf
       }
    })
}

export default authAxios;