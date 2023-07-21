import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap} from 'rxjs';
import { Observer } from 'rxjs';

import { UserResponse } from '@interfaces/user';
import { UserService } from '@services/user.service';
import { UserRolResponse } from '@interfaces/userrol';

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

  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute
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

}


