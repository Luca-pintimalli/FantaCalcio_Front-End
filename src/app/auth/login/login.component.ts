import { Component } from '@angular/core';
import { iAuthData } from '../../Models/i-auth-data';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authData:iAuthData = {
    email:'',
    password:''
  }

  errorMessage: string | null = null;


  constructor(
    private authSvc:AuthService,
    private router:Router 
  
  ){}


  onSubmit() {
    this.authSvc.login(this.authData).subscribe({
      next: (response) => {
        // Una volta effettuato il login con successo, reindirizza alla dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Se c'è un errore (come email/password errati), mostra il messaggio di errore
        this.errorMessage = 'Email o password non validi. Riprova.';
      }
    });
  }
}