import { Component, Input, OnInit } from '@angular/core';
import { FulltimeResponse } from '../../../../../../../../core/interfaces/applications/full_time/full-time';

@Component({
  selector: 'app-reportfulltime-list',
  templateUrl: './reportfulltime-list.component.html',
  styleUrls: ['./reportfulltime-list.component.scss']
})
export class ReportfulltimeListComponent{

  @Input() fullTime: FulltimeResponse[] | undefined ;

  constructor() { }



}
