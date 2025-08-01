import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 0.3,
        flexDirection:"row",
        borderRadius: 20,
        backgroundColor:"#010127",
        padding: 10
    },
    mapView:{
        flex: 0.35,
        borderRadius: 20
    },
    infoView:{
        flex: 0.35,
        paddingHorizontal: 10
    },
    titleText:{
        color: "white",
        fontFamily:"Lexend",
        fontSize: 20,
    },
    infoText:{
        color: "gray",
        
    },
    optionsView:{   
        flex: 0.30,
        flexDirection:"row",
        alignItems: "flex-end"
    },
    btEdit:{
        flex: 0.6,
        backgroundColor: "white",
        borderRadius: 20,
        height: 30,
        textAlign:"center",
        alignItems:"center",
        justifyContent: "center",
        marginRight: 2

    },
    btDelete:{
        flex: 0.3,
        backgroundColor: "white",
        borderRadius: 20,
        textAlign:"center",
        alignItems:"center",
        justifyContent: "center",
        height: 30,
        marginLeft: 2
    },
    btText:{
        fontFamily: "Lexand",
        fontWeight:"bold",
        fontSize: 15
    }
})