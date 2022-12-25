import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FulltimeResponse } from '@interfaces/applications/full_time/full-time';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { AuthService } from '@services/auth.service';
import { DocumentService } from '@services/document.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-full-time',
  templateUrl: './full-time.component.html',
  styleUrls: ['./full-time.component.scss'],
})
export class FullTimeComponent implements OnInit {

  public fullTime$!: Observable<FulltimeResponse>;
  
  constructor(
    private route: ActivatedRoute,

    private documentSvc: DocumentService,
    private fullTimeSvc: FullTimeService,
    private authSvc: AuthService
  ) {

    this.authSvc.isSuperUser()
    // this.route.parent?.params.subscribe(
    //   params => {
    //     this.id = params['id']
    //   }
    // )
  }

  ngOnInit(): void {
    // this.fullTimeSvc.getFullTime(this.id)
    //   .subscribe((app: FulltimeResponse) => {
    //     const { commission, ...application } = app;
    //     this.commission = commission;
    //     this.application = application;

    //     this.current_status = lastElement(
    //       application.application_status
    //     ).status.name;
    //     this.comSvc.push(this.application);
    //     this.end_date = new Date(commission.end_date);
    //   });
  }

  openDocument(path: string) {
    this.documentSvc
      .getDocument(path)
      .subscribe((res) => window.open(window.URL.createObjectURL(res)));
  }
}
