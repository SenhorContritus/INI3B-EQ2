import { useState } from 'react';
import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView, Switch } from 'react-native';
export const ConfigPessoal = () => {


 const [temaEscuro, setTemaEscuro] = useState(false); // Estado para o switch

  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar as configurações
    console.log('Configurações salvas:', { temaEscuro });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações Gerais</Text>
      <View style={styles.caixa1}>
        
 
 Tema
<Switch
          value={temaEscuro}
          onValueChange={setTemaEscuro}
          thumbColor={temaEscuro ? "#415A77" : "#E0E1DD"}
          trackColor={{ false: "#ccc", true: "#0D1B2A" }}
        />
        Idioma

      </View>
      <Text style={styles.titulo}>Localizacao</Text>
      <View style={styles.caixa2}>
        
 babiba
        
      </View>
      <Text style={styles.titulo}>Data e hora</Text>
      <View style={styles.caixa3}>
        
 babiba
        
      </View>
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: '100%'
  },
  caixa1: {
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#E0E1DD',
    backgroundColor: '#1B263B',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    elevation: 4,
    minHeight: '20%',
    marginBottom: '5%',
  },
  caixa2: {
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#E0E1DD',
    backgroundColor: '#1B263B',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    elevation: 4,
    minHeight: '10%',
    marginBottom: '5%',
  },
  caixa3: {
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#E0E1DD',
    backgroundColor: '#1B263B',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    elevation: 4,
    minHeight: '10%',
    marginBottom: '5%',
  },
  titulo: {
    fontSize: 24,
    color: '#E0E1DD',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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