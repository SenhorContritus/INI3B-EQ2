import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('database.db');

const useAlarms = () => {
    const [data, setData] = useState<any[]>([]);

    const dropTable = async () => {
        try {
            await db.execAsync("DROP TABLE IF EXISTS alarm")
            console.log("ja era os alarms")
        } catch (error) {
            console.log("Esse tal de alarm é insistente")
        }
    }

    const initializeTableDB = async () => {
        try {   
            await db.execAsync(
                `CREATE TABLE IF NOT EXISTS alarm (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                address VARCHAR)`
            );
            console.log('Tabela alarms criada');
        } catch (error) {
            console.error('Erro', error);
        }
    };
    const fetchAlarmDB = async () => {
        try {
            const rows = await db.getAllAsync('SELECT * FROM alarm;');
            setData(rows);
        } catch (error) {
            console.error('Erro ao buscar os alarmes', error);
        }
    };

    const insertAlarmDB = async (name: string, latitude: number, longitude: number, address: string) => {
        try {
            await db.runAsync(
                'INSERT INTO alarm (name, latitude, longitude, address) VALUES (?, ?, ?, ?);',
                [name, latitude, longitude, address]
            );
            console.log('Alarme inserido com sucesso');
        } catch (error) {
            console.error('Erro ao inserir o alarme', error);
        }
    }
    const updateAlarmDB = async (alarm_id:number, name: string, latitude: number, longitude: number, address: string) => {
        try {
            await db.runAsync(`
                UPDATE alarm (name, latitude, longitude, address) = (?,?,?,?) WHERE id = ?;
            `,[name,latitude,longitude,address, alarm_id])
            console.log('Configurações alteradas com sucesso');
        } catch (error) {
            console.error('Erro ao Alterar as configurações gerais', error);
        }
    }
    const deleteAlarmDB = async (alarm_id: number) =>  {
        try {
            await db.runAsync("DELETE FROM alarm WHERE id = ?;", [alarm_id])
            console.log("[ALARM]: Dados deletados com sucesso")
        } catch (error) {
            console.log(error)
        }
    }
    return {dropTable,initializeTableDB, fetchAlarmDB, insertAlarmDB, updateAlarmDB, deleteAlarmDB, data}
};
export default useAlarms;