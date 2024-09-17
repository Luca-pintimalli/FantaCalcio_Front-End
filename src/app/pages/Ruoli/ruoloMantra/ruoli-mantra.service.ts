import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuoloMantraService {
  private apiUrl = 'https://localhost:7260/api/RuoloMantra';  // Endpoint per RuoloMantra

  constructor(private http: HttpClient) {}

  // Metodo per aggiungere un'associazione RuoloMantra
  addRuoloMantra(ruoloMantraData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/aggiungi`, ruoloMantraData);
  }

  // Metodo per ottenere tutti i ruoli Mantra
  getRuoliMantra(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Metodo per ottenere i ruoli Mantra associati a uno specifico giocatore
  getRuoliMantraByGiocatore(idGiocatore: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/giocatore/${idGiocatore}`);
  }
}
