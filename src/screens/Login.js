import React, { Component } from 'react';
import {auth} from '../firebase/config';
import { View,Text,TextInput,TouchableOpacity,StyleSheet } from 'react-native';


class Login extends Component{
    constructor(){
        super()
        this.state = {
            email:"",
            password:"",
            e:""

        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user=> {
            if(user){

            this.props.navigation.navigate('HomeMenu')
            
        }})           
    }

    loginUser(email, password){
        auth.signInWithEmailAndPassword(email, password)
            .then( res => {
                this.setState({
                    email:'',
                    password:''
                })
                this.props.navigation.navigate('HomeMenu')
            })
            .catch(e => console.log(e))
    }
    


    render(){
        return(
            <View> 
                <Text>Login</Text>
                <View>
                   
                    <TextInput  
                       placeholder='email'
                       keyboardType='email-address'
                       onChangeText={ text => this.setState({email:text}) }
                       value={this.state.email}
                    /> 
                    <TextInput  
                        placeholder='password'
                        keyboardType='default'
                        onChangeText={ text => this.setState({password:text}) }
                        value={this.state.pass}
                        secureTextEntry = {true}
                    /> 
                    <TouchableOpacity onPress={()=>this.loginUser(this.state.email, this.state.password)}>
                        <Text>Ingresar</Text>
                    </TouchableOpacity>
                    <Text onPress={ () => this.props.navigation.navigate('Register')} >Ir a Registro</Text> 
                   
                </View>
            </View>
        )
    }
}    
export default Login