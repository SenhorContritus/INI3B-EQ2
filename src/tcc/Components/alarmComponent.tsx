import React, { useEffect, useState } from "react";
import Alarm from "../Classes/Alarm";
import { View, Text, Pressable, Image } from "react-native";
import { styles } from "../Stylesheets/Components/alarmComponentStyle"; 
import useAlarmeProps from "../Hooks/useAlarmPropsTable";



type AlarmProp = {
    id: number,
    data: any,
    dataProps: any
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
    const dataProps = props.dataProps
    const [locInfo, setLocInfo] = useState<{duration: string, distance: string}>()
    const verifyAlarm = () => {
        if(Number(locInfo?.distance) <= 0.2){
            nav.navigate("TocarAlarme", {Alarm: props.data, Id: props.id})
        }
    }
    const calcDistMatrix = async () => {
        
        try{
            const response = await fetch(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${props.y},${props.x};${props.data.longitude},${props.data.latitude}?annotations=duration%2Cdistance&access_token=${process.env.EXPO_PUBLIC_MAPBOX_APIKEY}`)
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
                    setLocInfo({duration: duration, distance: distance})
                    return verifyAlarm()
                }
            }

        }catch(e){
            return console.warn(e)
        }
    }


    useEffect(()=>{
            if(dataProps.active){
                calcDistMatrix()
            }
        
    },[props.x])
    return(
        <View style={styles.container}>
            <Image 
                style={styles.mapView}
                src={`https://api.mapbox.com/styles/v1/staticmap?center=${props.data.longitude}, ${props.data.latitude}&zoom=15&size=200x200&maptype=roadmap&markers=color:red%7Clabel:.%7C${props.data.longitude}, ${props.data.latitude}&size:small&scale:1&key=${process.env.EXPO_PUBLIC_GOOGLE_APIKEY}`}
            
            />
            
            <View style={styles.infoView}>
                <Text style={styles.titleText}>
                    {props.data.name}
                </Text>
                <Text style={styles.infoText}>
                    Aprox: 
                </Text>
                <Text style={styles.infoText}>{dataProps.active?`${locInfo?.distance}km\n${locInfo?.duration}min`: `inativo`}
                </Text>
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.activeView}>
                    <Pressable 
                    style={[
                        styles.activeButton,
                        dataProps.active?
                        {backgroundColor:"gray"}:{backgroundColor:"black"}
                        ]}
                    onPress={() => props.handleActivePress(dataProps , !dataProps.active)}
                    />
                </View>
                <View style={styles.optionsView}>
                    <Pressable onPress={() => props.handleEditPress(props.data, dataProps)} style={styles.btEdit}>
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