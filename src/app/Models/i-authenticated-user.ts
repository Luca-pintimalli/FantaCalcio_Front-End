export interface iAuthenticatedUser {
    id: number;
    nome: string;
    cognome: string;
    email: string;
    foto?: string;
    dataRegistrazione?: Date;
  }