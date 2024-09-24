export interface iOperazione {
    iD_Operazione: number;
    iD_Giocatore: number;
    iD_Squadra: number;
    creditiSpesi: number;
    statoOperazione?: string;
    dataOperazione: Date;
    iD_Asta:number;
  }
  