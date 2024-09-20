import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iAsta } from './i-asta';  
import { iAstaCreate } from './i-asta-create';

@Injectable({
  providedIn: 'root'
})
export class AstaService {

  private apiUrl = 'https://localhost:7260/api/Asta';

  constructor(private http: HttpClient) { }

  // Metodo per ottenere tutte le aste
  getAste(): Observable<iAsta[]> {
    return this.http.get<iAsta[]>(this.apiUrl);
  }

  // Metodo per ottenere un'asta per ID
  getAstaById(id: number): Observable<iAsta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<iAsta>(url);
  }
  
  

  // Metodo per creare una nuova asta
  createAsta(asta: iAstaCreate): Observable<iAstaCreate> {
    return this.http.post<iAstaCreate>(this.apiUrl, asta);
  }

  // Metodo per aggiornare un'asta esistente
  updateAsta(id: number, asta: iAsta): Observable<iAsta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<iAsta>(url, asta);
  }

  // Metodo per eliminare un'asta
  deleteAsta(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
