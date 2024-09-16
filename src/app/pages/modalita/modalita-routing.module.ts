import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalitaComponent } from './modalita.component';
import { ModalitaEditComponent } from './Componets/modalita-edit/modalita-edit.component';
import { ModalitaCreateComponent } from './Componets/modalita-create/modalita-create.component';

const routes: Routes = [
  { path: '', component: ModalitaComponent },  // Mostra la lista delle modalità
  { path: 'create', component: ModalitaCreateComponent },  // Rotta per la creazione
  { path: 'edit/:id', component: ModalitaEditComponent }  // Rotta per la modifica
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalitaRoutingModule { }
