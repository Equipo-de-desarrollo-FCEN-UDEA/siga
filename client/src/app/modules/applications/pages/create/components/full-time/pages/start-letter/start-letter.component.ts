import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import Swal from 'sweetalert2';
import { InitialLetter } from '../../../../../../../../core/interfaces/applications/full_time/letter';

@Component({
  selector: 'app-start-letter',
  templateUrl: './start-letter.component.html',
  styleUrls: ['./start-letter.component.scss']
})
export class StartLetterComponent implements OnInit {

  public error =' ';
  public id: number = 0;
  public submitted: boolean = false;

  get f() { return this.form.controls; }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fullTimeSvc: FullTimeService,
    private formBuilder: FormBuilder,

  ) { }

  public form = this.formBuilder.group({
    body: [
      '',
      [
        Validators.required,
        Validators.minLength(100),
        Validators.maxLength(250),
      ],
    ],
  });

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params)=> {
      this.id = params ['id']
    })
  }

  submit(){
    this.submitted = true;

    if(this.form.invalid){
      return
    }

    let startLetter = this.fullTimeSvc.putLetter(
      this.form.value as InitialLetter,this.id
    );

    startLetter.subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Actualizado',
          text: '¡La carta de inicio se creo con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3AB795',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([
              'solicitudes/ver/' + this.id + '/dedicacion',
            ]);
          }
        });
      },
    });
    
  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.
    invalid && this.form.get(controlName)?.touched;
  }
  

}



