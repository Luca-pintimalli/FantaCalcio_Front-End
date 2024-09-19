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
  addGiocatore(giocatoreData: any): Observable<any> {
    return this.http.post<any>('https://localhost:7260/api/Giocatori', giocatoreData, {
        headers: { 'Content-Type': 'application/json' }
    });
}


updateGiocatoreWithImage(id: number, formData: FormData): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
}


  deleteGiocatore(id_Giocatore: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_Giocatore}`);
  }
  



  getGiocatoriByRuolo(ruolo: string, search: string = ''): Observable<iGiocatore[]> {
    let url = `https://localhost:7260/api/Giocatori?ruolo=${ruolo}`;
    if (search) {
      url += `&search=${search}`;
    }
    return this.http.get<iGiocatore[]>(url);
  }
  
  addGiocatoreWithImage(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
  
}
