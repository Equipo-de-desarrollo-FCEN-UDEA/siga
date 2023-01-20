import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevelopmentPlan } from '@interfaces/applications/full_time/development-plan';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tema, Objetivo, developmentplan } from '@shared/data/development-plan';
//import { prefix } from '@shared/data/ruta-api';
import { Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-development-plan.component',
  templateUrl: './development-plan.component.html',
  styleUrls: ['./development-plan.component.scss']
})



export class DevelopmentPlanComponent implements OnInit {

  @Input() planTrabajo!: DevelopmentPlan;

  temas: Tema[] = developmentplan.temas;

  FormPlan: FormGroup = this.fb.group({});

  selectedTema : number[]  = [];

  selectedTemas : Tema[] = [];

  selectedObjetivo : string[]  = [];

  selectedObjetivos : Objetivo[] = [];

  selectedAccion : string[] = [];


  acciones : any[] = [];

  selectedIndicadores : string[] = [];

  indicadores: any[] = [];

//  logosurl = prefix + 'logos/';

  objetivos$: Subject<any[] | undefined> = new Subject();
  acciones$: Subject<any[] | undefined> = new Subject();
  inidcadores$: Subject<any[] | undefined> = new Subject();

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {


    if (this.planTrabajo) {

    }
  }

  ngOnInit(): void {
    this.FormPlan = this.fb.group({
      steps: this.fb.array([
        this.fb.group({
          temas: ['', Validators.required]
        }),
        this.fb.group({
          objetivo: ['', Validators.required]
        }),
        this.fb.group({
          accion: ['', Validators.required]
        }),
        this.fb.group({
          indicador: ['', Validators.required]
        })
      ])}
    );
  }
  
  selectTema(value: number) {
    if (this.selectedTema.indexOf(value) != -1) {
      let index = this.selectedTema.indexOf(value);
      this.selectedTema.splice(index, 1);
      this.selectedTemas.splice(index, 1);
    } else {
      this.selectedTema.push(value);
      this.selectedTemas.push(this.temas[value]);
    }
    let temas = ''
    for (let i = 0; i < this.selectedTemas.length; i++) {
      temas += ' ' + this.selectedTemas[i].title 
    }
    this.getSteps.patchValue([{temas: temas}])
  }

  selectObjetivo(iO: string, iT: string, objetivo: Objetivo) {
    let index = this.selectedObjetivo.indexOf(iO + iT);
    if (index != -1){
      this.selectedObjetivo.splice(index, 1);
      this.selectedObjetivos.splice(index, 1);
    } else {
      this.selectedObjetivo.push(iO + iT);
      this.selectedObjetivos.push(objetivo);
    }
    
    let objetivos = ''
    for (let i = 0; i < this.selectedObjetivos.length; i++) {
      objetivos+= ' ' + this.selectedObjetivos[i].description;
    }
    this.getSteps.patchValue([null, {objetivo: objetivos}]);
  }

  selectAccion(io:string, value: string) {
    let index = this.selectedAccion.indexOf(io);
    if (index != -1) {
      this.selectedAccion.splice(index, 1);
      this.acciones.slice(index, 1);
    } else {
      this.selectedAccion.push(io)
      this.acciones.push(value);
    }

    let acciones =''
    for (let i = 0; i < this.selectedAccion.length; i++) {
      acciones+= ' ' + this.acciones[i]
    }
    this.getSteps.patchValue([null,null,{accion:acciones}]);
  }

  selectIndicador(io:string, value: string) {
    let index = this.selectedIndicadores.indexOf(io);
    if (index != -1) {
      this.selectedIndicadores.splice(index, 1);
      this.indicadores.slice(index, 1);
    } else {
      this.selectedIndicadores.push(io)
      this.indicadores.push(value);
    }

    let indicadores =''
    for (let i = 0; i < this.selectedIndicadores.length; i++) {
      indicadores+= ' ' + this.indicadores[i]
    }
    this.getSteps.patchValue([null,null,null,{indicador:indicadores}]);
  }


  get getSteps() : FormArray {
    return this.FormPlan.get('steps') as FormArray;
  }


  get formArray(): AbstractControl {
    return this.FormPlan.get('steps') as AbstractControl;
  }


  submit() {
    this.activeModal.close(this.FormPlan.value);
  }

}
