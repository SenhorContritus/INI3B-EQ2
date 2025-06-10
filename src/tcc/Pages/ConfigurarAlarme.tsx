import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Switch, Pressable, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Alarm from "../Classes/Alarm";
import * as SQLite from "expo-sqlite"
import AlarmProps from "../Classes/AlarmProps";
const db = SQLite.openDatabaseSync("AlarmsDatabase.sqlite")

const dias = ["D", "S", "T", "Q", "Q", "S", "S"];

export const ConfigurarAlarme = ({route, navigation}) => {

  const props = route.params
  const [Alarme, setAlarme] = useState<Alarm | undefined>();  
  const [nome, setNome] = useState("");
  const [diasSelecionados, setDiasSelecionados] = useState([false, false, false, false, false, false, false]);
  const [somAtivo, setSomAtivo] = useState(true);
  const [vibracaoAtiva, setVibracaoAtiva] = useState(true);
  const [adiarAtivo, setAdiarAtivo] = useState(true);
  
  // Exemplo de data fixa
  const data = "13 de fevereiro de 2025";

  function toggleDia(index: number) {
    const novosDias = [...diasSelecionados]; //spread operator para criar uma cópia do array
    novosDias[index] = !novosDias[index];
    setDiasSelecionados(novosDias);
  }
  //é chamado quando nenhum alarme foi enviado por parâmetro 
  const createAlarm = () => {
    console.log("Create")
    const id = route.params.listLenght
    let nomeIf = nome
    if(nomeIf === ""){
      nomeIf = "Alarm " + id
    }
    return navigation.popTo("Main", {alarm: new Alarm(id, nomeIf, {x: undefined,y: undefined},new AlarmProps( id, true,diasSelecionados, somAtivo, "",vibracaoAtiva,"",adiarAtivo,{times: 0, timeWait:0 }, 10 )), edit:false})
  }
  // é chamado quando a tela main manda um alarme como parametro
  const saveAlarm = () => {
    console.log("save")
    if(Alarme){
      let nomeIf = nome
      if(nomeIf === ""){
        nomeIf = "Alarm " + Alarme?.id
      }
      return navigation.popTo("Main", {alarm: new Alarm(Alarme?.id, nomeIf, {x: undefined,y: undefined},new AlarmProps(Alarme?.id, true,diasSelecionados,somAtivo, "",vibracaoAtiva,"",adiarAtivo,{times: 0, timeWait:0 }, 10 )), edit: true})
    }
  }
  //verifica se foi passado algum alarme como parâmetro e caso o tenha, modifica os valores apresentados
  useEffect(() => {
    if(props.alarm){
      const alarme = props?.alarm
      setAlarme(props?.alarm)
      setNome(alarme.name)
      setDiasSelecionados(alarme.alarmProps.daysActive)
      setSomAtivo(alarme.alarmProps.sound)
      setVibracaoAtiva(alarme.alarmProps.vibration)
      setAdiarAtivo(alarme.alarmProps.prostpone)

    }

  },[props])

  return (
    <View style={styles.body}>
      {/* Mapa */}
      <Image
        source={{
          uri: "https://maps.googleapis.com/maps/api/staticmap?center=-23.55052,-46.633308&zoom=13&size=600x300&key=SUA_API_KEY",
        }}
        style={styles.map}
        resizeMode="cover"
      />

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

        {/* Som do alarme */}
        <View style={styles.itemRow}>
          <View>
            <Text style={styles.itemTitle}>Som do alarme</Text>
            <Text style={styles.itemSubtitle}>Matui</Text>
          </View>
          <Switch value={somAtivo} onValueChange={setSomAtivo} />
        </View>

        {/* Padrão de vibração */}
        <View style={styles.itemRow}>
          <View>
            <Text style={styles.itemTitle}>Padrão de vibração</Text>
            <Text style={styles.itemSubtitle}>tu tu tu</Text>
          </View>
          <Switch value={vibracaoAtiva} onValueChange={setVibracaoAtiva} />
        </View>

        {/* Adiar */}
        <View style={styles.itemRow}>
          <View>
            <Text style={styles.itemTitle}>Adiar</Text>
            <Text style={styles.itemSubtitle}>1 minuto, infinitas vezes</Text>
          </View>
          <Switch value={adiarAtivo} onValueChange={setAdiarAtivo} />
        </View>

        {/* Botões */}
        <View style={styles.botoesRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.cancelar}>Cancelar</Text>
          </Pressable>
          <Pressable onPress={Alarme != undefined ? saveAlarm : createAlarm}>
            <Text style={styles.salvar}>Salvar</Text>
          </Pressable>
        </View>
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
  },
  map: {
    width: "95%",
    height: 180,
    borderRadius: 18,
    marginBottom: 24,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#231B1B",
    borderRadius: 18,
    padding: 18,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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
    marginBottom: 12,
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
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    color: "#fff",
    fontSize: 20,
    marginBottom: 18,
    marginTop: 6,
    paddingVertical: 4,
    fontWeight: "400",
    letterSpacing: 1,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 2,
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 2,
  },
  cancelar: {
    color: "#6A7AFF",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    marginRight: 18,
  },
  salvar: {
    color: "#6A7AFF",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});