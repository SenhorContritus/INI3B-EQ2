import _coords from "../types/_coords"
import AlarmProps from "./AlarmProps";

class Alarm{
    private _id : number;
    private _name: string;
    private _coords: _coords;
    private _address: string;
    private _alarmProps: AlarmProps | null;
    
    public constructor(id: number, name: string, coords: _coords, address: string,alarmProps: AlarmProps | null){
        this._id = id;
        this._name = name;
        this._coords = coords;
        this._address = address;
        this._alarmProps = alarmProps;
    }

    get id(){
        return this._id;
    }
    set id(id:number){
        this._id = id
    }
    get name(){//o arquivo  dos mlk tao salvo corrijidos aqui separa o código do banco de dados mas mantem aqui e da commit ai dps que eu fazer os babiba eu vou la e implemento o código <3 o codigo do babiba de dados ta no configurar alarme, ninguem tem entao ta separado <3 pode pa então XD
        return this._name;
    }
    set name(name:string){
        this.name = name
    }
    get coords(){
        return this._coords;
    }
    set coords(coords:_coords){
        this._coords = coords
    }
    get address(){
        return this._address
    }
    set address(address:string){
        this._address = address
    }
    get alarmProps(){
        return this._alarmProps;
    }
    set alarmProps(alarmProps: AlarmProps | null){
        this._alarmProps = alarmProps
    }
    

}

export default Alarm