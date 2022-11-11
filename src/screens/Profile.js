import React, { Component } from 'react';
import {auth} from '../firebase/config';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';


class Profile extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    singOut(){
        auth.signOut()
            .then(() => {            
                this.props.navigation.navigate('Login')
            })
    }
    render(){
        return(
            <View> 
                <Text>Profile</Text>
                <TouchableOpacity onPress={()=>this.singOut()} >Log Out</TouchableOpacity>
                
            </View>
        )
    }
}    
export default Profile