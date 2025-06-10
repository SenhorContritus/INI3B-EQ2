import React = require("react");
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, Image, Button } from "react-native";
import * as Location from "expo-location";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useWindowDimensions } from "react-native";
import { useFonts } from 'expo-font';
import MapView from "react-native-maps";
import * as SQLite from "expo-sqlite"
import Alarm from "../Classes/Alarm";
import CompAlarm from "../Components/alarmComponent";



const WEEKDAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const WEATHER_EMOJIS: { [key: string]: string } = {
  Thunderstorm: "⛈️",
  Drizzle: "🌦️",
  Rain: "🌧️",
  Snow: "❄️",
  Clear: "☀️",
  Clouds: "☁️",
  Mist: "🌫️",
  Smoke: "🌫️",
  Haze: "🌫️",
  Dust: "🌫️",
  Fog: "🌫️",
  Sand: "🌫️",
  Ash: "🌫️",
  Squall: "💨",
  Tornado: "🌪️",
};

export const Main = ({ route , navigation}) => {

  // Tipando a navegação
  
  const [loaded, error] = useFonts({
    Lexend: require("../assets/fonts/Lexend.ttf")
  })


  
  
  const { width: windowWidth } = useWindowDimensions();
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<string>("");
  const [alarms, setAlarm] = useState<Alarm[]>([])

  // Responsividade para fontes e botões
  const baseFont = Math.max(15, Math.round(windowWidth * 0.03));
  const buttonFont = Math.max(15, Math.round(windowWidth * 0.035));
  const settingsIconSize = Math.max(24, Math.round(windowWidth * 0.05));

  async function getGeoPermission() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        const loc = await Location.getCurrentPositionAsync();
        setLocation(loc);
      }
  }

  const verifyNewAlarm = () =>{
    if(route.params?.alarm && route.params.edit == false ){
      return setAlarm([...alarms, route.params.alarm])
    }
    //caso o parâmetro edit for true ele substitui o alarme selecionado pelo enviado pela tela configurarAlarme
    if(route.params?.alarm && route.params?.edit == true){
      console.log(route.params.alarm.id)
      return setAlarm(alarms.splice(((route.params.alarm.id) - 1), 1, route.params.alarm))
    }
  }

  useEffect(() =>{
    verifyNewAlarm()
  },[route.params?.alarm])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getGeoPermission();
  },[]);


  useEffect(() => {
    async function fetchWeather() {
      if (location) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&current_weather=true`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const weatherCode = data.current_weather?.weathercode ?? 0;
          const WEATHER_CODES: { [key: number]: string } = {
            0: "Clear",
            1: "Mainly Clear",
            2: "Partly Cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Depositing rime fog",
            51: "Drizzle",
            61: "Rain",
            71: "Snow",
            80: "Rain showers",
            95: "Thunderstorm",
          };
          setWeather(WEATHER_CODES[weatherCode] || "Clear");
        } catch (e) {
          setWeather("Clear");
        }
      }
    }
    fetchWeather();
  }, [location]);



  const weekday = WEEKDAYS[time.getDay()];
  const day = String(time.getDate()).padStart(2, "0");
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const emoji = WEATHER_EMOJIS[weather] || "☀️";
  const weatherString = `${weekday} - ${emoji}`;
  const dayString = `${day}/${month}`;

  const modifyAlarm = (data: Alarm) => {
    return navigation.navigate("ConfigurarAlarme", {alarm: data})
  }

  const deleteAlarm = (id:number) =>{
    const newList = alarms.filter(a => a.id != id)
    return setAlarm(newList)
  }

  const showAlarm = () => {
    const data = alarms.map(a => <CompAlarm id={a.id} data={a} x={location?.coords.latitude} y={location?.coords.longitude} handleDeletePress={deleteAlarm} handleEditPress={modifyAlarm} />)
    return data
  }


  return (
    <View style={styles.body}>
      <View style={styles.nav}>
        <Pressable
            onPress={() => navigation.navigate("ConfigPessoal")}
          >
            <Text style={[styles.settingsIcon, { fontSize: settingsIconSize }]}>⚙️</Text>
        </Pressable>
      </View>
      <View style={[styles.header]}>
        <View style={styles.mapView}>
          <MapView 
            style={styles.fakeMap}
            initialRegion={{
              
              latitude: 22,
              longitude: 22,
              latitudeDelta: 0.9,
              longitudeDelta: 0.9
            }}
            showsUserLocation={true}
          />
        </View>
        <View style={styles.clockView}>
          <Text style={[styles.clockText, { fontSize: baseFont + 30 }]}>
            {time.toLocaleTimeString([], {timeStyle: 'short'})}
          </Text>
          <Text style={[styles.weatherText, { fontSize: baseFont + 3 }]}>{weatherString}</Text>
          <Text style={[styles.dayText, { fontSize: baseFont + 3 }]}>{dayString}</Text>
        </View>
      </View>
      <View style={styles.alarmsContainer}>
        {showAlarm()}
      </View>
      <View style={styles.buttonNewView}>
        <Pressable style={styles.buttonNewPress} onPress={() => navigation.navigate("ConfigurarAlarme",{alarm: undefined, listLenght: alarms.length + 1})}>
          <Text style={styles.buttonNewText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#000000",
    alignItems: 'center',
    height: '100%'
  },
  nav: {
    flex:0.05,
    flexDirection: "row",
    width: "90%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  header: {
    flex: 0.30 ,
    flexDirection: 'row',
    width: '90%',
  },
  mapView: {
    flex: 0.66,
    justifyContent: "center",
    alignItems: "center",
    marginRight: '4%',
   
  },
  fakeMap: {
    flex:0.74,
    width: "100%",
    borderRadius: 10
  },
  clockView: {
    flex: 0.38,
    justifyContent: "center",
    alignItems: "center",

  },
  weatherText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "200",
    textAlign: "center"
  },
  
  clockText: {
    fontFamily: "Lexend",
    fontSize: 48,
    fontWeight: "200",
    color: "#fff",
    textAlign: 'center'
  },
  dayText:{
    fontFamily: "Lexend",
    fontSize: 48,
    fontWeight: "200",
    color: "#fff",
    textAlign: 'center'
  },
  settingsIcon: {
    fontSize: 30,
    color: "#0059E6",
  },
  
  
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  alarmsContainer:{
    flex: 0.52,
    flexDirection: "column",
    width: "90%",
  },
  buttonNewView:{
    flex: 0.10,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "90%",
  },
  buttonNewPress:{
    flex: 0.20,
    backgroundColor:"#010127",
    justifyContent: "center",
    alignItems: "center",
    height: "81%",
    borderRadius:200,
  },
  buttonNewText:{
    flex: 1,
    fontFamily: "Lexend",
    fontSize: 50,
    fontWeight: "300",
    color: "#fff",
    textAlign: "center",
    width: "100%",
    height: "100%",
  }
});
/*codigo do app tsx caso de erro dnv
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from "./Pages/Main";
import ConfigPessoal from "./Pages/ConfigPessoal";
import ConfigurarAlarme from "./Pages/ConfigurarAlarme";
import TocarAlarme from "./Pages/TocarAlarme";


const Stack = createNativeStackNavigator();


export default function App(){
  return <NavigationContainer>
    
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Main" component={Main}/>
      <Stack.Screen name="ConfigPessoal" component={ConfigPessoal} />
      <Stack.Screen name="ConfigurarAlarme" component={ConfigurarAlarme} />
      <Stack.Screen name="TocarAlarme" component={TocarAlarme} />
    </Stack.Navigator>
  </NavigationContainer>
};

*/ 