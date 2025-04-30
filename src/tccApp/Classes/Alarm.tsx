import _address from "../types/_address"
import AlarmProps from "./AlarmProps";

class Alarm{
    private _id: number;
    private _name: string;
    private _address: _address;
    private _alarmProps: AlarmProps;
    
    public constructor(id: number, name: string, address: _address, alarmProps: AlarmProps){
        this._id = id;
        this._name = name;
        this._address = address;
        this._alarmProps = alarmProps;
    }

    get id(){
        return this._id;
    }
    set id(id:number){
        this._id = id
    }
    get name(){
        return this._name;
    }
    set name(name:string){
        this.name = name
    }
    get address(){
        return this._address;
    }
    set address(address:_address){
        this._address = address
    }
    get alarmProps(){
        return this._alarmProps;
    }
    set alarmProps(alarmProps: AlarmProps){
        this._alarmProps = alarmProps
    }

}

export default Alarm