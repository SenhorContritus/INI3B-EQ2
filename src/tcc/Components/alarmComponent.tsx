import React from "react";
import Alarm from "../Classes/Alarm";
import { View, Text, Pressable } from "react-native";
import { styles } from "../Stylesheets/Components/alarmComponentStyle"; 
import { Colors } from "react-native/Libraries/NewAppScreen";

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
                Latitude:{props.data.address.x}\n
                Longitude:{props.data.address.y}\n
                x: {props.x}\n
                y: {props.y}\n
            </View>
            <View style={styles.infoView}>
                <Text>
                </Text>
                <Text>
                    Aprox: 
                </Text>
                <Text>
                    Latitude:{props.data.address.x}
                    Longitude:{props.data.address.y}
                </Text>
            </View>
            <View style={styles.optionsView}>
                <Pressable>
                    <Text>
                        Editar
                    </Text>
                </Pressable>
                <Pressable>
                    <Text>
                        X
                    </Text>
                </Pressable>
            </View>
        </View>
    );

}