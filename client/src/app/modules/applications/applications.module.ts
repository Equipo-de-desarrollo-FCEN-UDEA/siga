import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationListComponent } from './pages/application-list/application-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ApplicationListComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ],
})
export class ApplicationsModule {}
