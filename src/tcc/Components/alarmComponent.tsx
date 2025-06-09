import React from "react";
import Alarm from "../Classes/Alarm";
import { View, Text, Pressable } from "react-native";
import { styles } from "../Stylesheets/Components/alarmComponentStyle"; 
import { Colors } from "react-native/Libraries/NewAppScreen";
import MapView from "react-native-maps";

type AlarmProp = {
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
                        latitudeDelta: 0.98,
                        longitudeDelta: 0.09
                    }}
                />
            </View>
            <View style={styles.infoView}>
                <Text style={styles.titleText}>
                    {props.data.name}
                </Text>
                <Text style={styles.infoText}>
                    Aprox: 
                </Text>
                <Text style={styles.infoText}>{`X:${props.data.address.x}\nY:${props.data.address.y}
                `}
                </Text>
            </View>
            <View style={styles.optionsView}>
                <Pressable style={styles.btEdit}>
                    <Text style={styles.btText}>
                        Editar
                    </Text>
                </Pressable>
                <Pressable style={styles.btDelete}>
                    <Text style={styles.btText}>
                        X
                    </Text>
                </Pressable>
            </View>
        </View>
    );

}