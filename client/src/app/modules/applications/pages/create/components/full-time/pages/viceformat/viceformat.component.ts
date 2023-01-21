import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViceFormat } from '@interfaces/applications/full_time/vice-format';
import { Topic } from '@interfaces/applications/full_time/development-plan';
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


  ) { }

  public form = this.fb.group({
    time: [NaN, [Validators.required, Validators.min(1), Validators.max(12)]],
    field: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.minLength(10), Validators.maxLength(255)]],
    goals: this.fb.array([this.goalsgroup()], [Validators.required]),
    products: this.fb.array([this.productsgroup()], [Validators.required]),
  });

  public form_dev_plan = this.fb.group({
    title: ['', [Validators.minLength(10), Validators.maxLength(255)]],
    subtitle: ['', [Validators.minLength(10), Validators.maxLength(255)]],
    objectives: this.fb.array([this.objectivesgroup()], [Validators.required])
   
  });

  public form_objective = this.fb.group({
    description: ['', [Validators.minLength(10), Validators.maxLength(255)]],
    actions: this.fb.array([this.actiongroup()], [Validators.required]),
    indicators: this.fb.array([this.indicatorgroup()], [Validators.required])
   
  });
  ngOnInit(): void {
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
    const modalRef = this.modalSvc.open(DevelopmentPlanComponent, { size: 'xl' });
    modalRef.result.then(
      (res: any) => {
          this.dev_action_plan = res;
          console.log(this.dev_action_plan);
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

    // Development plans
    developmentplangroup() {
      return this.fb.group({
        id: [NaN,[Validators.required]],
        title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        subtitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        objectives: this.fb.array([this.objectivesgroup()])
        }
      );
    }

    objectivesgroup(){
      return this.fb.group({
        id: [NaN,[Validators.required]],
        description: ['',[Validators.required]],
        actions: this.fb.array([this.actiongroup()]),
        indicators: this.fb.array([this.indicatorgroup()])
      })
    }
    
    //Actions
    actiongroup() {
      return this.fb.group({
        id: [NaN,[Validators.required]],
        description: [''],
        }
      );
    }
    get actionArr(): FormArray {
      return this.form_objective.get('actions') as FormArray;
    }
  
    addInputAction() {
      this.actionArr.push(this.actiongroup());
    }
  

    //Indicators
    indicatorgroup() {
      return this.fb.group({
        id: [NaN,[Validators.required]],
        description: [''],
        }
      );
    }
  
    get indicatorArr(): FormArray {
      return this.form_objective.get('indicators') as FormArray;
    }
  
    addInputIndicator() {
      this.indicatorArr.push(this.indicatorgroup());
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
