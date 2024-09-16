import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iModalita } from './i-modalita';

@Injectable({
  providedIn: 'root'
})
export class ModalitaService {
  private apiUrl = 'https://localhost:7260/api/Modalita';  // URL del controller Modalita nel backend

  constructor(private http: HttpClient) {}

  // GET: Recupera tutte le modalità
  getAllModalita(): Observable<iModalita[]> {
    return this.http.get<iModalita[]>(`${this.apiUrl}`);
  }

  // GET: Recupera una modalità per ID
  getModalitaById(id: number): Observable<iModalita> {
    return this.http.get<iModalita>(`${this.apiUrl}/${id}`);
  }

  // POST: Aggiungi una nuova modalità
  addModalita(modalita: iModalita): Observable<iModalita> {
    return this.http.post<iModalita>(`${this.apiUrl}`, modalita);
  }

  // PUT: Aggiorna una modalità esistente
  updateModalita(id: number, modalita: iModalita): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, modalita);
  }

  // DELETE: Elimina una modalità
  deleteModalita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
