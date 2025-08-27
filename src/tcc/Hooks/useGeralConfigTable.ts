import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('database.db');

const useAlarms = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        initializeDatabase();
    }, []);

    const initializeDatabase = async () => {
        try {   
            await db.execAsync(
                `CREATE TABLE IF NOT EXISTS GeneralConfig (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                StyleTheme VARCHAR NOT NULL,
                Language VARCHAR NOT NULL)`
            );
            console.log('Tabela criada');
        } catch (error) {
            console.error('Erro', error);
        }
    };
    const fetchAlarms = async () => {
        try {
            const rows = await db.getAllAsync('SELECT * FROM GeneralConfig;');
            setData(rows);
        } catch (error) {
            console.error('Erro ao buscar as configurações', error);
        }
    };

 const insertAlarmConfig = async (Id=1, StyleTheme: string|any, Language: string|any) => {
    try {
        await db.runAsync(
            'INSERT INTO GeneralConfig (id, StyleTheme, Language) VALUES (?, ?, ?)',
            [Id, StyleTheme, Language]
        );
        console.log('Configurações mudança realizada com sucesso');
    } catch (error) {
        console.error('Erro ao mudar as configurações', error);
    }
}

 const UpdateConfig = async (Id=1, StyleTheme: string, Language: string, FusoHorario: string) => {
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS GeneralConfig (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                StyleTheme VARCHAR NOT NULL,
                Language VARCHAR NOT NULL,
                FusoHorario VARCHAR NOT NULL
            )
        `);
        console.log('Configurações alteradas com sucesso');
    } catch (error) {
        console.error('Erro ao Alterar as configurações gerais', error);
    }
}

      return { insertAlarmConfig, UpdateConfig, fetchAlarms, data }
};
export default useAlarms;