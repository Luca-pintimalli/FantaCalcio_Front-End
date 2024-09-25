import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService) { }

  // Metodo per il logout
  logout() {
    this.authService.logout();
  }
  
}
