import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { iOperazione } from './i-operazione';

@Injectable({
  providedIn: 'root'
})
export class OperazioniService {

  private apiUrl = 'https://localhost:7260/api/Operazione';  

  constructor(private http: HttpClient) { }

  // Metodo per ottenere tutte le operazioni
  getOperazioni(): Observable<iOperazione[]> {
    return this.http.get<iOperazione[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo per ottenere un'operazione per ID
  getOperazioneById(id: number): Observable<iOperazione> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<iOperazione>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo per creare una nuova operazione
  addOperazione(operazione: iOperazione): Observable<any> {
    return this.http.post<any>(this.apiUrl, operazione).pipe(
      catchError(this.handleError)
    );
  }
  
  // Metodo per aggiornare un'operazione esistente
  updateOperazione(operazione: iOperazione): Observable<any> {
    const url = `${this.apiUrl}/${operazione.iD_Operazione}`;
    return this.http.put(url, operazione).pipe(
      catchError(this.handleError)
    );
  }
  
  // Metodo per eliminare un'operazione
  deleteOperazione(idOperazione: number, idSquadra: number, creditiSpesi: number): Observable<void> {
    const params = new HttpParams()
      .set('idSquadra', idSquadra.toString())
      .set('creditiSpesi', creditiSpesi.toString());

    return this.http.delete<void>(`${this.apiUrl}/${idOperazione}`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo per ottenere tutte le operazioni relative a una specifica asta (usando l'ID squadra)
  getOperazioniByAsta(idSquadra: number): Observable<iOperazione[]> {
    const url = `${this.apiUrl}/asta/${idSquadra}`;
    return this.http.get<iOperazione[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo per svincolare un giocatore (con ID asta)
  svincolaGiocatore(idGiocatore: number, idAsta: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/svincola/${idGiocatore}?idAsta=${idAsta}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo per ripristinare un giocatore (con ID asta)
  ripristinaGiocatore(idGiocatore: number, idAsta: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ripristina/${idGiocatore}`, { idAsta }).pipe(
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
