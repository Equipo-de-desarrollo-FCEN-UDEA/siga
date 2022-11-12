import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ComService } from '../../connection/com.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  constructor(
    private comSvc: ComService
  ) {
    
   }

  ngOnInit(): void {
    // this.comSvc.push('Algo');
  }

}
