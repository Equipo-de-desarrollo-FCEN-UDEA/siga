import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '@interfaces/application';
import {
  PermissionInDB,
  PermissionResponse,
} from '@interfaces/applications/permission';
import { PermissionService } from '@services/applications/permission.service';
import { DocumentService } from '@services/document.service';
import { lastElement } from '@shared/utils';
import { ComService } from '../../connection/com.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {

  public id: number = 0;
  public error:string = '';

  public permission: PermissionInDB | undefined = undefined;
  public application: Application | undefined = undefined;
  public current_status: string | undefined = undefined;

  constructor(
    private permissionSvc: PermissionService,
    private comSvc: ComService,
    private route: ActivatedRoute,
    private documentSvc: DocumentService
  ) {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.permissionSvc
      .getPermission(this.id)
      .subscribe((app: PermissionResponse) => {
        const { permission, ...application } = app;
        this.permission = permission;
        this.application = application;
        
        this.current_status = lastElement(application.application_status).status.name;
        this.comSvc.push(this.application);
      });
  }

  // -----------------------------------------
  // ------------- OPEN DOCUMENTS ----------
  // -----------------------------------------
  openDocument(path: string) {
    this.documentSvc.getDocument(path).subscribe({
      next: (res) => {
        window.open(window.URL.createObjectURL(res));
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
      },
    });
  }
}
