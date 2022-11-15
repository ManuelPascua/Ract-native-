import { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View , StyleSheet, FlatList} from 'react-native';
import { db , auth} from '../firebase/config'
import firebase from 'firebase'

class Comments extends Component{
    constructor(props){
        super(props)
        this.state={
            comentarios: [],
            textoComment:''
        }
    }

    componentDidMount(){
        db.collection('post').doc(this.props.route.params.id).onSnapshot(
            doc => {
                const comments = doc.data().comentarios;

                this.setState({
                    comentarios: comments
                })
            }
        )
    }

    subir() {
        db.collection('post').doc(this.props.route.params.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                description: this.state.textoComment,
                createdAt: Date.now()
            }) 
            
        })
        .then(
            () => {
                this.setState({
                    commentarios: this.state.comentarios.concat(
                        [{
                            owner: auth.currentUser.email,
                            description: this.state.textoComment,
                            createdAt: Date.now()
                        }]
                    ),
                    textoComment:''
                })
            }
        )

    }

    render() {
        console.log(this.state.comentarios)
        return (
            <View>
                <Text>Comentarios</Text>
                <FlatList
                    style={styles.flatlist}
                    data={ this.state.comentarios }
                    keyExtractor={ item => item.createdAt.toString() }
                    renderItem={ ({item}) => <Text>{item.description} </Text> }
                />

                <TextInput
                    placeholder='que opinas?'
                    keyboardType='default'
                    onChangeText={ text => this.setState({textoComment:text}) }
                    value={this.state.textoComment}
                />

                <TouchableOpacity onPress={() => this.subir()}>
                    <Text>Subir</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Text>volver</Text>
                </TouchableOpacity>
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
 

export default Comments;