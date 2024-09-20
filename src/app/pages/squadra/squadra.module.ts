import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SquadraRoutingModule } from './squadra-routing.module';
import { SquadraCreateComponent } from './Components/squadra-create/squadra-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SquadraComponent } from './squadra.component';


@NgModule({
  declarations: [
    SquadraComponent,
    SquadraCreateComponent
  ],
  imports: [
    CommonModule,
    SquadraRoutingModule,
    ReactiveFormsModule
  ]
})
export class SquadraModule { }
