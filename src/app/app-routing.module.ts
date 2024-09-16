import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './auth/guest.guard';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
 { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },

 { path: 'auth', 
   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
   canActivate: [GuestGuard],
  canActivateChild:[GuestGuard], }, 
 

 { path: 'dashboard', 
  loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
canActivate:[AuthGuard],
canActivateChild:[AuthGuard] },


{ path: 'giocatori', 
loadChildren: () => import('./pages/Giocatori/giocatori.module').then(m => m.GiocatoriModule),
canActivate: [AuthGuard], // Protezione tramite AuthGuard
canActivateChild: [AuthGuard] // Protezione anche per le sottorotte dei giocatori
},

{ path: 'ruoli', 
loadChildren: () => import('./pages/Ruoli/ruoli.module').then(m => m.RuoliModule),
canActivate: [AuthGuard],
canActivateChild: [AuthGuard]
},
{ 
  path: 'modalita', 
  loadChildren: () => import('./pages/modalita/modalita.module').then(m => m.ModalitaModule),
  canActivate: [AuthGuard],  // Aggiunta protezione AuthGuard
  canActivateChild: [AuthGuard] 
}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
