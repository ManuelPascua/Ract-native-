import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';

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

    borrar(){
        db.collection('post').doc(this.props.info.id).delete()
    }

    render(){
        return(
            <View style={styles.postContainer}>
                <Text style={styles.text}>{this.props.info.data.owner}</Text>
                <Text style={styles.text}>{this.props.info.data.textoPost}</Text>
                { this.props.info.data.owner === auth.currentUser.email ?
                <TouchableOpacity onPress={()=> this.borrar()}><Text>borrar</Text></TouchableOpacity>
                :
                <> </>    
                }
                    <View style={styles.data}>
                        <Text style={styles.text}>{this.state.likesAmount}</Text>
                        <View style={styles.interaccion}>

                            
                            { this.state.myLike ? 
                                <TouchableOpacity style={styles.textInteraccion} onPress={ ()=> this.unLike() }>
                                    <Text >No me gusta más</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.textInteraccion} onPress={ ()=> this.like() }>
                                    <Text >Me gusta</Text>
                                </TouchableOpacity>
                            }

                            <TouchableOpacity  style={styles.textInteraccion} onPress={() => this.props.navigation.navigate('Comments', {id: this.props.info.id})}>
                                <Text >Comentar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({

    postContainer:{
        flex: 1,
        marginBottom: 2,
        marginTop: 2,
        marginLeft: '4%',
        marginRight: '4%',
        backgroundColor: 'rgb(32,33,36)',
        borderRadius:10,
        textAlign:'center', 
    },

    data:{
        flex:1,
        width:'100%',  
    },

    text:{
        color:'rgb(189, 193, 198)',
    },

    textInteraccion:{
        color:'rgb(189, 193, 198)',
        marginRight:30,
        width:'10%',
        borderRadius:10,
        borderColor:'rgb(189, 193, 198)' ,
        borderWidth:1, 
    },

    interaccion:{
        flexDirection:'row',
        alignContent:'space-between'
    },

})






export default Post