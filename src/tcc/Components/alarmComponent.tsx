import React from "react";
import Alarm from "../Classes/Alarm";
import { View, Text, Pressable } from "react-native";
import { styles } from "../Stylesheets/Components/alarmComponentStyle"; 
import MapView from "react-native-maps";

type AlarmProp = {
    id: number,
    data: Alarm,
    x?: number,
    y?: number,
    handleDeletePress: any,
    handleEditPress:any
}

export default function CompAlarm(props: AlarmProp){
    return(
        <View style={styles.container}>
            <View style={styles.mapView}>
                <MapView 
                    initialRegion={{
                        latitude: props.x? props.x: 0,
                        longitude: props.y? props.y : 0,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.09
                    }}
                    showsUserLocation={true}
                />
            </View>
            <View style={styles.infoView}>
                <Text style={styles.titleText}>
                    {props.data.name}
                </Text>
                <Text style={styles.infoText}>
                    Aprox: 
                </Text>
                <Text style={styles.infoText}>{`X:${props.data.coords.x}\nY:${props.data.coords.y}
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