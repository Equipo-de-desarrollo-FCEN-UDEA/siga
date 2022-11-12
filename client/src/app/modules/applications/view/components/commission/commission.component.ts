import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '@interfaces/application';
import { CommissionInDB, CommissionResponse } from '@interfaces/applications/commission';
import { CommissionService } from '@services/applications/commission.service';
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

  constructor(
    private commissionSvc: CommissionService,
    private comSvc: ComService,
    private route: ActivatedRoute
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
        this.commission = commission
        this.application = application
        this.comSvc.push(this.application)
      }
    )
  }

}
