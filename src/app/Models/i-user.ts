export interface iUser {
    id: number;
    nome: string;
    cognome: string;
    email: string;
    password?: string;  // La password è facoltativa
    foto?: string;
    dataRegistrazione?: Date;
  }
  