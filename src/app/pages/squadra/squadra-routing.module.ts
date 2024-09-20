import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SquadraComponent } from './squadra.component';
import { SquadraCreateComponent } from './Components/squadra-create/squadra-create.component';
import { SquadraEditComponent } from './Components/squadra-create/squadra-edit/squadra-edit.component';

const routes: Routes = [
  { path: '', component: SquadraComponent },
  { path: 'create', component: SquadraCreateComponent }, // Aggiungi il percorso per creare una squadra
  { path: 'edit/:id', component: SquadraEditComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SquadraRoutingModule { }
