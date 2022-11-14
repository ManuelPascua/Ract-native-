import { Component } from 'react'
import {Text,View, FlatList, StyleSheet} from 'react-native'
import {db} from '../firebase/config';

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
            <View>
                <Text> Tu Feed </Text>
                <View>
                    <FlatList
                        data={ this.state.posteos }
                        keyExtractor={ item => item.id.toString() }
                        renderItem={ ({item}) => <Text>{item.owner}</Text> }
                    />
                </View>
            </View>
        )
    }   
    
         
}




const styles = StyleSheet.create({
    flatlist: { width: '100%', flex: 1},
})
 

export default Home