// angular and rxjs
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap} from 'rxjs';

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
  ) {}

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
    this.router.navigate(['/login']);
  }

}


