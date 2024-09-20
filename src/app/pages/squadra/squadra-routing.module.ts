import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SquadraComponent } from './squadra.component';
import { SquadraCreateComponent } from './Components/squadra-create/squadra-create.component';

const routes: Routes = [
  { path: '', component: SquadraComponent },
  { path: 'create', component: SquadraCreateComponent } // Aggiungi il percorso per creare una squadra
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SquadraRoutingModule { }
