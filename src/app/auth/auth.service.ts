import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iUser } from '../Models/i-user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iAuthData } from '../Models/i-auth-data';
import { iAuthResponse } from '../Models/i-auth-response';
import { iAuthenticatedUser } from '../Models/i-authenticated-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService(); // Inizializzato correttamente

  authSubject = new BehaviorSubject<null | iUser>(null);

  user$ = this.authSubject.asObservable();

  loginUrl: string = 'https://localhost:7260/api/auth/login';
  registerUrl: string = 'https://localhost:7260/api/auth/register';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.restoreUser();
  }

  register(newUser: FormData): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.registerUrl, newUser);
  }

  login(authData: iAuthData): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.loginUrl, authData)
      .pipe(tap(data => {
        const user: iUser = {
          id: data.id,
          nome: data.userName,
          cognome: data.cognome,
          email: data.email,
          foto: data.foto,
          dataRegistrazione: new Date(data.dataRegistrazione) // Trasforma la stringa in un oggetto Date
        };
  
        // Aggiorna lo stato dell'utente nel BehaviorSubject
        this.authSubject.next(user);
  
        // Salva i dati dell'accesso nel localStorage
        localStorage.setItem('accessData', JSON.stringify(data));
  
        this.autoLogout();
      }));
  }
  
  
  
  
  
  

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/login']); // Aggiunto reindirizzamento dopo il logout
  }

  autoLogout() {
    const accessData = this.getAccessData();

    if (!accessData) {
      console.error('Token non presente o non valido');
      return;
    }

    const token = accessData.token;

    if (!token) {
      console.error('Token assente');
      return;
    }

    const expDate = this.jwtHelper.getTokenExpirationDate(token);

    if (!expDate) {
      console.error('Impossibile determinare la data di scadenza del token.');
      return;
    }

    const expMs = expDate.getTime() - new Date().getTime();
    setTimeout(() => this.logout(), expMs);  // Corretto `this.logout` per mantenere il contesto
  }

  getAccessData(): iAuthResponse | null {
    const accessDataJson = localStorage.getItem('accessData');

    if (!accessDataJson) {
      console.error('Nessun dato di accesso trovato');
      return null;
    }

    try {
      const accessData: iAuthResponse = JSON.parse(accessDataJson);

      console.log('Access token recuperato:', accessData.token);
      return accessData;
    } catch (error) {
      console.error('Errore nel parsing del token', error);
      return null;
    }
  }
  restoreUser() {
    const accessData = this.getAccessData();
  
    if (!accessData) return;
  
    if (this.jwtHelper.isTokenExpired(accessData.token)) return;
  
    const user: iUser = {
      id: 0,  // Se non hai l'ID, puoi lasciare un valore predefinito
      nome: accessData.userName, // Recuperato dal localStorage
      cognome: '', // Puoi aggiungere il supporto per restituire il cognome
      email: '',  // Potresti estendere il backend per restituire questo dato
      password: '',  // La password non è necessaria
      foto: '',  // Gestione della foto opzionale
      dataRegistrazione: undefined  // Lasciamo facoltativo per ora
    };
  
    this.authSubject.next(user);
    this.autoLogout();
  }
  

}
