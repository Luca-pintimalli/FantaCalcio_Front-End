import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importa le classi necessarie
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;  // Definisci un FormGroup per il form
  selectedFile: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,  // Usa il FormBuilder per creare il form
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Inizializza il form con le validazioni
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],  // Campo obbligatorio
      cognome: ['', Validators.required],  // Campo obbligatorio
      email: ['', [Validators.required, Validators.email]],  // Campo obbligatorio e deve essere un'email valida
      password: ['', Validators.required],  // Campo obbligatorio
    });
  }

  // Metodo per gestire la selezione del file
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Metodo per registrare l'utente
  register() {
    if (this.registerForm.invalid) {
      // Se il form non è valido, mostra un messaggio di errore
      this.errorMessage = 'Per favore, inserisci tutti i dati richiesti.';
      return;
    }

    // Reset dell'errore
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('nome', this.registerForm.get('nome')?.value);
    formData.append('cognome', this.registerForm.get('cognome')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);

    // Aggiunge il file foto se esiste
    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    this.authSvc.register(formData).subscribe(
      response => {
        console.log('Registrazione avvenuta con successo', response);
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 400 && error.error.message === 'Email già in uso.') {
          this.errorMessage = 'L\'email è già in uso. Per favore, usa un\'altra email.';
        } else {
          this.errorMessage = 'Errore durante la registrazione. Riprova più tardi.';
        }
        console.error('Errore durante la registrazione', error);
      }
    );
  }
}
