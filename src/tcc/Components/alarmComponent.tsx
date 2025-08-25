import React, { useEffect, useState } from "react";
import Alarm from "../Classes/Alarm";
import { View, Text, Pressable, Image } from "react-native";
import { styles } from "../Stylesheets/Components/alarmComponentStyle"; 
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import AlarmProps from "../Classes/AlarmProps";

type AlarmProp = {
    id: number,
    data: Alarm,
    x: number,
    y: number,
    location: any,
    handleDeletePress: any,
    handleEditPress:any,
    handleActivePress: any,
    navigation: any
}




export default function CompAlarm(props: AlarmProp){

    const nav = props.navigation

    const [locInfo, setLocInfo] = useState<{duration: string, distance: string}>()
    const verifyAlarm = () => {
        if(Number(locInfo?.distance) <= 0.2){
            nav.navigate("TocarAlarme", {Alarm: props.data, Id: props.id})
        }
    }

    const calcDistMatrix = async () => {
        verifyAlarm()
        try{
            const response = await fetch(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${props.y},${props.x};${props.data.coords.y},${props.data.coords.x}?annotations=duration%2Cdistance&access_token=${process.env.EXPO_PUBLIC_MAPBOX_APIKEY}`)
            if(!response.ok){
                throw new Error("[API FETCH]:" + response)
            }else{
                const body = await response.json()
                if(body == " "){
                    throw new Error("[API RESPONSE]: EMPTY RESPONSE")
                }
                else{
                    const distance = (body.distances[0][1]/1000).toFixed(1)
                    const duration = (body.durations[0][1]/60).toFixed(0)
                    console.log("puxou")
                    return setLocInfo({duration: duration, distance: distance})
                }
            }

        }catch(e){
            return console.warn(e)
        }
    }


    useEffect(()=>{
            if(props.data.alarmProps?.active){
                calcDistMatrix()
            }
        
    },[props.x])
    return(
        <View style={styles.container}>
            <Image 
                style={styles.mapView}
                src={`https://api.mapbox.com/styles/v1/staticmap?center=${props.data.coords.x}, ${props.data.coords.y}&zoom=15&size=200x200&maptype=roadmap&markers=color:red%7Clabel:.%7C${props.data.coords.x}, ${props.data.coords.y}&size:small&scale:1&key=${process.env.EXPO_PUBLIC_GOOGLE_APIKEY}`}
            
            />
            
            <View style={styles.infoView}>
                <Text style={styles.titleText}>
                    {props.data.name}
                </Text>
                <Text style={styles.infoText}>
                    Aprox: 
                </Text>
                <Text style={styles.infoText}>{props.data.alarmProps?.active?`${locInfo?.distance}km\n${locInfo?.duration}min`: `inativo`}
                </Text>
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.activeView}>
                    <Pressable 
                    style={[
                        styles.activeButton,
                        props.data.alarmProps?.active?
                        {backgroundColor:"gray"}:{backgroundColor:"black"}
                        ]}
                    onPress={() => props.handleActivePress(props.data , !props.data.alarmProps?.active)}
                    />
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
        </View>
    );

}