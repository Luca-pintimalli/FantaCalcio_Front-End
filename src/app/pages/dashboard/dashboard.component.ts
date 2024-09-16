import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../Models/i-user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  user!: iUser;
  selectedFile: File | null = null;

  constructor(private authSvc: AuthService) {}
  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.user = user;
        console.log('Utente recuperato:', this.user); // Verifica i dati dell'utente
        console.log('ID utente recuperato:', this.user.id); // Verifica l'ID dell'utente
      } else {
        console.error('Nessun utente trovato');
      }
    });
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile && this.user) {
      console.log('Selected file for upload:', this.selectedFile);
  
      this.authSvc.updateProfilePicture(this.user.id, this.selectedFile).subscribe(
        response => {
          console.log('Foto aggiornata con successo, percorso immagine aggiornato:', response.foto);
  
          // L'immagine dell'utente viene aggiornata automaticamente grazie al BehaviorSubject
        },
        error => {
          console.error('Errore durante l\'aggiornamento della foto:', error);
        }
      );
    } else {
      console.warn('Nessun file selezionato o utente non trovato');
    }
  }
  

  getUserPhotoUrl(foto: string | undefined): string {
    const backendUrl = 'https://localhost:7260';
    return foto ? `${backendUrl}${foto}` : `${backendUrl}/uploads/default-avatar.jpg`;
  }
}
