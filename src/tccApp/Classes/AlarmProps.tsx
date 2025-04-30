import _prostponeProps from "../types/_prostponeProps";
import Alarm from "./Alarm";

class AlarmProps{
    private propsId: number;
    private startTime: number[];
    private sound: boolean;
    private soundUrl: string;
    private vibration: boolean;
    private vibrationType: string;
    private prostpone: boolean;
    private prostponeProps: _prostponeProps;
    private volume: number;

    public constructor(propsId: number, startTime:number[], sound: boolean, soundUrl:string, vibration:boolean, vibrationType:string, prostpone:boolean, prostponeProps: _prostponeProps, volume:number){
        this.propsId = propsId;
        this.startTime = startTime;
        this.sound = sound;
        this.soundUrl = soundUrl;
        this.vibration = vibration;
        this.vibrationType = vibrationType;
        this.prostpone = prostpone;
        this.prostponeProps = prostponeProps;
        this.volume = volume;
    }

}
export default AlarmProps