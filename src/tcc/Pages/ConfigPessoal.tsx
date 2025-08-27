import { useState } from 'react';
import React from 'react';
import { StyleSheet, Text, View, Switch, Pressable, Platform, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../Hooks/i18n';
import RNPickerSelect from 'react-native-picker-select';
import  useconfig  from '../Hooks/useGeralConfigTable';

export const ConfigPessoal = () => {
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();
  const deviceLang = Platform.OS === 'ios'
    ? navigator.language.split('-')[0]
    : (typeof navigator !== 'undefined' && navigator.language ? navigator.language.split('-')[0] : 'pt');
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [idioma, setIdioma] = useState(i18n.language || deviceLang);
  const [textoCaixa, setTextoCaixa] = useState('');
  const { insertAlarmConfig } = useconfig();

  React.useEffect(() => {
    i18n.changeLanguage(idioma);
  }, [idioma]);

  const estilos = temaEscuro ? estilosEscuro : estilosClaro;

  return (
    <ScrollView style={estilos.scroll}>
      
        <Pressable
          style={estilos.voltar}
          onPress={() => {
            navigation.navigate("Main");
          }}
        >
          <View style={estilos.voltarBotao}>
            <Text style={estilos.voltarIcon}>←</Text>
          </View>

        </Pressable>
      <View style={estilos.tituloContainer}>
        <Text style={estilos.tituloPrincipal}>{t('settings') || 'Configurações Gerais'}</Text>
      </View>

      {/* Container de cada configuração */}
      <View style={estilos.container}>
        {/* Tema */}
        <View style={estilos.itemContainer}>
          <Text style={estilos.titulo}>{t('theme')}</Text>
          <Switch
          value={temaEscuro}
          onValueChange={async (value) => {
            setTemaEscuro(value);
            const tema = value ? 'escuro' : 'claro';
            await AsyncStorage.setItem('temaSelecionado', tema); // salva como texto
          }}
          thumbColor={temaEscuro ? "#ccc" : "#193358"}
          trackColor={{ false: "#ccc", true: "#ccc" }}
        />
        </View>

        {/* Botão */}
        <View style={estilos.itemContainer}>
          <Pressable
            style={estilos.botao}
            onPress={() => navigation.navigate("TocarAlarme")}
          >
            <Text style={estilos.textoBotao}>{t('alarm')}</Text>
          </Pressable>
        </View>

        {/* Idioma */}
        <View style={estilos.itemContainer}>
          <Text style={estilos.label}>{t('language')}</Text>
          <View style={estilos.pickerBox}>
            <RNPickerSelect
            
              value={idioma}
              onValueChange={async (lang) => {
                setIdioma(lang);
                i18n.changeLanguage(lang);
                await AsyncStorage.setItem('idiomaSelecionado', lang); // salva localmente
              }}
              items={[
                { label: 'Português', value: 'pt'},
                { label: 'Português (Portugal)', value: 'pt-pt' },
                { label: 'English', value: 'en' },
                { label: 'English (UK)', value: 'en-uk' },
                { label: 'Ελληνικά', value: 'el' },
                { label: 'Deutsch', value: 'de' },
                { label: 'Polski', value: 'pl' },
                { label: 'Italiano', value: 'it' },
                { label: 'العربية', value: 'ar' },
                { label: 'Français', value: 'fr' },
                { label: 'हिन्दी', value: 'hi' },
                { label: '日本語', value: 'ja' },
                { label: '中文', value: 'zh' },
                { label: 'Norsk', value: 'no' },
                { label: 'Esperanto', value: 'eo' },
                { label: 'Русский', value: 'ru' },
                { label: 'ไทย', value: 'th' },
                { label: '한국어', value: 'ko' },
              ]}
              style={{
  inputIOS: {
    ...estilos.picker,
    minWidth: 220, // aumente a largura mínima
    fontSize: 4,  // fonte maior
  },
  inputAndroid: {
    ...estilos.picker,
    minWidth: 220,
    fontSize: 4,
  },
  placeholder: {
    color: estilos.pickerPlaceholder.color,
    fontSize: 4,
  },
}}

            
              placeholder={{ label: 'Selecione o idioma...', value: null, color: estilos.pickerPlaceholder.color }}
            />
          </View>
        </View>

        <Pressable
  style={estilos.botao}
  onPress={() => {
    const tema = temaEscuro ? 'escuro' : 'claro';
    insertAlarmConfig( 1, temaEscuro, idioma );
  }}
>
  <Text style={estilos.textoBotao}>Salvar Configuração</Text>
</Pressable>

        {/* Caixa de texto destacada */}
        {/* <View style={estilos.itemContainer}>
          <Text style={estilos.label}>Texto de exemplo</Text>
          <TextInput
            style={estilos.caixaTexto}
            value={textoCaixa}
            onChangeText={setTextoCaixa}
            placeholder="Digite aqui..."
            placeholderTextColor={temaEscuro ? '#ccc' : '#193358'}
          /> */}
        {/* </View> */}
      </View>
    </ScrollView>
  );
};

const estilosClaro = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f5f5f5',
   },//,backgroundColor: '#e0e0e0',
  tituloContainer: {
    marginTop:30,
    marginLeft:20,
    borderRadius:24,
    marginRight:20,
    backgroundColor: '#e0e0e0',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  tituloPrincipal: {
    fontSize: 26,
    color: '#2B2323',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginTop: 8,
    letterSpacing: 1,
  },
  voltar: {
    position: 'absolute',
    left: 20,
    top: 44,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voltarBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#415A77',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    elevation: 2,
  },
  voltarIcon: {
    color: '#fff',
    fontSize: 18,
    marginRight: 8,
    fontWeight: 'bold',
  },
  voltarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    minHeight: '100%',
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
    alignItems: 'center',
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    color: '#2B2323',
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  botao: {
    backgroundColor: '#415A77',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    marginTop: 8,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: '#2B2323',
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
pickerBox: {
  width: '100%',
    minHeight: 70, // altura mínima
  minWidth: 220, // aumente a largura mínima
  backgroundColor: '#d1cfff',
  borderRadius: 8,
  padding: 4,
},
  picker: {
    minHeight: 70,
    height: 40,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#d1cfff',
    color: '#2B2323',
  },
  pickerPlaceholder: {
    color: '#193358',
  },
  caixaTexto: {
    width: '100%',
    backgroundColor: '#ccc',
    color: '#193358',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
    marginTop: 8,
    fontWeight: 'bold',
  },
});

const estilosEscuro = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#181818',
  },
  tituloContainer: {
    marginTop:30,
    marginLeft:20,
    marginRight:20,
    backgroundColor: '#232323',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderRadius:24,
    alignItems: 'center',
    marginBottom: 16,
  },
  tituloPrincipal: {
    fontSize: 26,
    color: '#ccc',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginTop: 8,
    letterSpacing: 1,
  },
  voltar: {
    position: 'absolute',
    left: 20,
    top: 44,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voltarBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    elevation: 2,
  },
  voltarIcon: {
    color: '#232323',
    fontSize: 18,
    marginRight: 8,
    fontWeight: 'bold',
  },
  voltarTexto: {
    color: '#232323',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    minHeight: '100%',
    backgroundColor: '#181818',
  },
  itemContainer: {
    width: '100%',
    backgroundColor: '#232323',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
    alignItems: 'center',
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    color: '#ccc',
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  botao: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    marginTop: 8,
  },
  textoBotao: {
    color: '#232323',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  pickerBox: {
    width: '100%',
    marginBottom: 10,
    
    minHeight: 70,
    backgroundColor: '#393939',
    borderRadius: 8,
    padding: 4,
  },
  picker: {
    height: 40,
    minHeight: 70,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#393939',
    color: '#ccc',
  },
  pickerPlaceholder: {
    color: '#ccc',
  },
  caixaTexto: {
    width: '100%',
    backgroundColor: '#ccc',
    color: '#232323',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default ConfigPessoal;