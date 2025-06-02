import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from "./Pages/Main";
import ConfigPessoal from "./Pages/ConfigPessoal";
import ConfigurarAlarme from "./Pages/ConfigurarAlarme";
import TocarAlarme from "./Pages/TocarAlarme";


const Stack = createNativeStackNavigator();


export default function App(){
  return <NavigationContainer>
    
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Main" component={Main}/>
      <Stack.Screen name="ConfigPessoal" component={ConfigPessoal} />
      <Stack.Screen name="ConfigurarAlarme" component={ConfigurarAlarme} />
      <Stack.Screen name="TocarAlarme" component={TocarAlarme} />
    </Stack.Navigator>
  </NavigationContainer>
};
