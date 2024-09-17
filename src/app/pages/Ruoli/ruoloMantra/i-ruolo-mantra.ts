import { iGiocatore } from "../../Giocatori/i-giocatore";
import { iRuolo } from "../i-ruolo";

export interface iRuoloMantra {
    id: number;
    iD_Giocatore: number;
    iD_Ruolo: number;
}