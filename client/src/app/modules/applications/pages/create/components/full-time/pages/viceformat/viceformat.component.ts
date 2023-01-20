import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViceFormat, DevActionPlan } from '@interfaces/applications/full_time/vice-format';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { ApplicationTypesService } from '@services/application-types.service';
import { DevelopmentPlanComponent } from  './development-plan/development-plan.component'


import Swal from 'sweetalert2';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-viceformat',
  templateUrl: './viceformat.component.html',
  styleUrls: ['./viceformat.component.scss']
})
export class ViceFormatComponent implements OnInit {

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
  public dev_action_plan: DevActionPlan | null = null;

  public dev_action_plan_first_take: number = 0;

  //For handle errors
  public submitted = false;
 

  public id: number = 0;
  //isLoading: Subject<boolean> = this.fulltimesvc.isLoading;
  public applicationType$=this.applicationTypeSvc.getApplicationType(3);
  
  get f() { return this.form.controls; }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fulltimesvc: FullTimeService,
    private modalSvc: NgbModal,

    private applicationTypeSvc: ApplicationTypesService,


  ) { }

  public form = this.fb.group({
    time: [NaN, [Validators.required, Validators.min(1), Validators.max(12)]],
    field: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.minLength(10), Validators.maxLength(255)]],
    goals: this.fb.array([this.goalsgroup()], [Validators.required]),
    products: this.fb.array([this.productsgroup()], [Validators.required]),
    dev_action_plan: [this.developmentplangroup(),Validators.required],
   
  })
  ngOnInit(): void {
       this.dev_action_plan_first_take++;
       this.route.parent?.params.subscribe(
        params => {
          this.id = params['id']
        }
      )
  }

  submit(){
    this.submitted = true;

    
    if (this.form.invalid) {
      return;
    }
    let viceformat= this.fulltimesvc.putViceFormat(this.form.value as ViceFormat, this.id);

  }


  open() {
    const modalRef = this.modalSvc.open(DevelopmentPlanComponent, { size: 'xl' })
    modalRef.result.then(
      (res: any) => {
        const steps = res.steps;
        // for (let i = 0; i < steps[3].indicator.length; i++)  {
        //   this.addInputDevelopmentplan()
        // }
        // const object = {
        //   tema_estrategico: [{tema:steps[0].temas}],
        //   objetivo_estrategico_desarrollo: [{objEstrategico:steps[1].objetivo}],
        //   objetivo_estrategico_institucional: [{objetivo:steps[1].objetivo}],
        //   acciones_estrategicas: [{accion:steps[2].accion}],
        //   indicador: steps[3].indicador
        // }
        const object = {
            tema_estrategico: [{tema:steps[0].temas}],
            objetivo_estrategico_desarrollo: [{objEstrategico:steps[1].objetivo}],
            objetivo_estrategico_institucional: [{objetivo:steps[1].objetivo}],
            acciones_estrategicas: [{accion:steps[2].accion}],
            indicador: steps[3].indicador
          }
          console.log(object);
        //this.fBasicInfo.patchValue(object)
        //console.log(this.fBasicInfo.value)
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

    // Development plans
    developmentplangroup() {
      return this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        subtitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        objectives: ['', [Validators.required]]
    }
      );
    }
  
    get developmentplanArr(): FormArray {
      return this.form.get('dev_action_plan') as FormArray;
    }
  
    addInputDevelopmentplan() {
      this.developmentplanArr.push(this.developmentplangroup());
    }
  
  
  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }
  
  // Delete control
    removeInput(controlName: string, index: number) {
      const control = this.form.get(controlName) as FormArray;
      control.removeAt(index);
    }

    // Delete control
    validSize() {
      return true;
    }

    validFileType() {
      return true;
    }
}
