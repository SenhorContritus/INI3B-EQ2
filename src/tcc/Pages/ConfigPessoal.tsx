import { useState } from 'react';
import React from 'react';
import { Button, StyleSheet, Text, View, Switch , Pressable} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export const ConfigPessoal = () => {
  const navigation = useNavigation<any>();
  const [temaEscuro, setTemaEscuro] = useState(false);


  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}
        onPress={() => {
          navigation.navigate("Main");
        }}
      >
        <Text style={{ fontSize: 24 }}>🔙</Text>
      </Pressable>

      <View style={temaEscuro ? claro.container : escuro.container}>
        <Text style={temaEscuro ? claro.titulo : escuro.titulo}>Configurações Gerais</Text>
        <View style={temaEscuro ? claro.caixa : escuro.caixa}>
          Tema
          <Switch
        value={temaEscuro}
        onValueChange={setTemaEscuro}
        thumbColor={temaEscuro ? "#FFFFFF" : "#193358"}
        trackColor={{ false: "#FFFFFF", true: "#000000" }}
          />
          Idioma
        </View>
        <Text style={temaEscuro ? claro.titulo : escuro.titulo}>Localizacao</Text>
        <View style={temaEscuro ? claro.caixa : escuro.caixa}>
          Localização
        </View>
        <Text style={temaEscuro ? claro.titulo : escuro.titulo}>Data e hora</Text>
        <View style={temaEscuro ? claro.caixa : escuro.caixa}>
          Data e hora
        </View>
         <Button onPress={() => {
          navigation.navigate("TocarAlarme");
        }} title="Alarme" />
      </View>
    </View>
  );
}


const escuro = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: '100%',
    
  },

    
  
  caixa: {
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#2B2323',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    elevation: 4,
    height: 128,
    marginBottom: '5%',
    fontFamily: 'Arial',
  },

  titulo: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Arial',
    }});

const claro = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: '100%',
    color: '1E1E1E',
  },

    
  
  caixa: {
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: "#2B2323",
    borderRadius: 20,
    padding: 20,
    width: '100%',
    elevation: 4,
    height: 128,
    marginBottom: '5%',
    fontFamily: 'Arial',
  },

  titulo: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Arial',
  },
  input: {
    backgroundColor: '#415A77',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default ConfigPessoal;