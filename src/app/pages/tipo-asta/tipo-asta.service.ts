import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iTipoAsta } from './i-tipo-asta';

@Injectable({
  providedIn: 'root'
})
export class TipoAstaService {
  private apiUrl = 'https://localhost:7260/api/TipoAsta';  // Cambia l'URL con quello corretto per la tua API

  constructor(private http: HttpClient) {}

  // Ottenere tutti i tipi di asta
  getAllTipoAsta(): Observable<iTipoAsta[]> {
    return this.http.get<iTipoAsta[]>(this.apiUrl);
  }

  // Ottenere un tipo di asta per ID
  getTipoAstaById(id: number): Observable<iTipoAsta> {
    return this.http.get<iTipoAsta>(`${this.apiUrl}/${id}`);
  }

  // Creare un nuovo tipo di asta
  addTipoAsta(tipoAsta: iTipoAsta): Observable<iTipoAsta> {
    return this.http.post<iTipoAsta>(this.apiUrl, tipoAsta);
  }

  // Aggiornare un tipo di asta
  updateTipoAsta(id: number, tipoAsta: iTipoAsta): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, tipoAsta);
  }

  // Eliminare un tipo di asta
  deleteTipoAsta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
