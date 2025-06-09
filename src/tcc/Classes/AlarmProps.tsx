import _prostponeProps from "../types/_prostponeProps";
import Alarm from "./Alarm";

class AlarmProps{
    private Id: number;
    private active: boolean;
    private sound: boolean;
    private soundUrl: string;
    private vibration: boolean;
    private vibrationType: string;
    private prostpone: boolean;
    private prostponeProps: _prostponeProps;
    private volume: number;

    public constructor(propsId: number, active:boolean, sound: boolean, soundUrl:string, vibration:boolean, vibrationType:string, prostpone:boolean, prostponeProps: _prostponeProps, volume:number){
        this.Id = propsId;
        this.active = active;
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