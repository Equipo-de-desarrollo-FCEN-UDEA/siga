import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { WorkplanComponent } from './pages/workplan/workplan.component';

const routes: Routes = [
  {
    path: 'plan-de-trabajo',
    component: WorkplanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullTimeRoutingModule { }
