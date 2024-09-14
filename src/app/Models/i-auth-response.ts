import { iUser } from "./i-user";
export interface iAuthResponse {
    id: number;
    userName: string;
    cognome: string;
    email: string;
    foto: string;
    token: string;
    expires: string;
    dataRegistrazione: string;
  }
  