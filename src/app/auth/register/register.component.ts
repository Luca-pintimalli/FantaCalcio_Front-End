import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // Importa il Router per il reindirizzamento
import { iUser } from '../../Models/i-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  newUser: Partial<iUser> = {};
  selectedFile: File | null = null; // Variabile per gestire il file
  errorMessage: string | null = null;  // Variabile per gestire il messaggio di errore

  constructor(private authSvc: AuthService, private router: Router) {}

  // Metodo per gestire la selezione del file
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Modifica del metodo register per inviare un FormData
  register() {
    // Prima di eseguire la registrazione, resetta l'errore
    this.errorMessage = null;

    const formData = new FormData();

    // Aggiunge i campi utente al FormData
    formData.append('nome', this.newUser.nome || '');
    formData.append('cognome', this.newUser.cognome || '');
    formData.append('email', this.newUser.email || '');
    formData.append('password', this.newUser.password || '');

    // Aggiunge il file foto se esiste
    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    // Chiama il servizio di registrazione
    this.authSvc.register(formData).subscribe(
      response => {
        console.log('Registrazione avvenuta con successo', response);
        // Reindirizza alla pagina di login o dashboard dopo la registrazione
        this.router.navigate(['/login']);
      },
      error => {
        // Gestisci l'errore in base allo stato e messaggio
        if (error.status === 400 && error.error.message === 'Email già in uso.') {
          this.errorMessage = 'L\'email è già in uso. Per favore, usa un\'altra email.';
        } else {
          // Messaggio di errore generico se non è legato all'email già in uso
          this.errorMessage = 'Errore durante la registrazione. Riprova più tardi.';
        }
        console.error('Errore durante la registrazione', error);
      }
    );
  }
}
