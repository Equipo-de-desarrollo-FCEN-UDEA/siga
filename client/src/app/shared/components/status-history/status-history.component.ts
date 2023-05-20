import { Component, Input } from '@angular/core';
import { ApplicationStatus } from '@interfaces/application_status';

@Component({
  selector: 'app-status-history',
  templateUrl: './status-history.component.html',
  styleUrls: ['./status-history.component.scss']
})
export class StatusHistoryComponent {

  @Input() status: ApplicationStatus[] | undefined;
  
  constructor() { }

}
