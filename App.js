import Register from './src/screens/Register';
import Login from './src/screens/Login';
import HomeMenu from './src/componets/HomeMenu';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { StyleSheet } from 'react-native';
import Comments from './src/screens/Comments';


const Stack = createNativeStackNavigator();

function App() {
  return (
    //Plantear la navegación
    <NavigationContainer>

     <Stack.Navigator>

        <Stack.Screen 
          name="Login" 
          component={ Login }
          options={ { headerShown: false } } 
        />

        <Stack.Screen 
          name="Register" 
          component={ Register }
          options={ { headerShown: false } } 
        />

        <Stack.Screen 
          name="HomeMenu" 
          component={ HomeMenu }
          options={ { headerShown: false } } 
        />

        <Stack.Screen 
          name="Comments" 
          component={ Comments }
          options={ { headerShown: false } } 
        />


     </Stack.Navigator>

   </NavigationContainer>
  );
}


export default App;
