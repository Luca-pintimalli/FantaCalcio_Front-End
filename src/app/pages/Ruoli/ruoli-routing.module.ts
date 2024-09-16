import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RuoliComponent } from './ruoli.component';
import { RuoliCreateComponent } from './Components/ruoli-create/ruoli-create.component';
import { RuoliEditComponent } from './Components/ruoli-edit/ruoli-edit.component';

const routes: Routes = [
  { path: '', component: RuoliComponent }, // Lista dei ruoli
  { path: 'create', component: RuoliCreateComponent }, // Creazione di un nuovo ruolo
  { path: 'edit/:id', component: RuoliEditComponent } // Modifica di un ruolo esistente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuoliRoutingModule { }
