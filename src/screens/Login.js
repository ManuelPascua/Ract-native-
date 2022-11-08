import React, { Component } from 'react';
import {auth} from '../firebase/config';
import { View,Text,TextInput,TouchableOpacity,StyleSheet } from 'react-native';


class Login extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    


    render(){
        return(
            <View> 
                <Text>Login</Text>
                <View>
                   <Text>Email</Text>
                   <Text>Password</Text>
                   
                </View>
            </View>
        )
    }
}    
export default Login