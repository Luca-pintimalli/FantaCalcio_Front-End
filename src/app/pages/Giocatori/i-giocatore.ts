import { iRuoloMantra } from "../Ruoli/ruoloMantra/i-ruolo-mantra";

export interface iGiocatore {

  iD_Giocatore: number;
  nome: string;
  cognome: string;
  foto?: string| null; // opzionale
  squadraAttuale: string; 
  goalFatti: number;
  goalSubiti: number;
  assist: number;
  partiteGiocate: number;
  ruoloClassic: string;
  id_Squadra?: number; // opzionale, potrebbe non essere sempre presente
  ruoliMantra?: iRuoloMantra[]; // relazione con i ruoli Mantra
  statoGiocatore: 'Disponibile' | 'Svincolato';

}
