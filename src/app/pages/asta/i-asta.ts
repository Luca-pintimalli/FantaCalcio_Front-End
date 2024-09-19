export interface iAsta {
  iD_Asta: number;
  iD_Utente: number;
  iD_TipoAsta: number; // "random" o "chiamata"
  numeroSquadre: number;
  creditiDisponibili: number;
  iD_Modalita: number;

  // Limiti per ruolo
  maxPortieri: number; // Limite massimo di portieri per squadra
  maxDifensori: number; // Limite massimo di difensori per squadra
  maxCentrocampisti: number; // Limite massimo di centrocampisti per squadra
  maxAttaccanti: number; // Limite massimo di attaccanti per squadra

  nomeUtente?: string;
  nomeModalita?: string; // (Classic o Mantra)
  tipoAstaDescrizione?: string; // (random o chiamata)
}
