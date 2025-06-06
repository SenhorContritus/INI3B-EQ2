import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 0.3,
        flexDirection:"row",
        borderRadius: 20,
        backgroundColor:"#010127"
    },
    mapView:{
        flex: 0.25,
        backgroundColor: "gray"
    },
    infoView:{
        flex: 0.60
    },
    titleText:{
        color: "white"
    },
    infoText:{
        color: "gray"
    },
    optionsView:{   
        flex: 0.15
    }
})