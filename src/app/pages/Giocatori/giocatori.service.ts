import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { iGiocatore } from './i-giocatore';

@Injectable({
  providedIn: 'root'
})
export class GiocatoriService {
  private apiUrl = 'https://localhost:7260/api/Giocatori';

  constructor(private http: HttpClient) {}
  getAllGiocatori(): Observable<iGiocatore[]> {
    return this.http.get<iGiocatore[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getGiocatoreById(id: number): Observable<iGiocatore> {
    return this.http.get<iGiocatore>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  

  addGiocatore(giocatoreData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, giocatoreData, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError)
    );
  }
  

  updateGiocatoreWithImage(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }
  

  deleteGiocatore(id_Giocatore: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_Giocatore}`).pipe(
      catchError(this.handleError)
    );
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
  updateGiocatoreStato(giocatore: iGiocatore): Observable<any> {
    const url = `${this.apiUrl}/${giocatore.iD_Giocatore}`;  // Rimuovi /giocatori dall'URL
    return this.http.put(url, giocatore).pipe(
      catchError(this.handleError)
    );
  }
  

  getGiocatoriDisponibili(idAsta: number): Observable<iGiocatore[]> {
    const url = `${this.apiUrl}/giocatoriDisponibili?idAsta=${idAsta}`;
    return this.http.get<iGiocatore[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  
  
  
    // Metodo privato per gestire gli errori
    private handleError(error: HttpErrorResponse): Observable<never> {
      let errorMsg: string;
      if (error.error instanceof ErrorEvent) {
        errorMsg = `Errore client: ${error.error.message}`;
      } else {
        errorMsg = error.error.message || "Errore di comunicazione con il server";
      }
      console.error(errorMsg);
      return throwError(errorMsg);
    }
  
}
