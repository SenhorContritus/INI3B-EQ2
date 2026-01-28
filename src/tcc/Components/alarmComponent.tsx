import React, { useEffect, useState } from "react";
import Alarm from "../Classes/Alarm";
import { View, Text, Pressable, Image, Switch } from "react-native";
import { styles } from "../Stylesheets/Components/alarmComponentStyle"; 
import useAlarmeProps from "../Hooks/useAlarmPropsTable";



type AlarmProp = {
    id: number,
    data: any,
    dataProps: any,
    x: number,
    y: number,
    speed: any,
    location: any,
    handleDeletePress: any,
    handleEditPress:any,
    handleActivePress: any,
    navigation: any,
    alarmHook: any,
    propsHook: any
}



export default function CompAlarm(props: AlarmProp ){

    const nav = props.navigation
    const dataProps = props.dataProps
    const [locInfo, setLocInfo] = useState<{duration: string, distance: string}>()

    useEffect(() => {
        console.log(dataProps.daysActive)
    },[])

    const disableAlarm = (alarm: any, alarmProps:any) =>{
        if(alarmProps && alarm){
          props.alarmHook(
            alarm.id,
            alarm.name,
            alarm.latitude,
            alarm.longitude,
            alarm.address
          )
          props.propsHook(
            alarm.id,
            false,
            alarmProps.startRadius,
            alarmProps.daysActive,
            alarmProps.sound,
            alarmProps.soundUrl,
            alarmProps.vibration,
            alarmProps.vibrationType,
            alarmProps.prostpone,
            alarmProps.prostponeProps, 
            alarmProps.volume,
          )
        }
      
      }

    const verifyAlarm = () => {
        if(Number(locInfo?.distance) <= (dataProps.startRadius/1000)){
            disableAlarm(props.data, dataProps)
            nav.navigate("TocarAlarme", {Alarm: props.data, Id: props.id, AlarmProps: dataProps})
        }
    }
    
    const calcDistanceTP = () => {
        const {sin , sqrt, cos, atan2, PI} = Math
        setTimeout( () => {
            const coordsRad = {
                x1: props.x * PI / 180,
                y1: props.y * PI / 180, 
                x2: props.data.latitude * PI / 180, 
                y2: props.data.longitude * PI / 180
            }
            const R = 6371
            const distX = coordsRad.x1 - coordsRad.x2
            const distY = coordsRad.y1 - coordsRad.y2
            const a = sin(distX/2) * sin(distX/2) 
                    + cos(coordsRad.x1) * cos(coordsRad.x2) 
                    * sin(distY/2) * sin(distY/2)
            const c = 2* atan2(sqrt(a), sqrt(1 - a))
            const distance = R * c
            setLocInfo({distance : distance.toFixed(2) , duration : props.speed })
            return verifyAlarm()
        }, 500);

    }
    
    
    useEffect(() => {
        console.log(dataProps)
        console.log(props.data)
    },[])

    useEffect(()=>{
            if(dataProps.active){
                calcDistanceTP()
            }
        
    },[props.x])
    return(
        <View style={styles.container}>
            <Image 
                style={styles.mapView}
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.data.latitude}, ${props.data.longitude}&zoom=17&size=200x200&maptype=roadmap&markers=color:red%7Clabel:.%7C${props.data.latitude}, ${props.data.longitude}&size:small&scale:1&key=${process.env.EXPO_PUBLIC_GOOGLE_APIKEY}`}
            
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
                    <Switch
                    value={Boolean(dataProps.active)}
                    onValueChange={() => props.handleActivePress(props.data, dataProps , !dataProps.active)}
                    thumbColor={'#1E1F26'}
                    trackColor={{false:'#FFFFFF' , true: '#FFFFFF'}}
                    />
                </View>
                <View style={styles.optionsView}>
                    <Pressable onPress={async() => await props.handleEditPress(props.data, dataProps)} style={styles.btEdit}>
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