import _prostponeProps from "../types/_prostponeProps";
import Alarm from "./Alarm";

class AlarmProps{
    private _Id: number ;
    private _active: boolean;
    private _daysActive: string[];
    private _sound: boolean;
    private _soundUrl: string;
    private _vibration: boolean;
    private _vibrationType: string;
    private _prostpone: boolean;
    private _prostponeProps: _prostponeProps;
    private _volume: number;

    public constructor(propsId: number, active:boolean, daysActive: string[], sound: boolean, soundUrl:string, vibration:boolean, vibrationType:string, prostpone:boolean, prostponeProps: _prostponeProps, volume:number){
        this._Id = propsId;
        this._active = active;
        this._daysActive = daysActive;
        this._sound = sound;
        this._soundUrl = soundUrl;
        this._vibration = vibration;
        this._vibrationType = vibrationType;
        this._prostpone = prostpone;
        this._prostponeProps = prostponeProps;
        this._volume = volume;
    }
    get id(){
        return this._Id
    }
    set id(id:number){
        this._Id = id
    }
    get active(){
        return this._active
    }
    set active(active: boolean){
        this._active = active
    }
    get daysActive(){
        return this._daysActive
    }
    set daysActive(daysActive: string[]){
        this._daysActive = daysActive
    }
    get sound(){
        return this._sound
    }
    set sound(sound: boolean){
        this._sound = sound
    }
    get soundUrl(){
        return this._soundUrl
    }
    set soundUrl(soundUrl:string){
        this._soundUrl = soundUrl
    }
    get vibration(){
        return this._vibration
    }
    set vibration(vibration: boolean){
        this._vibration = vibration
    }
    get vibrationType(){
        return this._vibrationType
    }
    set vibrationType(vibrationType:string){
        this._vibrationType = vibrationType
    }
    get prostpone(){
        return this._prostpone
    }
    set prostpone(prostpone:boolean){
        this._prostpone = prostpone
    }
    get prostponeProps(){
        return this._prostponeProps
    }
    set prostponeProps(prostpone: _prostponeProps){
        this._prostponeProps = prostpone
    }
    get volume(){
        return this._volume
    }
    set volume(volume: number){
        this._volume = volume
    }

}
export default AlarmProps