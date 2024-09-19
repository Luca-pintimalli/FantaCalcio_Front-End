import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './auth/guest.guard';
import { AuthGuard } from './auth/auth.guard';
import { RuoloMantraComponent } from './pages/Ruoli/Components/ruolo-mantra/ruolo-mantra.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard] 
  }, 
  { 
    path: 'dashboard', 
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard] 
  },
  { 
    path: 'giocatori', 
    loadChildren: () => import('./pages/Giocatori/giocatori.module').then(m => m.GiocatoriModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard] 
  },
  { 
    path: 'ruoli', 
    loadChildren: () => import('./pages/Ruoli/ruoli.module').then(m => m.RuoliModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard] 
  },
  { 
    path: 'modalita', 
    loadChildren: () => import('./pages/modalita/modalita.module').then(m => m.ModalitaModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard] 
  },
  { 
    path: 'TipoAsta', 
    loadChildren: () => import('./pages/tipo-asta/tipo-asta.module').then(m => m.TipoAstaModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard] 
  },
  {
    path: 'ruolo-mantra/:id',
    component: RuoloMantraComponent,  // Il componente per l'associazione ruoli
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]  // Se vuoi proteggere la route con l'autenticazione
  },
  { path: 'Asta', 
  loadChildren: () => import('./pages/asta/asta.module').then(m => m.AstaModule),
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard] 
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
