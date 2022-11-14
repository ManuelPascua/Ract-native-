import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            myLike: false,
            likesAmount:this.props.postData.data.likes.length
            
            
        }
    }
    componentDidMount(){
        if(this.props.postData.data.likes.includes(auth.currentUser.email)){
            this.setState({
                myLike: true
                
            })
        }
    }

    like(){
        db.collection('posts')
            .doc(this.props.postData.id) 
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) 
            })
            .then(()=> this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes +1,
                myLike: true, 
                })
            )
            .catch(e=>console.log(e))

    }

    unLike(){
        db.collection('posts')
            .doc(this.props.postData.id) 
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) 
            })
            .then(()=> this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes -1,
                myLike: false, 
                })
            )
            .catch(e=>console.log(e))

    }

    render(){
        return(
            <View>
                <Text>{this.props.postData.data.textoPost}</Text>
                <Text>Cantidad de likes: {this.state.likesAmount}</Text>
                
                { this.state.myLike ? 
                    <TouchableOpacity onPress={ ()=> this.unLike() }>
                        <Text>No me gusta más</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text>Me gusta</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}