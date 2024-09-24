import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FantacalcioComponent } from './fantacalcio.component';

const routes: Routes = [
  { path: '', component: FantacalcioComponent },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FantacalcioRoutingModule { }
