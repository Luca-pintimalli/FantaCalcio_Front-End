import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iRuoloMantra } from './i-ruolo-mantra';

@Injectable({
  providedIn: 'root'
})
export class RuoliMantraService {

  private apiUrl = 'http://localhost:7260/api/RuoloMantra';  // URL dell'API per RuoloMantra

  constructor(private http: HttpClient) { }

  // Ottenere tutte le associazioni RuoloMantra
  getRuoliMantra(): Observable<iRuoloMantra[]> {
    return this.http.get<iRuoloMantra[]>(this.apiUrl);
  }

  // Ottenere una singola associazione RuoloMantra tramite ID
  getRuoloMantraById(id: number): Observable<iRuoloMantra> {
    return this.http.get<iRuoloMantra>(`${this.apiUrl}/${id}`);
  }

  // Creare una nuova associazione RuoloMantra
  createRuoloMantra(ruoloMantra: iRuoloMantra): Observable<iRuoloMantra> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<iRuoloMantra>(this.apiUrl, ruoloMantra, { headers });
  }

  // Aggiornare un'associazione RuoloMantra esistente
  updateRuoloMantra(id: number, ruoloMantra: iRuoloMantra): Observable<iRuoloMantra> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<iRuoloMantra>(`${this.apiUrl}/${id}`, ruoloMantra, { headers });
  }

  // Eliminare un'associazione RuoloMantra tramite ID
  deleteRuoloMantra(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
