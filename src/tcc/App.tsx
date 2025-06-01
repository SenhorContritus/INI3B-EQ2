import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfigPessoal from "./Pages/Main";

const Stack = createNativeStackNavigator();


export default function App(){
  return <NavigationContainer>
    
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen
        name=" "
        component={ConfigPessoal}
        
      />

    </Stack.Navigator>
  </NavigationContainer>
};
