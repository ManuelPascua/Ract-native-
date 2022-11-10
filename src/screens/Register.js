import React, { Component } from 'react';
import { View,Text,TextInput,TouchableOpacity,StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';


class Register extends Component{
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            userName:'',
            e:''
        }
    }

    registerUser(email, password, userName){
        auth.createUserWithEmailAndPassword(email, password)
            .then( res => {
                
                db.collection('users').add({
                    owner: email,
                    userName: userName,
                    createdAt: Date.now()
                })
                .then(() => {
                    this.setState({
                        email:'',
                        password:'',
                        userName:'',
                        e:''                        
                    })

                    this.props.navigation.navigate('HomeMenu')
                })
                .catch(e => console.log(e))    
                
            })
            .catch(e => console.log(e))
    }
    

    render(){
        return(
            <View className="container"> 
                <Text className='titel'>Registro</Text>
                <View className='from-container'>
                    <TextInput  
                        className='input'
                        placeholder='email'
                        keyboardType='email-address'
                        onChangeText={ text => this.setState({email:text}) }
                        value={this.state.email}
                    /> 
                    <TextInput 
                        className='input' 
                        placeholder='password'
                        keyboardType='default'
                        onChangeText={ text => this.setState({pass:text}) }
                        value={this.state.pass}
                    /> 
                    <TextInput 
                        className='input' 
                        placeholder='user name'
                        keyboardType='default'
                        onChangeText={ text => this.setState({userName:text}) }
                        value={this.state.userName}
                    />
                     

                    <TouchableOpacity className='boton' onPress={()=>this.registerUser(this.state.email, this.state.password, this.state.userName)}>
                        <Text className='boton-name'>Registrarme</Text>
                    </TouchableOpacity>

                    <Text className='back-login' onPress={ () => this.props.navigation.navigate('Login')} >Ir a login</Text>
           
                </View>
            </View>
        )
    }
}
export default Register