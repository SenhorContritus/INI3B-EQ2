import React = require("react");
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import * as Location from "expo-location";
import { useWindowDimensions } from "react-native";

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

export default function Main() {
  const { width: windowWidth } = useWindowDimensions();
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<string>("");

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Pega a localização
  useEffect(() => {
    async function getGeoPermission() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        const loc = await Location.getCurrentPositionAsync();
        setLocation(loc);
      }
    }
    getGeoPermission();
  }, []);

  // Pega o clima quando a localização estiver disponível
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

  // Monta a string do cabeçalho
  const weekday = WEEKDAYS[time.getDay()];
  const day = String(time.getDate()).padStart(2, "0");
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const emoji = WEATHER_EMOJIS[weather] || "☀️";
  const headerString = `${weekday} - ${emoji} ${day}/${month}`;

  return (
    <View style={styles.body}>
      <View style={[styles.top, { width: windowWidth - 40 }]}>
        <View style={styles.nav}>
          <Pressable style={styles.navPress}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </Pressable>
        </View>
        <View style={styles.clockContainer}>
          <Text style={styles.clockText}>
            {time.toLocaleTimeString()}
          </Text>
          <Text style={styles.headerText}>{headerString}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>
          {location
            ? `Localização: ${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`
            : "Obtendo localização..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    margin: 20,
    height: "40%",
    backgroundColor: "#0050B3",
  },
  body: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  headerText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  nav: {
    backgroundColor: "#0000000",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    padding: 10,
    alignItems: "center",
    height: 60,
  },
  navPress: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  clockContainer: {
    margin: 20,
    alignItems: "center",
  },
  clockText: {
    fontFamily: "Lexend",
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  settingsIcon: {
    fontSize: 30,
    color: "#0059E6",
  },
  content: {
    flex: 1,
    backgroundColor: "#0024147",
    alignItems: "center",
    justifyContent: "center",
  },
  contentText: {
    color: "#fff",
    fontSize: 18,
  },
});