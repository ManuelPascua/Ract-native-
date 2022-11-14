import { Component } from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import { db, auth} from '../firebase/config'

class Newposte extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            createdAt:'',

        }
    }

    cargaPosteo(texto){
        db.collection('post').add({
            owner: auth.currentUser.email,
            textoPost: texto,
            likes:[],
            createdAt: Date.now()
        })
        .then(()=>{
            this.setState({
                textoPost: '',
            })

            
            this.props.navigation.navigate('Home')
        
        })
        .catch(e =>console.log(e))
    }

    
    render(){
        return(
            <View>
                <Text> Nueva Publicación</Text>
                <View>
                    <TextInput 
                        placeholder='que estas pensando?'
                        keyboardType='default'
                        onChangeText={ text => this.setState({textoPost:text}) }
                        value={this.state.textoPost}
                    />
                    <TouchableOpacity onPress={()=>this.cargaPosteo(this.state.textoPost)}>
                        <Text>
                            Publicar
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}

export default Newposte