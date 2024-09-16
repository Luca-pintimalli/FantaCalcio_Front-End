import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoAstaComponent } from './tipo-asta.component';
import { TipoAstaCreateComponent } from './Components/tipo-asta-create/tipo-asta-create.component';
import { TipoAstaEditComponent } from './tipo-asta-edit/tipo-asta-edit.component';

const routes: Routes = [
  { path: '', component: TipoAstaComponent }, // Rotta per la lista
  { path: 'create', component: TipoAstaCreateComponent }, // Rotta per la creazione
  { path: 'edit/:id', component: TipoAstaEditComponent } // Rotta per la modifica, che accetta un ID
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoAstaRoutingModule {}
