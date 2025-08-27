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
                `CREATE TABLE IF NOT EXISTS alarm (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                address VARCHAR)`
            );
            console.log('Tabela criada');
        } catch (error) {
            console.error('Erro', error);
        }
    };
    const fetchAlarms = async () => {
        try {
            const rows = await db.getAllAsync('SELECT * FROM alarm;');
            setData(rows);
        } catch (error) {
            console.error('Erro ao buscar os alarmes', error);
        }
    };

 const insertAlarm = async (name: string, latitude: number, longitude: number, address: string) => {
    try {
        await db.runAsync(
            'INSERT INTO alarm (name, latitude, longitude, address) VALUES (?, ?, ?, ?)',
            [name, latitude, longitude, address]
        );
        console.log('Alarme inserido com sucesso');
    } catch (error) {
        console.error('Erro ao inserir o alarme', error);
    }
}
const UpdateAlarm = async (Id:number, StyleTheme: string, Language: string, FusoHorario: string) => {
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
      
};
export default useAlarms;