import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiocatoreComponent } from './giocatori.component';
import { GiocatoriListPublicComponent } from './Components/giocatori-list-public/giocatori-list-public.component';
import { GiocatoriEditComponent } from './Components/giocatori-edit/giocatori-edit.component';
import { GiocatoriCreateComponent } from './Components/giocatori-create/giocatori-create.component';

const routes: Routes = [
  { path: '', component: GiocatoreComponent },  // Lista giocatori amministrativa
  { path: 'create', component: GiocatoriCreateComponent },  // Creazione giocatore
  { path: 'edit/:id', component: GiocatoriEditComponent },  // Modifica giocatore
  { path: 'public', component: GiocatoriListPublicComponent },  // Lista giocatori pubblica
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiocatoriRoutingModule { }
