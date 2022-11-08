import React, { Component } from 'react';
import { View,Text,TextInput,TouchableOpacity,StyleSheet } from 'react-native';

class Register extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    

    render(){
        return(
            <View>
                <Text>Regitrate</Text>
                <View>
                    <Text>User Name</Text>
                    <Text>Email</Text>
                    <Text>Password</Text>
                    
                       <Text>Registrate</Text>
                   
                </View>
            </View>
        )
    }
}
export default Register