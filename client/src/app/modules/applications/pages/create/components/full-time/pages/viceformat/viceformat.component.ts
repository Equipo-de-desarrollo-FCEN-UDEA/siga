import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViceFormat } from '@interfaces/applications/full_time/vice-format';
import { Topic } from '@interfaces/applications/full_time/development-plan';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { ApplicationTypesService } from '@services/application-types.service';
import { FormsStatusService } from "@services/applications/full_time/interaction-components/forms-status.service";
import { DevelopmentPlanComponent } from  './development-plan/development-plan.component'
import { FulltimeResponse } from '@interfaces/applications/full_time/full-time';


import Swal from 'sweetalert2';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { viewport } from '@popperjs/core';


@Component({
  selector: 'app-viceformat',
  templateUrl: './viceformat.component.html',
  styleUrls: ['./viceformat.component.scss']
})
export class ViceFormatComponent implements OnInit, AfterViewInit {

  @Input() editable: any;


  //Description
  public field2fill: any = [
    'Docencia',
    'Extensión',
    'Investigación',
    'Administración'
  ];

  public required_time: Number = 0;
  public description: string | null = null;
  public goals: any[]=[];
  public products: any[]=[];
  public dev_action_plan: Topic [] = [];

  public dev_action_plan_first_take: number = 0;

  //For handle errors
  public submitted = false;


  public id: number = 0;
  public applicationType$=this.applicationTypeSvc.getApplicationType(3);

  get f() { return this.form.controls; }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fulltimesvc: FullTimeService,
    private modalSvc: NgbModal,

    private applicationTypeSvc: ApplicationTypesService,

    public formsStatusService: FormsStatusService,

  ) { }

  public form = this.fb.group({
    time: [NaN, [Validators.required, Validators.min(1), Validators.max(12)]],
    field: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
    goals: this.fb.array([this.goalsgroup()], [Validators.required]),
    products: this.fb.array([this.productsgroup()], [Validators.required]),
    dev_action_plan: [this.dev_action_plan, [Validators.required]]
  });



  ngOnInit(): void {
       this.route.params.subscribe(
        params => {
          this.id = params['id']
        }
      )
      this.fulltimesvc.getFullTime(this.id).subscribe(
        data=>{
          if(data.full_time.vice_format){
            this.form.patchValue(data.full_time.vice_format);
            this.patchGoal(data.full_time.vice_format.goals);
            this.patchProduct(data.full_time.vice_format.products)
            this.dev_action_plan = data.full_time.vice_format.dev_action_plan;
          }

        }
      );
  }

  ngAfterViewInit(): void {

  }
  submit(){
    this.submitted = true;



    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: '¡Revise que haya llenado todos los campos que el Formato sugiere!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }
    // let body : any= this.form.value;
    // body.goals = body.goals?.map((goal:any)=>goal.goal);
    // body.products = body.products?.map((product:any)=>product.product);
      console.log(this.form.value);
    this.fulltimesvc.putViceFormat(this.form.value as ViceFormat, this.id).subscribe(
      {
        next: (data) => {
          Swal.fire({
            title: 'Creado',
            text: '¡El Formato de Vicerrectoría se creó con éxito!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3AB795',
          }).then((result) => {
            if (result.isConfirmed) {
              this.formsStatusService.setViceFormatStatus(true);
              this.router.navigate([`/solicitudes/editar/${this.id}/dedicacion`])
            }
          });
        },
        error: (err)=> {
          //this.error = err
        }
      }
    );



  }


  open() {
    const modalRef = this.modalSvc.open(DevelopmentPlanComponent, { size: 'xl' });
    modalRef.componentInstance.planTrabajo = this.dev_action_plan;
    modalRef.result.then(
      (res: any) => {
          this.dev_action_plan = res;
          //console.log(this.dev_action_plan);
          //console.log(this.form.value);
          this.form.controls['dev_action_plan'].setValue(this.dev_action_plan);
          this.dev_action_plan_first_take++;
      }
    ).catch(
      (err:any) => {
        Swal.fire({
          icon: 'error',
          text: 'Algo ocurrió mal, vuelve a seleccional tu plan de desarrollo institucional',
          confirmButtonText: 'Aceptar'
        })
      }
    );

  }


  //Goals
  goalsgroup(){
    return this.fb.group({
      goal: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }
  get goalsArr(): FormArray {
    return this.form.get('goals') as FormArray;
  }
  addInputGoals() {
    this.goalsArr.push(this.goalsgroup());
  }

  patchGoal(goals: any[]) {
    for (let [i, meta] of goals.entries()) {
      if (i != 0) {
        this.addInputGoals();
      }
    }
    this.goalsArr.patchValue(goals)
  }

  //Products
  productsgroup() {
    return this.fb.group({
      product: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }
  get productsArr(): FormArray {
    return this.form.get('products') as FormArray;
  }

  addInputProducts() {
    this.productsArr.push(this.productsgroup());
  }

  patchProduct(productos: any) {
    for (let [i, producto] of productos.entries()) {
      if (i != 0) { this.addInputProducts(); }
    }
    this.productsArr.patchValue(productos);
  }

   isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

  // Delete control
    removeInput(controlName: string, index: number) {
      const control = this.form.get(controlName) as FormArray;
      control.removeAt(index);
    }

    // ValidSize
    validSize() {
      return true;
    }

    // ValidFileType
    validFileType() {
      return true;
    }
}
