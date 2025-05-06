import React, { useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Text, Button } from "react-native";
import Alarm from "../Classes/Alarm";
import Geolocation from "react-native-geolocation-service"

const requestLocalPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title:"Geolocation Permission",
                message:"E aquela localização pae? Vamo botando ela pra jogo ai",
                buttonNeutral: "Vo ve e te aviso",
                buttonPositive: "pode pa",
                buttonNegative: "to não"
            },
        );
        console.log("granted", granted)
        if(granted === 'granted'){
            console.log("Pode ta usano a loc ai");
            return true;
        }else{
            console.log("Va toma um banho e dormir nego, que tu perdeu nas brincadeira");
            return false;
        }
    } catch (error) {
        return false;
    }
}


export default function Main({navigation}){

    const [location, setLocation] = useState();

    const getLocation = () => {
        const result = requestLocalPermission();
        result.then(res => {
            console.log("res is:", res)
            if(res){
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);
                        setLocation(true);
                    },
                    error => {
                        console.log(error.code, error.message);
                        setLocation(false);
                    },
                    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
                )
            }
        });
        console.log(location);
    }


    return <View style={styles.container}>
    <Text>Welcome!</Text>
    <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation} />
    </View>
    <Text>Latitude: {location ? location.coords.latitude : null}</Text>
    <Text>Longitude: {location ? location.coords.longitude : null}</Text>
    <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Send Location" />
    </View>
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
export default App;