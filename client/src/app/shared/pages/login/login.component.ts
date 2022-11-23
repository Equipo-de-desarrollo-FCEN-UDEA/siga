import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@interfaces/auth';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: Subject<boolean> = this.loadingService.isLoading;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoaderService
  ) { }

  form = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]]
  });


  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  submit() {
    this.authService.login(this.form.value as Auth).subscribe({
      next: () => {
        this.router.navigate(['/home'])
      }
    })
  }

}
