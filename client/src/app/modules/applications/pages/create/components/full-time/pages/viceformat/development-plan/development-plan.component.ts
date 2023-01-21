import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Topic, Objective, Action, Indicator, ObjectiveTopicId } from '@interfaces/applications/full_time/development-plan';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { developmentplan } from '@shared/data/development-plan';
import { Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-development-plan.component',
  templateUrl: './development-plan.component.html',
  styleUrls: ['./development-plan.component.scss']
})



export class DevelopmentPlanComponent implements OnInit {

  @Input() planTrabajo!: Topic[];

  temas: Topic[] = developmentplan.temas;

  selectedplanTrabajo: Topic[] = [];

  selectedTema : number[]  = [];

  selectedTemas : Topic[] = [];

  selectedObjetivo : number[]  = [];

  selectedObjetivos : ObjectiveTopicId[] = [];

  selectedAccion : number[] = [];


  acciones : Action[] = [];

  selectedIndicadores : number[] = [];

  indicadores: Indicator[] = [];

//  logosurl = prefix + 'logos/';

  objetivos$: Subject<any[] | undefined> = new Subject();
  acciones$: Subject<any[] | undefined> = new Subject();
  inidcadores$: Subject<any[] | undefined> = new Subject();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {

    if (this.planTrabajo) {
      this.selectedplanTrabajo = this.planTrabajo;
      this.selectedTema = this.selectedplanTrabajo.map(tema => tema.id)
      this.temas.forEach(tema => {
        if (this.selectedTema.indexOf(tema.id)!=-1){
          this.selectedTemas.push(tema)
        }
      })
      this.selectedObjetivo = this.planTrabajo.map(tema => {
        return tema.objectives!.map(objetivo => tema.id)
      }).flat()
      let _selectedObjetivos = this.planTrabajo.map(tema => {
        return tema.objectives!.map(objetivo => { return { ...objetivo, idTopic: tema.id }})
      }).flat()
      this.temas.forEach(tema =>{
        tema.objectives!.forEach(objetivo =>{
          if (this.selectedObjetivo.indexOf(objetivo.id)!=-1){
            this.selectedObjetivos.push({...objetivo, idTopic:tema.id})
          }
        })
      })
      this.selectedAccion = _selectedObjetivos.map(objetivo =>{
        return objetivo.actions.map(accion => accion.id)
      }).flat()
      this.selectedIndicadores = _selectedObjetivos.map(objetivo =>{
        return objetivo.indicators!.map(indicador => indicador.id)
      }).flat()
    }
 }
  
 
  selectTema(value: number, tema: Topic) {
    if (this.selectedTema.indexOf(value) != -1) {
      let index = this.selectedTema.indexOf(value);
      this.selectedTema.splice(index, 1);
      this.selectedTemas.splice(index, 1)
      this.selectedplanTrabajo.splice(index, 1)
    } else {
      this.selectedTema.push(value);
      console.log(value);
      this.selectedTemas.push(this.temas[value]);
      this.selectedplanTrabajo.push({
        id: value,
        title: this.temas[value].title,
        subtitle: this.temas[value].subtitle,
        objectives: []
      })
    }

  }

  selectObjetivo(objetivo: Objective, idTema: number) {
    let index = this.selectedObjetivo.indexOf(objetivo.id);
    let indexOfTema = this.selectedTema.indexOf(idTema)
    if (index != -1) {
      this.selectedObjetivo.splice(index, 1);
      this.selectedObjetivos.splice(index, 1);
      let indexObjetivo = this.temas[indexOfTema].objectives!.indexOf(objetivo);
      this.selectedObjetivos.splice (indexObjetivo, 1);
      this.selectedplanTrabajo[indexOfTema].objectives!.splice(indexObjetivo, 1)
    } else {
      this.selectedObjetivo.push(objetivo.id);
      console.log(objetivo.id)
      this.selectedObjetivos.push({ ...objetivo, idTopic: idTema });
      this.selectedplanTrabajo[indexOfTema].objectives!.push({
        id: objetivo.id,
        description: objetivo.description,
        actions: [],
        indicators: []
      })
    }
  }

  selectAccion(accion: Action, objetivo: ObjectiveTopicId) {
    let index = this.selectedAccion.indexOf(accion.id);
    let indexOfTema = this.selectedTema.indexOf(objetivo.idTopic);

    //Revisar cual de estas dos
    // let indexObjetivo = this.selectedTemas[indexOfTema].objectives!.map(objetivo => objetivo.id).indexOf(objetivo.id);
    let indexObjetivo = this.temas[indexOfTema].objectives!.map(objetivo => objetivo.id).indexOf(objetivo.id);
    if (index != -1) {
      this.selectedAccion.splice(index, 1);
      this.acciones.splice(index, 1);
      let indexAccion = this.selectedplanTrabajo[indexOfTema].objectives![indexObjetivo].actions.indexOf(accion);
      this.selectedplanTrabajo[indexOfTema].objectives![indexObjetivo]!.actions!.splice(indexAccion, 1);
    } else {
      this.selectedAccion.push(accion.id)
      this.acciones.push(accion);
      console.log('objetivo: '+ indexObjetivo+" tema: "+ indexOfTema+ " accion: "+ accion.id);
      this.selectedplanTrabajo[indexOfTema].objectives![indexObjetivo].actions!.push(accion);

    }
    
  }

  selectIndicador(indicador: Indicator, objetivo: ObjectiveTopicId) {
    let index = this.selectedIndicadores.indexOf(indicador.id);
    let indexOfTema = this.selectedTema.indexOf(objetivo.idTopic)
    let indexObjetivo = this.temas[indexOfTema].objectives!.map(objetivo => objetivo.id).indexOf(objetivo.id)
    if (index != -1) {
      this.selectedIndicadores.splice(index, 1);
      this.indicadores.slice(index, 1);
      let indexIndicador = this.selectedplanTrabajo[indexOfTema].objectives![indexObjetivo].indicators!.indexOf(indicador);
      this.selectedplanTrabajo[indexOfTema].objectives![indexObjetivo].indicators!.splice(indexIndicador, 1);
    } else {
      this.selectedIndicadores.push(indicador.id);
      this.indicadores.push(indicador);
      console.log(indicador);
      this.selectedplanTrabajo[indexOfTema].objectives![indexObjetivo].indicators!.push(indicador);
    }
    
  }

  submit() {
    this.activeModal.close(this.selectedplanTrabajo);
  }

}
