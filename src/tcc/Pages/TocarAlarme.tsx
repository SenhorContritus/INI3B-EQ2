import React = require("react");
import { useEffect, useState } from "react";
import { StyleSheet, View,Text, Pressable } from "react-native";
import * as Location from "expo-location";
//import MapBox from "@rnmapbox/maps";

//MapBox.setAccessToken("sk.eyJ1IjoiZHVhcmRvIiwiYSI6ImNtYXF2a2FwdzA0YmIyam9uMTh3d3g1cGIifQ.-B3MuG5UFdw3Vznwe7ZNuA")


export default function Main(){

  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  async function getGeoPermission(){
  let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        console.log("Permission granted");
        const loc = await Location.getCurrentPositionAsync();
        setLocation(loc);
        return;

      } else {
        console.log("Permission denied");
        return;
      }
  }

  useEffect(() =>{
    getGeoPermission();
  },[])

  return <View style={styles}>
    <View style={styles}>
        <Pressable style={styles}>
            <Text style={[{
                fontSize: 30,
            }]}>⚙️</Text>
        </Pressable>            
    </View>
    <View style={styles}>
        <View>
            
        </View>
        <View>

        </View>
    </View>
    <View>

    </View>
  </View>
};

const styles = StyleSheet.create({



});