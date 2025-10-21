import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Switch, Pressable, Image, LogBox } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Alarm from "../Classes/Alarm";
import * as SQLite from "expo-sqlite"
import AlarmProps from "../Classes/AlarmProps";
import _coords from "../types/_coords";

const db = SQLite.openDatabaseSync("AlarmsDatabase.sqlite")

const dias = ["D", "S", "T", "Q", "Q", "S", "S"];

export const ConfigurarAlarme = ({route, navigation} : any) => {

  useEffect(() => {
      LogBox.ignoreAllLogs()
    },[])
  const props = route.params
  const [Alarme, setAlarme] = useState<any>();  
  const [nome, setNome] = useState("");
  const [ativo, setAtivo] = useState(true)
  const [diasSelecionados, setDiasSelecionados] = useState([false, false, false, false, false, false, false]);
  const [diasSelecionadosStr, setDiasSelecionadosStr] = useState("false,false,false,false,false,false,false")
  const [somAtivo, setSomAtivo] = useState(true);
  const [soundUrl, setSoundUrl] = useState("../audio/tripleBaka.m4a")
  const [vibracaoAtiva, setVibracaoAtiva] = useState(true);
  const [adiarAtivo, setAdiarAtivo] = useState(true);
  const [coords, setCoords] = useState<_coords>({x:0 , y:0})
  const [address, setAddress] = useState("")
  
  // Exemplo de data fixa
  const data = "13 de fevereiro de 2025";

  const findLocation = async () => {
    try {
      const find = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=${process.env.EXPO_PUBLIC_MAPBOX_APIKEY}`)
      if(!find.ok){
        throw new Error("[GEOCODE FETCH]:" + find.json() );
        
      }else{
        const response = await find.json()
        if(response != ''){
          const latlong:_coords = {x:response.features[0].properties.coordinates.latitude, y:response.features[0].properties.coordinates.longitude}
          return setCoords(latlong)
        }
        else{
         throw new Error("[GEOCODE RESPONSE]:EMPTY RESPONSE");
        }
        
      }
      
    } catch (error) {
      console.log(error)
      return window.alert(error)
    }

    
  }


  function toggleDia(index: number) {
    const novosDias = [...diasSelecionados]; //spread operator para criar uma cópia do array
    novosDias[index] = !novosDias[index];
    const listaStr = novosDias.map(bool => bool.toString())
    setDiasSelecionadosStr(listaStr.toString())
    setDiasSelecionados(novosDias);
  }
  //é chamado quando nenhum alarme foi enviado por parâmetro 
  const createAlarm = () => {
    console.log("Create")
    findLocation()
    const id = route.params.listLenght
    let nomeIf = nome
    if(nomeIf === ""){
      nomeIf = "Alarm " + id
    }
    return navigation.popTo("Main", {alarm: new Alarm(id, nomeIf, {x: coords.x ,y: coords.y}, address,new AlarmProps( id, ativo,diasSelecionadosStr, somAtivo, soundUrl,vibracaoAtiva,"a ",adiarAtivo,{times: 0, timeWait:0 }, 10 )), edit:false})
  }
  // é chamado quando a tela main manda um alarme como parametro
  const saveAlarm = () => {
    console.log("save")
    findLocation()
    if(Alarme){
      let nomeIf = nome
      if(nomeIf === ""){
        nomeIf = "Alarm " + Alarme?.id
      }
      return navigation.popTo("Main", {alarm: new Alarm(Alarme?.id, nomeIf, {x: coords.x ,y: coords.y}, address,new AlarmProps(Alarme?.id, ativo,diasSelecionadosStr,somAtivo, soundUrl,vibracaoAtiva,"a",adiarAtivo,{times: 0, timeWait:0 }, 10 )), edit: true})
    }
  }
  //verifica se foi passado algum alarme como parâmetro e caso o tenha, modifica os valores apresentados
  useEffect(() => {
    if(props.alarm && props.alarmProps != undefined){
      const alarme = props?.alarm
      const alarmProps = props?.alarmProps
      const listaDiasStr = alarmProps.daysActive.split(",")
      const listaDias = listaDiasStr.map((a: any) => {
        if(a == "false"){
          return false
        }else{
          return true
        }
      })
      console.log(listaDias)
      setAlarme(props?.alarm)
      setNome(alarme.name)
      setAddress(alarme.address)
      setCoords({x: alarme.latitude, y: alarme.longitude})
      console.log(alarmProps)
      setSomAtivo(alarmProps.sound)
      setVibracaoAtiva(alarmProps.vibration)
      setAdiarAtivo(alarmProps.prostpone)
      setDiasSelecionados(listaDias)

    }

  },[props])

  return (
    <View style={styles.body}>
      {/* Mapa */}
      <View style={styles.map}>
        <Image 
          style={styles.mapView}
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${coords.x}, ${coords.y}&zoom=16&size=300x400&maptype=roadmap&markers=color:red%7Clabel:.%7C${coords.x}, ${coords.y}&size:small&scale:1&key=${process.env.EXPO_PUBLIC_GOOGLE_APIKEY}`}          
        />
      </View>

      {/* Card de configuração */}
      <View style={styles.card}>
        {/* Data e ícone *//*}
        <View style={styles.dataRow}>
          <Text style={styles.dataText}>{data}</Text>
          <Text style={styles.dataIcon}>📅</Text>
        </View>

        {/* Dias da semana */}
        <View style={styles.diasRow}>
          {dias.map((dia, idx) => (
            <Pressable
              key={dia + idx}
              style={[
                styles.dia,
                diasSelecionados[idx] && styles.diaSelecionado,
              ]}
              onPress={() => toggleDia(idx)}
            >
              <Text style={styles.diaText}>{dia}</Text>
            </Pressable>
          ))}
        </View>

        {/* Nome do alarme */}
        <TextInput
          style={styles.input}
          placeholder="nome do alarme"
          placeholderTextColor="#ccc"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="endereço"
          placeholderTextColor="#ccc"
          value={address}
          onChangeText={setAddress}
          onSubmitEditing={findLocation}
        />

        {/* Som do alarme */}
        <View style={styles.itemRow}>
          <View>
            <Text style={styles.itemTitle}>Som do alarme</Text>
            <Text style={styles.itemSubtitle}>Triple Baka - Hatsune Miku Feat Teto x Neru</Text>
          </View>
          <Switch 
          value={Boolean(somAtivo)} 
          onValueChange={setSomAtivo}
          thumbColor={'#1E1F26'}
          trackColor={{false:'#FFFFFF' , true: '#FFFFFF'}} 
          />
        </View>

        {/* Padrão de vibração */}
        <View style={styles.itemRow}>
          <View>
            <Text style={styles.itemTitle}>Padrão de vibração</Text>
            <Text style={styles.itemSubtitle}>tu tu tu</Text>
          </View>
          <Switch 
          value={Boolean(vibracaoAtiva)} 
          onValueChange={setVibracaoAtiva} 
          thumbColor={'#1E1F26'}
          trackColor={{false:'#FFFFFF' , true: '#FFFFFF'}} 
          />
        </View>

        {/* Adiar */}
        <View style={styles.itemRow}>
          <View>
            <Text style={styles.itemTitle}>Adiar</Text>
            <Text style={styles.itemSubtitle}>1 minuto, infinitas vezes</Text>
          </View>
          <Switch 
          value={Boolean(adiarAtivo)} 
          onValueChange={setAdiarAtivo} 
          thumbColor={'#1E1F26'}
          trackColor={{false:'#FFFFFF' , true: '#FFFFFF'}} 
          />
        </View>

        {/* Botões */}
        </View>
        <View style={styles.botoesRow}>
          <Pressable 
            style={styles.btBottomPress} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelar}>   Cancelar</Text>
          </Pressable>
          <Pressable style={styles.btBottomPress} 
          onPress={Alarme != undefined ? saveAlarm : createAlarm}
          >
            <Text style={styles.salvar}>Salvar </Text>
          </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 24,
    padding: 20,
  },
  map: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    flex: 0.4,
  },
  card: {
    flex: 0.6,
    backgroundColor: "#1E1F26",
    borderRadius: 18,
    padding: 18,
    width: "100%",
    alignSelf: "center",

  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
    
  },
  dataText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },
  dataIcon: {
    fontSize: 22,
    color: "#fff",
  },
  diasRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 4,
  },
  dia: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
    backgroundColor: "transparent",
  },
  diaSelecionado: {
    backgroundColor: "#fff",
  },
  diaText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#b6b6b6ff",
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 6,
    paddingVertical: 4,
    fontWeight: "400",
    letterSpacing: 1,
    borderRadius: 6
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 2,
    borderBottomWidth: 2,
    borderBottomColor: "#b6b6b6ff",
    paddingBottom:5,
    borderRadius: 6
  },
  itemTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  itemSubtitle: {
    color: "#8e8e8e",
    fontSize: 13,
    marginTop: 2,
  },
  botoesRow: {
    flex: 0.1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  cancelar: {
    color: "#000000",
    width: 200,
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    marginRight: 18,
    textAlign: "center",
  },
  salvar: {
    width: 100,
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
  },
  mapView: {
    flex: 0.9,
    flexDirection: "row",
    borderRadius: 15
  },
  btBottomPress: {
    backgroundColor: "#FFFFFF",
    flex: 0.47,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});