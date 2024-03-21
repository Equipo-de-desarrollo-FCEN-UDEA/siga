import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
