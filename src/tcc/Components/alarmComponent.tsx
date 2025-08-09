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
    navigation: any
}




export default function CompAlarm(props: AlarmProp){

    const [distance,setDistance] = useState("")
    const [time, setTime] = useState("")
    const verifyAlarm = () => {
        console.log(distance.split(" ")[0])
    }

    const calcDistMatrix = async () => {
        try{
            const response = await fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${props.x},${props.y}&destinations=${props.data.coords.x},${props.data.coords.y}&key=${process.env.EXPO_PUBLIC_DISTANCEMATRIX_API_KEY}`)
            if(!response.ok){
                throw new Error("[API FETCH]: ERROR")
            }else{
                const body = await response.json()
                if(body == " "){
                    throw new Error("[API RESPONSE]: EMPTY RESPONSE")
                }
                else{
                    const values =  await [body.rows[0].elements[0].distance.text ,body.rows[0].elements[0].duration.text]
                    setDistance(values[0])
                    setTime(values[1])
                    return console.log(values)
                }
            }

        }catch(e){
            return window.alert(e)
        }
    }


    useEffect(()=>{
        calcDistMatrix()
    },[])
    return(
        <View style={styles.container}>
            
            <Image 
                style={styles.mapView}
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.data.coords.x}, ${props.data.coords.y}&zoom=15&size=200x200&maptype=roadmap&markers=color:red%7Clabel:.%7C${props.data.coords.x}, ${props.data.coords.y}&size:small&scale:1&key=AIzaSyD1r_FHCfK3hcsFg33ZH--QdIXeY6Pviqo`}
            />
            
            <View style={styles.infoView}>
                <Text style={styles.titleText}>
                    {props.data.name}
                </Text>
                <Text style={styles.infoText}>
                    Aprox: 
                </Text>
                <Text style={styles.infoText}>{`${distance}\n${time}`}
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