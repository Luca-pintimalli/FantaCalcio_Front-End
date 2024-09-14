import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../Models/i-user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']  // Corretto: styleUrls al plurale
})
export class DashboardComponent implements OnInit {

  user!: iUser;  // Assicurati che venga inizializzato

  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }
  


  // Funzione per ottenere l'URL completo della foto dell'utente
  getUserPhotoUrl(foto: string | undefined): string {
    const backendUrl = 'https://localhost:7260'; // Cambia con il tuo dominio in produzione
    const photoUrl = foto ? `${backendUrl}${foto}` : `${backendUrl}/uploads/default-avatar.jpg`;
    return photoUrl;
  }
  
}
