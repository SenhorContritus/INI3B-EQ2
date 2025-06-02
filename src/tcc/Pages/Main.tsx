import React = require("react");
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
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
  const alarms = [
    {
      id: 1,
      name: "Nome do Alarme",
      location: "Casa - Cti 📍",
      eta: "Aprox 35 min",
      mapImage: "https://maps.googleapis.com/maps/api/staticmap?center=-23.55052,-46.633308&zoom=13&size=200x200&key=SUA_API_KEY",
    },
  ];
  const { width: windowWidth } = useWindowDimensions();
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<string>("");

  // Responsividade para fontes e botões
  const baseFont = Math.max(15, Math.round(windowWidth * 0.03));
  const buttonFont = Math.max(15, Math.round(windowWidth * 0.035));
  const settingsIconSize = Math.max(24, Math.round(windowWidth * 0.05));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
  const headerString = `${weekday} - ${emoji} ${day}/${month}`;

  return (
    <View style={styles.body}>
      <View style={[styles.top, { width: windowWidth - 40 }]}>
        <View style={styles.clockMapRow}>
          <View style={styles.mapColumn}>
            <View style={styles.fakeMap}>
              <Text style={{ color: "#fff" }}>MAPA</Text>
            </View>
          </View>
          <View style={styles.clockColumn}>
            <Pressable style={styles.navPress}>
              <Text style={[styles.settingsIcon, { fontSize: settingsIconSize }]}>⚙️</Text>
            </Pressable>
            <Text style={[styles.clockText, { fontSize: baseFont + 30 }]}>
              {time.toLocaleTimeString()}
            </Text>
            <Text style={[styles.headerText, { fontSize: baseFont + 7 }]}>{headerString}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {alarms.map((alarm) => (
          <View key={alarm.id} style={styles.alarmCard}>
            <Image
              source={{ uri: alarm.mapImage }}
              style={styles.alarmMapImg}
              resizeMode="cover"
            />
            <View style={styles.alarmInfo}>
              <Text style={[styles.alarmName, { fontSize: baseFont + 3 }]}>{alarm.name}</Text>
              <Text style={[styles.alarmLocation, { fontSize: baseFont }]}>{alarm.location}</Text>
              <Text style={[styles.alarmEta, { fontSize: baseFont - 1 }]}>{alarm.eta}</Text>
              <View style={styles.alarmButtons}>
                <Pressable style={styles.editButton}>
                  <Text style={[styles.buttonText, { fontSize: buttonFont }]}>Editar</Text>
                </Pressable>
                <Pressable style={styles.deleteButton}>
                  <Text style={[styles.buttonText, { fontSize: buttonFont }]}>X</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    margin: 20,
    height: "40%",
    borderRadius: 10,
    backgroundColor: "#2B2323",
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
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
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
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  contentText: {
    color: "#fff",
    fontSize: 18,
  },
  clockMapRow: {
    flexDirection: "row",
    width: "100%",
    height: 200,
  },
  clockColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mapColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fakeMap: {
    width: "90%",
    height: 150,
    backgroundColor: "#333",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  alarmCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2B2323",
    borderRadius: 16,
    width: "95%",
    minHeight: 90,
    marginBottom: 18,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alarmMapImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#444",
  },
  alarmInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  },
  alarmName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  alarmLocation: {
    color: "#ccc",
    fontSize: 15,
    marginTop: 2,
  },
  alarmEta: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 2,
    marginBottom: 8,
  },
  alarmButtons: {
    flexDirection: "row",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  editButton: {
    backgroundColor: "#5A4F4F",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#5A4F4F",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});