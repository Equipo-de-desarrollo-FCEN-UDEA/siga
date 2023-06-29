import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResponse } from '@interfaces/user';
import { LoaderService } from '@services/loader.service';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users$ = new Observable<UserResponse[]>();

  public page = 1;

  public limit = 100;

  private skip = (this.page - 1) * this.limit;


  constructor(
    private userSvc: UserService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.users$ = this.userSvc.getUsers(this.skip, this.limit)

  }

  form = this.fb.group({
    search: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    activo: [true]
  })

  ngOnInit(): void {
    
  }

  // We use this function to manage the pagination
  nextPage(){
    this.page++;
    this.skip = (this.page - 1) * this.limit;
    this.users$ = this.userSvc.getUsers(
      this.skip, 
      this.limit, 
      this.form.value.activo!, 
      this.form.value.search!
    );
  }

  prevPage(){
    this.page--;
    this.skip = (this.page - 1) * this.limit;
    this.users$ = this.userSvc.getUsers(
      this.skip, 
      this.limit,
      this.form.value.activo!, 
      this.form.value.search!
    );
  }

  // We use this for get with a search criteria
  search() {
    this.page = 1
    this.skip = (this.page - 1) * this.limit;
    this.users$ = this.userSvc.getUsers(
      this.skip, 
      this.limit,
      this.form.value.activo!, 
      this.form.value.search!
    );
  }

  cancel() {
    this.location.back();
  }

  // eliminar(id: number) {
  //   Swal.fire({
  //     text: "¿Está seguro de querer eliminar el user?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     cancelButtonText: "Cancelar",
  //     confirmButtonText: "Eliminar",
  //     buttonsStyling: false,
  //     customClass: {
  //       confirmButton: "button is-danger is-rounded",
  //       cancelButton: "button ml-2 is-dark is-rounded is-outlined"
  //     }
  //   }).then((res) => {
  //     if (res.isConfirmed) {
  //       this.userSvc.deleteuser(id).subscribe({
  //         next: (data: any) => {
  //           Swal.fire({
  //             text: 'El user ha sido eliminado',
  //             icon: 'success',
  //             confirmButtonText: 'Continuar'
  //           }).then(() => {
  //             this.router.navigate(['/users']);
  //           })
  //         }
  //       })
  //     }
  //   })
  // }

}
