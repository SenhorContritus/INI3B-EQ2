import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, Image, Dimensions, Platform, StatusBar, Animated, Button, LogBox } from "react-native";
import Alarm from "../Classes/Alarm";
import _coords from "../types/_coords";
import AlarmProps from "../Classes/AlarmProps";
import {useAudioPlayer} from "expo-audio";
import useAlarm from "../Hooks/useAlarmTable";
import useAlarmProps from "../Hooks/useAlarmPropsTable";

LogBox.ignoreAllLogs()


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const w = (value: number) => (value / 440) * SCREEN_WIDTH;
const h = (value: number) => (value / 957) * SCREEN_HEIGHT;



function AnimatedButton({ style, onPress, children }: any) {
  const scale = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        style={style}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </Pressable>

    </Animated.View>
  );
}

export default function Main({ navigation , route }: any) {
  const [time, setTime] = useState(new Date()); 
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Círculos sempre proporcionais à largura da tela para centralização perfeita
  const grayCircleSize = SCREEN_WIDTH * 1.25;
  const blackCircleSize = SCREEN_WIDTH * 0.95;
  const centerY = SCREEN_HEIGHT / 2;

  const alarm = route.params.Alarm
  const id = route.params.Id
  const alarmProps = route.params.AlarmProps

  

  const audioSource = require("../audio/tripleBaka.m4a")
  const audio = useAudioPlayer(audioSource)
  useEffect(() => {
    audio.seekTo(0)
    audio.play()
  },[])

  return (
    <View style={styles.root}>
      {}
      <View style={{
        position: "absolute",
        width: grayCircleSize,
        height: grayCircleSize,
        borderRadius: grayCircleSize / 2,
        backgroundColor: "#2B2D37",
        left: (SCREEN_WIDTH - grayCircleSize) / 2,
        top: centerY - grayCircleSize / 2,
        zIndex: 0,
        pointerEvents: "none",
      }} />
      {}
      <View style={{
        position: "absolute",
        width: blackCircleSize,
        height: blackCircleSize,
        borderRadius: blackCircleSize / 2,
        backgroundColor: "black",
        left: (SCREEN_WIDTH - blackCircleSize) / 2,
        top: centerY - blackCircleSize / 2,
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {}
      <View style={styles.content}>
        <Text
          style={[
            styles.clockText,
            {
              fontSize: Math.max(w(36), 22),
              marginTop: h(32),
              marginBottom: h(4),
            },
          ]}
        >
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
        <Text
          style={[
            styles.title,
            {
              fontSize: Math.max(w(20), 13),
              marginBottom: h(12),
            },
          ]}
        >
          {alarm.name}
        </Text>
        <View
          style={[
            styles.imageContainer,
            {
              width: "85%",
              aspectRatio: 390 / 299,
              borderRadius: w(16),
              marginBottom: h(20),
              maxWidth: 400,
            },
          ]}
        >
          <Image 
            style={styles.mapView}
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${alarm.latitude}, ${alarm.longitude}&zoom=16&size=300x400&maptype=roadmap&markers=color:red%7Clabel:.%7C${alarm.latitude}, ${alarm.longitude}&size:small&scale:1&key=${process.env.local.GOOGLE_APIKEY}`}          
          />
        </View>
        <AnimatedButton
          style={[
            styles.offButton,
            {
              width: "80%",
              minWidth: 180,
              maxWidth: 350,
              height: h(40),
              borderRadius: w(20),
            },
          ]}
          onPress={() =>{
            audio.pause()
            navigation.popTo("Main")
          }}
        >
          <Text style={[styles.offButtonText, { fontSize: Math.max(w(14), 13) }]}>
            Desligar
          </Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1E1F26",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    zIndex: 2,
  },
  title: {
    color: "white",
    fontFamily: "Inter",
    fontWeight: "900",
    textAlign: "center",
  },
  clockText: {
    color: "white",
    fontFamily: "Lexend",
    fontWeight: "400",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  imageContainer: {
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  snoozeButton: {
    backgroundColor: "#EFE9E9",
    alignItems: "center",
    justifyContent: "center",
  },
  snoozeButtonText: {
    color: "black",
    fontFamily: "Lexend",
    fontWeight: "900",
    textAlign: "center",
  },
  offButton: {
    backgroundColor: "#EFE9E9",
    alignItems: "center",
    justifyContent: "center",
  },
  offButtonText: {
    color: "black",
    fontFamily: "Lexend",
    fontWeight: "900",
    textAlign: "center",
  },
  mapView: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 15
  }
});