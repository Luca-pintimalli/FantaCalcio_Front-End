import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
	isCollapsed = true;
  isLoggedIn:boolean=false 

  constructor(private authSvc:AuthService){}
  ngOnInit() {
    this.authSvc.isLoggedIn$
    .subscribe(isLoggedIn => this.isLoggedIn= isLoggedIn)
    
  }


  logout() {
    // Chiama il metodo logout del servizio AuthService
    this.authSvc.logout();
  }
}
