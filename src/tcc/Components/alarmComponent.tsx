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
    useEffect(() => {
        console.log(dataProps.daysActive)
    },[])
    
    const calcDistMatrix = async () => {
        
        try{
            const response = await fetch(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${props.y},${props.x};${props.data.longitude},${props.data.latitude}?annotations=duration%2Cdistance&access_token=${process.env.EXPO_PUBLIC_MAPBOX_APIKEY}`)
            if(!response.ok){
                throw new Error("[MATRIX FETCH]:" + response.json())
            }else{
                const body = await response.json()
                if(body == " "){
                    throw new Error("[MATRIX RESPONSE]: EMPTY RESPONSE")
                }
                else{
                    const distance = (body.distances[0][1]/1000).toFixed(1)
                    const duration = (body.durations[0][1]/60).toFixed(0)
                    setLocInfo({duration: duration, distance: distance})
                }
                verifyAlarm()
            }

        }catch(e){
            return console.warn(e)
    ""    }
    }
    useEffect(() => {
        console.log(dataProps)
        console.log(props.data)
    },[])

    useEffect(()=>{
            if(dataProps.active){
                calcDistMatrix()
            }
        
    },[props.x])
    return(
        <View style={styles.container}>
            <Image 
                style={styles.mapView}
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.data.latitude}, ${props.data.longitude}&zoom=15&size=200x200&maptype=roadmap&markers=color:red%7Clabel:.%7C${props.data.latitude}, ${props.data.longitude}&size:small&scale:1&key=AIzaSyD1r_FHCfK3hcsFg33ZH--QdIXeY6Pviqo`}
            
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