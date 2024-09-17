import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iRuolo } from './i-ruolo';

@Injectable({
  providedIn: 'root'
})
export class RuoliService {
  private apiUrl = 'https://localhost:7260/api/Ruoli';  // URL del controller Ruoli nel backend

  constructor(private http: HttpClient) {}

  // GET: recupera tutti i ruoli
  getAllRuoli(): Observable<iRuolo[]> {
    return this.http.get<iRuolo[]>(`${this.apiUrl}`);
  }

  // GET: recupera un ruolo per ID
  getRuoloById(id: number): Observable<iRuolo> {
    return this.http.get<iRuolo>(`${this.apiUrl}/${id}`);
  }

  // POST: aggiungi un nuovo ruolo
  addRuolo(ruolo: iRuolo): Observable<iRuolo> {
    return this.http.post<iRuolo>(`${this.apiUrl}`, ruolo);
  }

  // PUT: aggiorna un ruolo esistente
  editRuolo(id: number, ruolo: iRuolo): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ruolo);
  }

  // DELETE: elimina un ruolo
  deleteRuolo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}