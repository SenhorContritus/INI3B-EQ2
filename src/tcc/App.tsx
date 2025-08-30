import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main} from "./Pages/Main";
import ConfigPessoal from "./Pages/ConfigPessoal";
import TocarAlarme from "./Pages/TocarAlarme";
import {ConfigurarAlarme} from "./Pages/ConfigurarAlarme";
import Alarm from "./Classes/Alarm";


const Stack = createNativeStackNavigator();


export default function App(){

  return <NavigationContainer>
    
      
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="Main"
        component={Main} 
        initialParams={{
          alarm: undefined,
          edit: false,
        }}/>
      <Stack.Screen name="ConfigPessoal" component={ConfigPessoal} />
      <Stack.Screen
        name="ConfigurarAlarme" 
        component={ConfigurarAlarme}
        initialParams={{
          alarm: undefined,
          alarmProps: undefined,
          listLenght:0,
        }} 
      />
      <Stack.Screen 
      name="TocarAlarme" 
      component={TocarAlarme}
      initialParams={{
        Alarm: undefined,
        Id: undefined
      }}

      />
    </Stack.Navigator>
  </NavigationContainer>
};
