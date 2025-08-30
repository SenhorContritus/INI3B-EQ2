import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('database.db');

const useAlarmeProps = () => {
    const [dataProps, setData] = useState<any[]>([]);

    const initializeTablePropsDB = async () => {
        try {   
            await db.execAsync(
                `CREATE TABLE IF NOT EXISTS alarm_props (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    alarm_id INTEGER,
                    active BOOLEAN NOT NULL,
                    daysActive VARCHAR NOT NULL,
                    sound BOOLEAN NOT NULL,
                    soundUrl VARCHAR,
                    vibration BOOLEAN NOT NULL,
                    vibrationType VARCHAR,
                    prostpone BOOLEAN NOT NULL,
                    prostponeProps VARCHAR, 
                    volume INTEGER,
                    FOREIGN KEY (alarm_id) REFERENCES alarm(id)
                )`
            );

            console.log('Tabela props criada');
        } catch (error) {
            console.error('Erro', error);
        }
    };

    const fetchAlarmPropsDB = async () => {
        try {
            const rows = await db.getAllAsync('SELECT * FROM alarm_props ;');
            setData(rows);
        } catch (error) {
            console.error('Erro ao buscar as propriedades do alarme', error);
        }
    };

    const insertAlarmPropsDB = async (
        alarm_id: number,
        active: boolean,
        daysActive: string,
        sound: boolean,
        soundUrl: string,
        vibration: boolean,
        vibrationType: string,
        prostpone: boolean,
        prostponeProps: string,
        volume: number
    ) => {
        try {
            await db.runAsync(
                `INSERT INTO alarm_props (
                    alarm_id, active, daysActive, sound, soundUrl, vibration, vibrationType, prostpone, prostponeProps, volume
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [alarm_id, active, daysActive, sound, soundUrl, vibration, vibrationType, prostpone, prostponeProps, volume]
            );
            console.log('Propriedades do alarme inseridas com sucesso');
        } catch (error) {
            console.error('Erro ao inserir as propriedades do alarme', error);
        }
    }
    const updateAlarmPropsDB = async(
        alarm_id: number,
        active: boolean,
        daysActive: string,
        sound: boolean,
        soundUrl: string,
        vibration: boolean,
        vibrationType: string,
        prostpone: boolean,
        prostponeProps: string,
        volume: number
    ) => {
        try{
            await db.runAsync(`
                UPDATE alarm_props SET (active, daysActive, sound, soundUrl, vibration, vibrationType, prostpone, prostponeProps, volume) =
                                        (?,?,?,?,?,?,?,?)
                                    Where alarm_id = ?
            `,[active, daysActive, sound, soundUrl, vibration, vibrationType, prostpone, prostponeProps, volume,alarm_id])
            console.log("[ALARM_PROPS]:Tabela atualizada com sucesso")

        }catch (error){
            console.log("[ALARM_PROPS]:Atualização não pode ser feita")
        }
    }
    const deleteAlarmPropsDB = async (alarm_id: number) => {
        try {
            await db.runAsync("DELETE FROM alarm_props WHERE alarm_id = ?", [alarm_id])
            console.log("[ALARM_PROPS]: Valores deletados com sucesso💅")
        } catch (error) {
            console.log("[ALARM_PROPS]: Falha ao deletar😧😧")
        }
    }
    return {initializeTablePropsDB, fetchAlarmPropsDB, insertAlarmPropsDB, updateAlarmPropsDB, deleteAlarmPropsDB, dataProps}
};
export default useAlarmeProps;