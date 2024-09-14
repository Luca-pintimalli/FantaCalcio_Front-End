import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
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

  syncIsLoggedIn:boolean=false ;

  user$ = this.authSubject.asObservable();
  isLoggedIn$=this.user$.pipe(map (user=> !!user),
  tap(user => this.syncIsLoggedIn=user))

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
          dataRegistrazione: new Date(data.dataRegistrazione)
        };
  
        // Salva i dati dell'utente nel BehaviorSubject
        this.authSubject.next(user);
  
        // Salva i dati dell'accesso nel localStorage
        localStorage.setItem('accessData', JSON.stringify(data));
  
        this.autoLogout();
      }));
  }
  
  
  
  
  
  
  

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/auth']); // Aggiunto reindirizzamento dopo il logout
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
  
    // Se non ci sono dati salvati, esci
    if (!accessData) return;
  
    // Verifica se il token è scaduto
    if (this.jwtHelper.isTokenExpired(accessData.token)) {
      console.error('Il token è scaduto.');
      return;
    }
  
    // Ricostruisci l'oggetto utente usando i dati salvati
    const user: iUser = {
      id: accessData.id,
      nome: accessData.userName,
      cognome: accessData.cognome,
      email: accessData.email,
      foto: accessData.foto,
      dataRegistrazione: new Date(accessData.dataRegistrazione)  // Trasforma la stringa in un oggetto Date
    };
  
    // Ripopola lo stato dell'utente
    this.authSubject.next(user);
  
    // Avvia il logout automatico
    this.autoLogout();
  }
  

}
