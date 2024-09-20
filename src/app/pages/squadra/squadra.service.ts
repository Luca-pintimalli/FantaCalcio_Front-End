import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iSquadra } from './i-squadra';  // Importa l'interfaccia

@Injectable({
  providedIn: 'root'
})
export class SquadraService {

  private apiUrl = 'https://localhost:7260/api/Squadra';  // Modifica l'URL dell'API se necessario

  constructor(private http: HttpClient) { }

  // Metodo per ottenere tutte le squadre
  getSquadre(): Observable<iSquadra[]> {
    return this.http.get<iSquadra[]>(this.apiUrl);
  }

  // Metodo per ottenere una squadra per ID
  getSquadraById(id: number): Observable<iSquadra> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<iSquadra>(url);
  }

  // Metodo per creare una nuova squadra con immagine
  addSquadraWithImage(formData: FormData): Observable<iSquadra> {
    return this.http.post<iSquadra>(this.apiUrl, formData);
  }

// Metodo per aggiornare una squadra con FormData
updateSquadra(id: number, formData: FormData): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.put(url, formData);
}

  // Metodo per eliminare una squadra
  deleteSquadra(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }


  // Metodo per aggiornare una squadra esistente con immagine
  updateAstaWithImage(id: number, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, formData);
  }
  
}
