import { Component } from 'react'
import {Text,View, FlatList, StyleSheet} from 'react-native'
import firebase from 'firebase';
import {db} from '../firebase/config';
import Post from '../componets/Post'


class Home extends Component{
    constructor(){
        super()
        this.state = {
            posteos:[]
            
        }
    }
    componentDidMount(){
        db.collection('post').onSnapshot(

            docs=>{
                
                let posts=[];
                docs.forEach(doc => {
                    
                    posts.push({
                        id:doc.id,
                        data:doc.data()
                    })
                    this.setState({
                        posteos: posts,
                        loading: false
                    })
                });

            }
        )
    } 
    render(){
        return(

            <View style={styles.flatlist}>
                <Text> Tu Feed </Text>
                <FlatList
                    style={styles.flatlist}
                    data={ this.state.posteos }
                    keyExtractor={ item => item.id.toString() }
                    renderItem={ ({item}) => <Post navigation={this.props.navigation} info={item}/> }
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
 

export default Home