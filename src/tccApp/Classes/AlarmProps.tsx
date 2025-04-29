import _prostponeProps from "../types/_prostponeProps";
import Alarm from "./Alarm";

class AlarmProps{
    private id: number;
    private startTime: number[];
    private sound: boolean;
    private soundUrl: string;
    private vibration: boolean;
    private vibrationType: string;
    private prostpone: boolean;
    private prostponeProps: _prostponeProps;
    private volume: number;


}
export default AlarmProps