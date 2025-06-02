import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
<<<<<<< HEAD
import ConfigPessoal from "./Pages/Main";
=======
import Main from "./Pages/Main";
import ConfigPessoal from "./Pages/ConfigPessoal";
>>>>>>> a711255e473c9123d27f72a4f8872360b0658435

const Stack = createNativeStackNavigator();


export default function App(){
  return <NavigationContainer>
    
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        
      />
      <Stack.Screen name="ConfigPessoal" component={ConfigPessoal} />

    </Stack.Navigator>
  </NavigationContainer>
};
