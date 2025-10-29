import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('database.db');

const useAlarmeProps = () => {
    const [dataProps, setData] = useState<any>();
    const [allDataProps, setAllData] = useState<any[]>([]);

    const dropTableProps = async () => {
        try {
            await db.execAsync("DROP TABLE IF EXISTS alarm_props")
            console.log("ja era os props")
        } catch (error) {
            console.log("Esse tal de props é insistente")
        }
    }

    const initializeTablePropsDB = async () => {
        try {   
            await db.execAsync(
                `CREATE TABLE IF NOT EXISTS alarm_props (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    active BOOLEAN NOT NULL,
                    startRadius INTEGER NOT NULL,
                    daysActive VARCHAR NOT NULL,
                    sound BOOLEAN NOT NULL,
                    soundUrl VARCHAR,
                    vibration BOOLEAN NOT NULL,
                    vibrationType VARCHAR,
                    prostpone BOOLEAN NOT NULL,
                    prostponeProps VARCHAR, 
                    volume INTEGER
                )`
            );

            console.log('Tabela props criada');
        } catch (error) {
            console.error('Erro', error);
        }
    };

    const fetchAlarmPropsDB = async (alarm_id: number) => {
        try {
            const row = await db.getAllAsync('SELECT * FROM alarm_props WHERE id= ? ', [alarm_id]);
            setData(row);
        } catch (error) {
            console.error('Erro ao buscar as propriedades do alarme', error);
        }
    };
    const fetchAllAlarmPropsDB = async () => {
        try {
            const rows = await db.getAllAsync('SELECT * FROM alarm_props');
            setAllData(rows)   
        } catch (error) {
            console.error('Erro ao buscar as propriedades do alarme', error);
        }
    };

    const insertAlarmPropsDB = async (
        active: boolean,
        startRadius: number,
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
                     active,startRadius, daysActive, sound, soundUrl, vibration, vibrationType, prostpone, prostponeProps, volume
                ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [active, startRadius, daysActive, sound, soundUrl, vibration, vibrationType, prostpone, prostponeProps, volume]
            );
            console.log('Propriedades do alarme inseridas com sucesso');
        } catch (error) {
            console.error('Erro ao inserir as propriedades do alarme', error);
        }
    }
    const updateAlarmPropsDB = async(
        alarm_id: number,
        active: boolean,
        startRadius: number,
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
                UPDATE alarm_props SET (active, startRadius, daysActive, sound, soundUrl, vibration, vibrationType, prostpone, prostponeProps, volume) =
                                        (?,?,?,?,?,?,?,?,?,?)
                                    Where id = ?
            `,[active, startRadius, daysActive, sound, soundUrl, vibration, vibrationType, prostpone, prostponeProps, volume,alarm_id])
            console.log("[ALARM_PROPS]:Tabela atualizada com sucesso")

        }catch (error){
            console.log("[ALARM_PROPS]:Atualização não pode ser realizada", error)
        }
    }
    const deleteAlarmPropsDB = async (alarm_id: number) => {
        try {
            await db.runAsync("DELETE FROM alarm_props WHERE  id = ?", [alarm_id])
            console.log("[ALARM_PROPS]: Valores deletados com sucesso💅")
        } catch (error) {
            console.log("[ALARM_PROPS]: Falha ao deletar😧😧")
        }
    }
    useEffect(() => {
        fetchAllAlarmPropsDB()
    },[])


    return {dropTableProps, initializeTablePropsDB, fetchAlarmPropsDB,fetchAllAlarmPropsDB ,insertAlarmPropsDB, updateAlarmPropsDB, deleteAlarmPropsDB, dataProps, allDataProps}
};
export default useAlarmeProps;