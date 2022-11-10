import React, { Component } from 'react';
import {auth} from '../firebase/config';
import { View,Text,TextInput,TouchableOpacity,StyleSheet } from 'react-native';


class Profile extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    singOut(){
        auth.signOut( () => {
            this.props.navigation.navigate('Login')

        })
    }

    render(){
        return(
            <View> 
                <Text>Profile</Text>
                <TouchableOpacity onPress={this.singOut()}>Log Out</TouchableOpacity>
                
            </View>
        )
    }
}    
export default Profile