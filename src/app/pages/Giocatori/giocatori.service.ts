import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iGiocatore } from './i-giocatore';

@Injectable({
  providedIn: 'root'
})
export class GiocatoriService {
  private apiUrl = 'https://localhost:7260/api/Giocatori';

  constructor(private http: HttpClient) {}

  getAllGiocatori(): Observable<iGiocatore[]> {
    return this.http.get<iGiocatore[]>(this.apiUrl);
  }

  getGiocatoreById(id: number): Observable<iGiocatore> {
    return this.http.get<iGiocatore>(`${this.apiUrl}/${id}`);
  }

  addGiocatore(giocatore: iGiocatore): Observable<iGiocatore> {
    return this.http.post<iGiocatore>(this.apiUrl, giocatore);
  }

  updateGiocatore(id: number, giocatore: iGiocatore): Observable<iGiocatore> {
    return this.http.put<iGiocatore>(`${this.apiUrl}/${id}`, giocatore);
  }

  deleteGiocatore(id_Giocatore: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_Giocatore}`);
  }
  
}
