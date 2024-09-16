import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RuoliComponent } from './ruoli.component';

const routes: Routes = [{ path: '', component: RuoliComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuoliRoutingModule { }
