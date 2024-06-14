import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserResponse } from '@interfaces/user';
import { UserService } from '@services/user.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  data: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  state: boolean | null = false;
  busqueda: string = '';

  public users$ = new Observable<UserResponse[]>();

  public page = 1;

  public limit = 100;

  private skip = (this.page - 1) * this.limit;

  private destroy$ = new Subject<void>();

  constructor(
    private userSvc: UserService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.users$ = this.userSvc.getUsers(this.skip, this.limit);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  form = this.fb.group({
    search: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    activo: [true],
  });

  ngOnInit(): void {
    this.loadPage(this.page);

    this.userSvc
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.data = response;
        this.totalItems = response.length;
      });
  }

  // --------------- Pagination ----------------
  loadPage(page: number) {
    this.skip = 0;
    this.users$ = this.userSvc.getUsers(this.skip, this.limit);
  }

  onPageChange(page: number) {
    this.page = page;
    this.limit = 100 + this.page * 10;
    if (this.limit <= 110) {
      this.limit = 100;
    }
    this.userSvc
      .getUsers(0, this.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.data = response;
        this.totalItems = response.length;
      });
    this.loadPage(page);
  }

  // We use this for get with a search criteria
  search() {
    this.page = 1;
    this.skip = (this.page - 1) * this.limit;
    this.users$ = this.userSvc.getUsers(
      this.skip,
      this.limit,
      this.form.value.activo!,
      this.form.value.search!
    );

    this.users$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.data = response;
      this.totalItems = response.length;
    });

    this.state = this.form.value.activo!;

    const searchControl = this.form.get('search');

    if (searchControl) {
      const searchValue = searchControl.value;
      this.busqueda = searchValue!;
    }
  }

  cancel() {
    this.location.back();
  }
}
