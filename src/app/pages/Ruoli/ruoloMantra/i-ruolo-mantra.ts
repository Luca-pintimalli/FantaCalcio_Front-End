import { iGiocatore } from "../../Giocatori/i-giocatore";
import { iRuolo } from "../i-ruolo";

export interface iRuoloMantra {
    ID: number;
    ID_Giocatore: number;
    ID_Ruolo: number;
}