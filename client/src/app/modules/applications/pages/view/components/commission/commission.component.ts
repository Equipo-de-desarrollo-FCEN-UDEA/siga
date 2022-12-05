import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '@interfaces/application';
import { CommissionInDB, CommissionResponse } from '@interfaces/applications/commission';
import { CommissionService } from '@services/applications/commission.service';
import { AuthService } from '@services/auth.service';
import { DocumentService } from '@services/document.service';
import { lastElement } from '@shared/utils';
import { ComService } from '../../connection/com.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {

  public id: number = 0;

  public commission: CommissionInDB | undefined = undefined;

  public application: Application | undefined = undefined;

  public current_status: string = '';

  public today = new Date();

  public end_date = new Date();

  public isSuperUser$ = this.authSvc.isSuperUser$;

  constructor(
    private route: ActivatedRoute,

    private commissionSvc: CommissionService,
    private comSvc: ComService,
    private documentService: DocumentService,
    private authSvc: AuthService
  ) {
    this.route.parent?.params.subscribe(
      params => {
        this.id = params['id']
      }
    )
   }

  ngOnInit(): void {
    
    this.commissionSvc.getCommission(this.id).subscribe(
      (app: CommissionResponse) => {
        const {commission, ...application} = app;
        this.commission = commission;
        this.application = application;

        this.current_status = lastElement(application.application_status).status.name;
        this.comSvc.push(this.application);
        this.end_date = new Date(commission.end_date)
      }
    )
  }

  openDocument(path:string) {
    this.documentService.getDocument(path).subscribe(
      res => window.open(window.URL.createObjectURL(res))
    )
  }

}
