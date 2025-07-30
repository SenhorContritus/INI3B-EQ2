import React, { useEffect, useState } from "react";
import Alarm from "../Classes/Alarm";
import { View, Text, Pressable } from "react-native";
import { styles } from "../Stylesheets/Components/alarmComponentStyle"; 
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import AlarmProps from "../Classes/AlarmProps";

type AlarmProp = {
    id: number,
    data: Alarm,
    x: number | 10,
    y: number | 10,
    handleDeletePress: any,
    handleEditPress:any
}




export default function CompAlarm(props: AlarmProp){

    const [distance,setDistance] = useState("")
    const [time, setTime] = useState("")

    const calcDistMatrix = async () => {
        try{
            const response = await fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${props.x},${props.y}&destinations=${props.data.coords.x},${props.data.coords.y}&key=${process.env.EXPO_PUBLIC_DISTANCEMATRIX_API_KEY}`)
            if(!response.ok){
                throw new Error("[API FETCH]: ERROR")
            }else{
                const body = await response.json()
                if(body == ""){
                    throw new Error("[API RESPONSE]: EMPTY RESPONSE")
                }
                else{
                    const values =  [body.rows[0] , body.rows[0]]
                    setDistance(values[0])
                    setTime(values[1])
                    return console.log(body.rows[0].elements[0]);
                }
                
            }

        }catch(e){
            return window.alert(e)
        }
    }


    useEffect(()=>{
        calcDistMatrix()
    }, [props.x])
    return(
        <View style={styles.container}>
            
            <MapView 
            style={styles.mapView}
            region={{
                latitude: Number(props.data.coords.x),
                longitude:Number(props.data.coords.y),
                latitudeDelta: 0.09,
                longitudeDelta: 0.09
            }}
            
            camera={{
              center:{
                latitude: Number(props.data.coords.x),
                longitude:Number(props.data.coords.y)
              },
              zoom: 15,
              heading: 10,
              altitude: 1000,
              pitch: 0
              
            }}
            showsCompass={false}
            showsUserLocation={true}
            followsUserLocation={true}
            showsBuildings={false}
            zoomControlEnabled={false}
            zoomEnabled={false}
            showsMyLocationButton={false}
            mapType={"standard"}
            scrollEnabled={false}
            
          >
            <Marker
                coordinate={{
                    latitude: Number(props.data.coords.x),
                    longitude:Number(props.data.coords.y)
                }}
            />
          </MapView>
            <View style={styles.infoView}>
                <Text style={styles.titleText}>
                    {props.data.name}
                </Text>
                <Text style={styles.infoText}>
                    Aprox: 
                </Text>
                <Text style={styles.infoText}>{`
                    ${distance}\n
                    ${time}
                `}
                </Text>
            </View>
            <View style={styles.optionsView}>
                <Pressable onPress={() => props.handleEditPress(props.data)} style={styles.btEdit}>
                    <Text style={styles.btText}>
                        Editar
                    </Text>
                </Pressable>
                <Pressable onPress={() => props.handleDeletePress(props.id)} style={styles.btDelete}>
                    <Text style={styles.btText}>
                        X
                    </Text>
                </Pressable>
            </View>
        </View>
    );

}