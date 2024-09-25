import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgbOffcanvas, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importa anche il servizio per gestire i modali
import { iUser } from '../../Models/i-user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user!: iUser;
  selectedFile: File | null = null;

  constructor(private authSvc: AuthService, private offcanvasService: NgbOffcanvas, private modalService: NgbModal) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  openOffcanvas(content: any) {
    this.offcanvasService.open(content, { scroll: true });
  }

  openModal(modalContent: any) {
    this.modalService.open(modalContent, { backdrop: 'static', centered: true });
  }

  onFileSelected(event: any) {
    if (event.target && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.selectedFile && this.user) {
      this.authSvc.updateProfilePicture(this.user.id, this.selectedFile).subscribe(
        response => {
          console.log('Foto aggiornata con successo');
        },
        error => {
          console.error('Errore durante l\'aggiornamento della foto:', error);
        }
      );
    }
  }
  triggerFileInput() {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    fileInput?.click(); // Simula il click sull'input file
  }
  
  closeModal(modal: any) {
    modal.close();
  }

  logout() {
    this.authSvc.logout();
  }

  getUserPhotoUrl(foto: string | undefined): string {
    const backendUrl = 'https://localhost:7260';
    return foto ? `${backendUrl}${foto}` : `${backendUrl}/uploads/default-avatar.jpg`;
  }
}
