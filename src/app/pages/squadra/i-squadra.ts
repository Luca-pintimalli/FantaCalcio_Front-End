export interface iSquadra {
    iD_Squadra: number;
    iD_Asta: number;
    nome: string;
    stemma?: string;
    creditiTotali: number;
    creditiSpesi?: number;  // Opzionale con valore predefinito 0
    giocatoriIds: number[];  // Lista degli ID dei giocatori
    operazioniIds: number[];  // Lista degli ID delle operazioni
  }
  