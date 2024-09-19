import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { iUser } from '../Models/i-user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iAuthData } from '../Models/i-auth-data';
import { iAuthResponse } from '../Models/i-auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService(); 
  authSubject = new BehaviorSubject<null | iUser>(null);
  syncIsLoggedIn: boolean = false;

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(user => this.syncIsLoggedIn = user)
  );

  loginUrl: string = 'https://localhost:7260/api/auth/login';
  registerUrl: string = 'https://localhost:7260/api/auth/register';
  updateImgUrl: string = 'https://localhost:7260/api/auth/update-profile-picture';
  usersUrl: string = 'https://localhost:7260/api/users'; // Endpoint per gli utenti

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  // Metodo di registrazione
  register(newUser: FormData): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.registerUrl, newUser);
  }

  // Metodo di login
  login(authData: iAuthData): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.loginUrl, authData).pipe(tap(data => {
      const user: iUser = {
        id: data.id,
        nome: data.userName,
        cognome: data.cognome,
        email: data.email,
        foto: data.foto,
        dataRegistrazione: new Date(data.dataRegistrazione)
      };
  
      this.authSubject.next(user); 
      localStorage.setItem('accessData', JSON.stringify(data)); 
      this.autoLogout();
    }));
  }

  // Metodo di logout
  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/auth']);
  }

  // Logout automatico quando il token scade
  autoLogout() {
    const accessData = this.getAccessData();
    if (!accessData) return;
  
    const token = accessData.token;
    const expDate = this.jwtHelper.getTokenExpirationDate(token);
    if (!expDate) return;
  
    const expMs = expDate.getTime() - new Date().getTime();
    
    if (expMs <= 0) {
      this.logout(); // Se il token è già scaduto, effettua il logout immediato
    } else {
      setTimeout(() => this.logout(), expMs);
    }
  }
  

  // Ottenere i dati di accesso dal localStorage
  getAccessData(): iAuthResponse | null {
    const accessDataJson = localStorage.getItem('accessData');
    if (!accessDataJson) return null;
  
    try {
      return JSON.parse(accessDataJson);
    } catch (error) {
      console.error('Errore nel parsing dei dati di accesso:', error);
      return null;
    }
  }
  

  // Ripristinare l'utente dal token nel localStorage
  restoreUser() {
    const accessData = this.getAccessData();
    if (!accessData) return;
  
    if (this.jwtHelper.isTokenExpired(accessData.token)) return;
  
    const user: iUser = {
      id: accessData.id,
      nome: accessData.userName,
      cognome: accessData.cognome,
      email: accessData.email,
      foto: accessData.foto,
      dataRegistrazione: new Date(accessData.dataRegistrazione)
    };
  
    this.authSubject.next(user);
  }

  // Aggiornare l'immagine del profilo
  updateProfilePicture(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file);
  
    return this.http.put(`${this.updateImgUrl}/${userId}`, formData)
      .pipe(tap((response: any) => {
        const currentUser = this.authSubject.value;
        if (currentUser) {
          currentUser.foto = response.foto;
          this.authSubject.next({ ...currentUser });
          
          const storedAccessData = JSON.parse(localStorage.getItem('accessData') || '{}');
          storedAccessData.foto = response.foto;
          localStorage.setItem('accessData', JSON.stringify(storedAccessData));
        }
      }));
  }

  // Metodo per ottenere un utente per ID
  getUserById(userId: number): Observable<iUser> {
    return this.http.get<iUser>(`${this.usersUrl}/${userId}`);
  }

  // Aggiungi questo metodo per ottenere l'utente loggato
  getUser(): iUser | null {
    const currentUser = this.authSubject.value;
    console.log('Utente loggato:', currentUser);  // Aggiungi questo log per verificare l'utente loggato
    return currentUser;
  }
  
}
