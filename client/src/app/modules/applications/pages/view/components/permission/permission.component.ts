import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// interfaces
import { Application } from '@interfaces/application';
import {
  PermissionInDB,
  PermissionResponse,
} from '@interfaces/applications/permission';

// Services
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
    private comSvc: ComService,
    private route: ActivatedRoute,
    private router: Router,

    private permissionSvc: PermissionService,
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


  // -----------------------------------------
  // ----------- DELETE PERMISSION ------------
  // -----------------------------------------
  delete(id: number): void {
    
    Swal.fire({
      title: '¿Seguro que quieres eliminar este permiso?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.permissionSvc.deletePermission(id).subscribe({
          next: () => {
             Swal.fire({
              title: 'Eliminada!',
              text: '¡El permiso ha sido eliminado!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/home/home']);
              }
            });
          },
          error: (err) => {
            if (err.status === 404 || err.status === 401) {
              this.error = err
            }
          },
        });
      }
    });
  }

}
