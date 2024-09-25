import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../Models/i-user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importa il servizio per gestire il modale

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: iUser;
  selectedFile: File | null = null;

  constructor(private authSvc: AuthService, private modalService: NgbModal) {} // Inietta NgbModal

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

  open(content: any) {
    this.modalService.open(content, { backdrop: 'static', centered: true, windowClass: 'custom-modal-class' });
  }

  // Funzione per aggiornare la foto, ma non obbligatoria
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
  onFileSelected(event: any) {
    if (event.target && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; // Associa il file selezionato
      console.log('File selezionato:', this.selectedFile);
    } else {
      console.warn('Nessun file selezionato');
    }
  }

  // Funzione per chiudere il modale senza essere obbligato ad aggiornare la foto
  closeModal(modal: any) {
    modal.close(); // Chiude il modale senza fare nulla
  }

  getUserPhotoUrl(foto: string | undefined): string {
    const backendUrl = 'https://localhost:7260';
    return foto ? `${backendUrl}${foto}` : `${backendUrl}/uploads/default-avatar.jpg`;
  }
}
