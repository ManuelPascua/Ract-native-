import React, { Component } from 'react';
import {auth, db} from '../firebase/config';
import { View,Text,TouchableOpacity,StyleSheet , FlatList} from 'react-native';
import Post from '../componets/Post'


class Profile extends Component{
    constructor(){
        super()
        this.state = {
            misPosteos:[]

        }
    }
    componentDidMount(){
        db.collection('post').where('owner', '==', auth.currentUser.email).onSnapshot(

            docs=>{
                
                let posts=[];
                docs.forEach(doc => {
                    
                    posts.push({
                        id:doc.id,
                        data:doc.data()
                    })
                    this.setState({
                        misPosteos: posts,
                        loading: false
                    })
                });

            }
        )
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
                <FlatList
                    style={styles.flatlist}
                    data={ this.state.misPosteos }
                    keyExtractor={ item => item.id.toString() }
                    renderItem={ ({item}) => <Post info={item}/> }
                />
                
            </View>
        )
    }
}   
const styles = StyleSheet.create({


    flatlist: { 
        width: '100%',
        flex: 1
    },


}) 
export default Profile