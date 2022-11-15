import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            myLike: false,
            likesAmount:this.props.info.data.likes.length
            
            
        }
    }
    
    componentDidMount(){
        if(this.props.info.data.likes.includes(auth.currentUser.email)){
            this.setState({
                myLike: true
                
            })
        }
    }

    like(){
        db.collection('post')
            .doc(this.props.info.id) 
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
        db.collection('post')
            .doc(this.props.info.id) 
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
                <Text>{this.props.info.data.owner}</Text>
                <Text>{this.props.info.data.textoPost}</Text>
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', {id: this.props.info.id})}>
                    <Text>Comentar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Post