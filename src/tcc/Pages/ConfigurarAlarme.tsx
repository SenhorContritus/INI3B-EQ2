import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Switch, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';
import _Alarme from "../types/_alarme";
import _tarefa from '../types/_alarme';


/*const db = SQLite.openDatabaseSync('alarmes.db'); // Só aqui!
*/


const dias = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function ConfigurarAlarme() {
  const [Alarme, setAlarme] = useState<_Alarme[]>([]);
  const navigation = useNavigation();
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

// const [NovoAlarme, setNovoAlarme] = useState<string>('');

// const salvarAlarme = async () => {
//   await db.runAsync("InSERT INTO alarmes (nome, dias, somAtivo, vibracaoAtiva, adiarAtivo) VALUES (?, ?, ?, ?, ?) ", NovoAlarme)
//     setNovoAlarme('');
//     await recarregar();
// }

// ...existing code...

//  useEffect(() => {
//     db.execSync(`
//           CREATE TABLE IF NOT EXISTS alarmes (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           nome TEXT,
//           dias TEXT,
//           somAtivo text,
//           vibracaoAtiva text,
//           adiarAtivo INTEGER
//                 )`);

//     recarregar();
//   }, []);

//   const recarregar = async () => {
//     let temp: _Alarme[] = await db.getAllAsync("SELECT * FROM alarmes");
//     setAlarme(temp);
//   }

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
          <Pressable >
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