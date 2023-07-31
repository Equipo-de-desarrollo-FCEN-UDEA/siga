// angular and rxjs
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap} from 'rxjs';
import { Location } from '@angular/common';

// interfaces and services
import { UserResponse } from '@interfaces/user';
import { UserService } from '@services/user.service';
import { UserRolResponse } from '@interfaces/userrol';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rol-selection',
  templateUrl: './rol-selection.component.html',
  styleUrls: ['./rol-selection.component.scss']
})
export class RolSelectionComponent implements OnInit{

  // Title for the header of create application
  public title: string = '';
  public button: string = '';

  private activatedComponentReference: any;

  public user: UserResponse | undefined;
  public userResponse!: UserResponse;
  public id: number | string = 0;
  public userRol: UserRolResponse[] = [];
  public selectedRol: { rol_id: string} = { rol_id: ''};
  public form = this.fb.group({
    rol_id: ['', Validators.required]
  });

  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) {
      // We take the title from the child data
      this.button = this.activateRoute.snapshot.firstChild?.data['button'];
      this.title = this.activateRoute.snapshot.firstChild?.data['title'];
  }

  onActivate(componentRef: any) {
    this.activatedComponentReference = componentRef
  }

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap(params => {
        this.id = params['id'];
        return this.userService.getUser(params['id']);
      })
    ).subscribe({
      next: (user: UserResponse) => {
        this.user = user;
        this.userRol = user.userrol;
        console.log(this.userRol);
      },
      error: (error: any) => {
        console.log('Error al obtener el usuario', error);
      }
    });
  }

  onSelec(event: Event): void{
    const target = event.target as HTMLSelectElement;
    this.selectedRol.rol_id = target.value;
    console.log('Id->', this.selectedRol.rol_id);
  }

  onSubmitRol(){
    //this.userService.updateUserRol(this.id, this.selectedRol).subscribe({});
    this.router.navigate(['/home']);
  }

  onCancel(){
    this.location.back();
  }

  click() {
    const childRouteComp = this.activatedComponentReference;
    childRouteComp.submit();
  }

  invalidForm() {
    const childRouteComp = this.activatedComponentReference;
    let validSize = !childRouteComp.validSize();
    let validFileType = !childRouteComp.validFileType();

    return validSize || validFileType
  }
}