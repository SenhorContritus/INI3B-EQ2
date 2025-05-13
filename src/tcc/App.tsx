import React, { useEffect, useState } from "react";
import { StyleSheet, View,Text } from "react-native";
import * as Location from "expo-location";


export default function App(){

  const [location, setLocation] = useState({});

  useEffect(() =>{
    (async() => {
        let{status} = await Location.requestForegroundPermissionsAsync()
        if(status == "granted"){
          console.log("Permission granted");
          const loc = await Location.getCurrentPositionAsync();
          setLocation(loc);
          return;
          
        }else{
          console.log("Permission denied");
          setLocation("deu ruim")
          return;
        }
        
    })
  })

  return <View style={styles.container}>
      <Text>{JSON.stringify(location)}</Text>
  </View>
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});