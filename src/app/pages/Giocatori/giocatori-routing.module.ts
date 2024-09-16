import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiocatoriComponent } from './giocatori.component';
import { ListaComponent } from './Components/lista/lista.component';
import { DettagliComponent } from './Components/dettagli/dettagli.component';
import { AggiungiComponent } from './Components/aggiungi/aggiungi.component';
import { ModificaComponent } from './Components/modifica/modifica.component';

const routes: Routes = [
  { path: 'giocatori', component: ListaComponent },
  { path: 'giocatori/:id', component: DettagliComponent },
  { path: 'giocatori/aggiungi', component: AggiungiComponent },
  { path: 'giocatori/modifica/:id', component: ModificaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiocatoriRoutingModule { }
