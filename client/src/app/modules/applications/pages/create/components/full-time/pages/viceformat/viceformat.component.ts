import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViceFormat, DevActionPlan, Objectives } from '@interfaces/applications/full_time/vice-format';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { ApplicationTypesService } from '@services/application-types.service';
import {WorkplanComponent} from  '../workplan/workplan.component'


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

    //private viceform: ViceFormat,
    //private objectiv: Objectives

  ) { }

  public form = this.fb.group({
    application_sub_type_id: [0, [Validators.required]],
    time: [NaN, [Validators.required, Validators.min(1), Validators.max(12)]],
    field: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.minLength(10), Validators.maxLength(255)]],
    goals: this.fb.array([this.goalsgroup()], [Validators.required]),
    products: this.fb.array([this.productsgroup()], [Validators.required]),
   
  })
  ngOnInit(): void {
       //this.dev_action_plan_first_take++;
       this.route.parent?.params.subscribe(
        params => {
          this.id = params['id']
         
          this.fulltimesvc.getFullTime(this.id).subscribe(
            data => {
              this.form.patchValue(
                {
                  ...data.full_time,
                  application_sub_type_id: data.application_sub_type_id
                }
              )
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
    let viceformat= this.fulltimesvc.putViceFormat(this.form.value as ViceFormat, this.id);

    if (this.fulltimesvc) {
      // let pathAcciones = this.formatoVice.intermediate_formatos_accion.map(intermediate => intermediate.id)
      // let pathIndicadores = this.formatoVice.intermediate_formatos.map(intermadiate => intermadiate.id)
      // let pathMetasProductos = this.formatoVice.intermediate_metas_productos.map(intermediate => intermediate.id)
      // this.formatoSvc.patchFotmato(this.formatoVice.id, FormatoVice, pathAcciones, pathIndicadores, pathMetasProductos).subscribe(
      //   (res: any) => {
      //     if (res) {
      //       Swal.fire(
      //         {
      //           text: 'Formato actualizado con éxito',
      //           icon: 'success',
      //           confirmButtonText: 'Aceptar'
      //         }
      //       )
      //     }
      //   }, error => {
      //     Swal.fire({
      //       text: 'Algo malo pasó vuelve a intentar',
      //       icon:'error',
      //       confirmButtonText: 'Aceptar'
      //     })
      //   }
      // )
    } else {
      // this.formatoSvc.postFormulario(FormatoVice).subscribe(
      //   (res: any) => {
      //     if (res) {
      //       Swal.fire({
      //         text: 'Formato generado con éxito',
      //         icon: 'success',
      //         confirmButtonText: 'Aceptar'
      //       }
      //       )
      //       this.comunicationSvc.setFormatoSuccess(true);
      //     }
      //   }
      // );
    }

  }


  open() {
    const modalRef = this.modalSvc.open(WorkplanComponent, { size: 'xl' })
    
     // modalRef.componentInstance.intermadiateFormatosIn = this.formatoVice.intermediate_formatos
     // modalRef.componentInstance.intermediateFormatosAccion = this.formatoVice.intermediate_formatos_accion
    
    // modalRef.result.then(
    //   (res: any) => {
    //     this.acciones = res.acciones;
    //     this.objetivos_has_indicador = res.objetivos_has_indicador;
    //     console.log(this.acciones, this.objetivos_has_indicador);
    //     this.PlanDesarrolloFirstTake++;
    //   }
    // ).catch(
    //   (err: any) => {
    //     Swal.fire({
    //       icon: 'error',
    //       text: 'Algo ocurrió mal, vuelve a seleccional tu plan de desarrollo institucional',
    //       confirmButtonText: 'Aceptar'
    //     })
    //   }
    // );
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
}
