import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Importa il Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string = '';  // Variabile per memorizzare il messaggio di errore

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router  // Inietta il Router
  ) {
    this.registrationForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Funzione per gestire il file selezionato
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  // Funzione per gestire la submit del form
  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = new FormData();

      // Aggiungi i campi del form
      formData.append('nome', this.registrationForm.get('nome')?.value);
      formData.append('cognome', this.registrationForm.get('cognome')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append('password', this.registrationForm.get('password')?.value);

      // Se è stato selezionato un file, aggiungilo
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      }

      // Esegui la richiesta HTTP
      this.http.post('https://localhost:7260/api/auth/register', formData)
        .subscribe(
          response => {
            console.log('Registrazione completata:', response);
            // Reindirizza alla pagina di login dopo la registrazione
            this.router.navigate(['/login']);  // Modifica questa linea per il percorso del login
          },
          error => {
            console.error('Errore nella registrazione', error);
            // Se c'è un errore (come l'email già esistente), mostra il messaggio
            if (error.status === 400) {
              this.errorMessage = error.error.Message || 'Registrazione fallita. Email già in uso.';
            } else {
              this.errorMessage = 'Errore nella registrazione. Riprova più tardi.';
            }
          }
        );
    }
  }
}
