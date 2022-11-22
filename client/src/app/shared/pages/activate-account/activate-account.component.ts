import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate-account',
  template: ''
})
export class ActivateAccountComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authSvc: AuthService
  ) {
    let activateEmail = this.route.params.pipe(
      switchMap((params: any) => {
        return this.authSvc.activateEmail(params['token'])
      })
    );
    activateEmail.subscribe({
      next: res => {
        Swal.fire({
          title: 'Activación de cuenta',
          text: 'Su cuenta se activó correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then(
          response => {
            if (response.isConfirmed) {
              this.router.navigate(['/login'])
            }
          }
        )
      },
      error: res => {
        this.router.navigate(['/login'])
      }
    })
  }

  ngOnInit(): void {
  }

}
