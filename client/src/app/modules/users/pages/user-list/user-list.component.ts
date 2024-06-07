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
  data: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;

  public users$ = new Observable<UserResponse[]>();

  public page = 1;

  public limit = 10;

  private skip = (this.page - 1) * this.limit;


  constructor(
    private userSvc: UserService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.users$ = this.userSvc.getUsers(this.skip, this.limit,
      false)
    }

  form = this.fb.group({
    search: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    activo: [true]
  })

  ngOnInit(): void {
    this.loadPage(this.page);

    this.userSvc.getUsers().subscribe((response) => {
      this.data = response;
      this.totalItems = response.length;

      console.log(this.data);
      console.log(this.totalItems);
      
      
    });
  }

  // We use this function to manage the pagination
  // nextPage(){
  //   this.page++;
  //   this.skip = (this.page - 1) * this.limit;
  //   this.users$ = this.userSvc.getUsers(
  //     this.skip,
  //     this.limit,
  //     this.form.value.activo!,
  //     this.form.value.search!
  //   );
  // }

  // prevPage(){
  //   this.page--;
  //   this.skip = (this.page - 1) * this.limit;
  //   this.users$ = this.userSvc.getUsers(
  //     this.skip,
  //     this.limit,
  //     this.form.value.activo!,
  //     this.form.value.search!
  //   );
  // }

    // --------------- Pagination ----------------

    loadPage(page: number) {
      this.skip = 0;
      this.users$ = this.userSvc.getUsers(
        this.skip,
        this.limit,
        this.form.value.activo!,
        this.form.value.search!,
      );
    }
  
    onPageChange(page: number) {
      this.page = page;
      this.loadPage(page);

      console.log('page', this.page);
      console.log('skip', this.skip);
      console.log('data',this.data);
      console.log('total', this.totalItems);
      
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

}
