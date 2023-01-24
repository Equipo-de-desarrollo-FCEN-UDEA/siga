import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoursAvalComponent } from './components/aval-horas/hours-aval.component';

const routes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: 'aval-horas/:token',
        children: [
          {
            path: ':acepted',
            component: HoursAvalComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmationsRoutingModule { }
