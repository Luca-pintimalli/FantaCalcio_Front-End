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
  updateImgUrl:string='https://localhost:7260/api/auth/update-profile-picture'
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
          id: data.id,  // Assicurati che 'id' sia popolato correttamente
          nome: data.userName,
          cognome: data.cognome,
          email: data.email,
          foto: data.foto,
          dataRegistrazione: new Date(data.dataRegistrazione)
        };
  
        console.log('User ID al login:', user.id); // Log per controllare l'ID
  
        this.authSubject.next(user);  // Salva l'utente con l'ID corretto
  
        localStorage.setItem('accessData', JSON.stringify(data));  // Salva anche l'ID nel localStorage
  
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
    
    if (!accessData) return;
  
    if (this.jwtHelper.isTokenExpired(accessData.token)) return;
  
    // Ricostruisci l'oggetto utente usando i dati salvati, inclusa la foto aggiornata
    const user: iUser = {
      id: accessData.id,
      nome: accessData.userName,
      cognome: accessData.cognome,
      email: accessData.email,
      foto: accessData.foto,  // Assicurati che questo sia il percorso aggiornato
      dataRegistrazione: new Date(accessData.dataRegistrazione)
    };
  
    this.authSubject.next(user);
  }
  
  
  
  
  updateProfilePicture(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file);
  
    return this.http.put(`${this.updateImgUrl}/${userId}`, formData)
      .pipe(tap((response: any) => {
        console.log('Foto aggiornata con successo, percorso immagine aggiornato:', response.foto);
        
        // Aggiorna l'oggetto utente con il nuovo percorso dell'immagine
        const currentUser = this.authSubject.value;
        if (currentUser) {
          currentUser.foto = response.foto;  // Aggiorna la foto nell'oggetto utente
          this.authSubject.next({ ...currentUser });  // Aggiorna il BehaviorSubject
          
          // Aggiorna anche il localStorage con i nuovi dati dell'utente
          const storedAccessData = JSON.parse(localStorage.getItem('accessData') || '{}');
          storedAccessData.foto = response.foto;
          localStorage.setItem('accessData', JSON.stringify(storedAccessData));
        }
      }));
  }
  
  

}