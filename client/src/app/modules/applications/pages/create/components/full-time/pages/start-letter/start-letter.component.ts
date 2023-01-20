import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import Swal from 'sweetalert2';
import { InitialLetter } from '../../../../../../../../core/interfaces/applications/full_time/letter';
import { LoaderService } from '../../../../../../../../core/services/loader.service';

@Component({
  selector: 'app-start-letter',
  templateUrl: './start-letter.component.html',
  styleUrls: ['./start-letter.component.scss']
})
export class StartLetterComponent implements OnInit {

  public id: number = 0;
  public submitted: boolean = false;

  get f() { return this.form.controls; }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fullTimeSvc: FullTimeService,
    private loaderSvc: LoaderService,
    private formBuilder: FormBuilder,

  ) { 

    this.route.params.subscribe((params)=> {
      this.id = params ['id']
    })
  }

  // Form 
  public form = this.formBuilder.group({
    body: [
      '',
      [
        Validators.required,
        Validators.minLength(100),
        Validators.maxLength(2730),
      ],
    ],
  });



  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        this.id = params['id']
        this.fullTimeSvc.getFullTime(this.id).subscribe(
          data => {
            if (data){
              this.form.patchValue({
                body: data.full_time.initial_letter?.body
              })
            }
          }
        )
      }
    )
  }

  submit(){

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let startLetter: InitialLetter = {
    ... this.form.value as InitialLetter,

   }
   this.fullTimeSvc.putLetter(startLetter, this.id).subscribe(
    
    
    {
      next:(data:any) =>{
        Swal.fire({
          title: 'Carta de iniciación actualizada con éxito',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
    }

    
    // (res:any)=> {
    //   if(res){
    //     Swal.fire(
    //       {
    //         title:'La carta se creo con exito',
    //         icon:'success',
    //         confirmButtonText:'Aceptar'
    //       }
    //     )
       
    //   }
    // }
   )

    // let startLetter = this.fullTimeSvc.putLetter(
    //   this.form.value as InitialLetter,this.id
      
    
    console.log(startLetter)
    
    
  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.
    invalid && this.form.get(controlName)?.touched;
  }

  validSize () {
    return true
  }

  validFileType(){
    return true
  }
  


}



