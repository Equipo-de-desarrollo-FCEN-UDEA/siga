import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Dexclusiva, FormatosviceInside, ViceFormat } from '@interfaces/applications/application';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DedicacionService } from '@services/dedicaciones/dedicacion.service';
import { CookieService } from 'ngx-cookie-service';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from '@services/users/user.service';
import { UserBase, UserResponse } from '@interfaces/user';
import { LoaderService } from '@services/interceptors/loader.service';
import { BehaviorSubject, Observable, Subject, switchAll, switchMap } from 'rxjs';
import { CrearDedicacionComponentsService } from '../../services/crear-dedicacion-components.service';
import Swal from 'sweetalert2';

import { FormatoViceService } from '@services/dedicaciones/formato-vice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
library.add(fas);
import { PlanDesarrolloInstitucionalComponent } from '../plan-desarrollo-institucional/plan-desarrollo-institucional.component';
import { plandesarrollo } from '@interfaces/dedicaciones/plandesarrollo';
import { DedicacionDTO } from '@interfaces/dedicaciones/dedicaciones';


@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.scss']
})
export class FDedicacionComponent implements OnInit, AfterViewInit {

  private formatoVice!: ViceFormat;

  @Input() editable: any;
  @Input() idDedicacion: number | string = 0;

  private _editing: boolean = false;

  private error: any = '';

  private PlanDesarrollo!: plandesarrollo;

  private acciones: number[] = [];

  private objetivos_has_indicador: number[] = [];

  public PlanDesarrolloFirstTake: number = 0;


  isLoading: Subject<boolean> = this.loadingSvc.isLoading;
  constructor(
    private fb: FormBuilder,
    private formatoSvc: FormatoViceService,
    private usuarioSvc: UsuarioService,
    private dedicacionSvc: DedicacionService,
    private loadingSvc: LoaderService,
    private comunicationSvc: CrearDedicacionComponentsService,
    private modalSvc: NgbModal,
    private router: Router
  ) {
    //this.usuarioSvc.getUsuario().subscribe(resp => this.Usuario = resp);
  }


  public campos = [
    'Docencia',
    'Extensión',
    'Investigación',
    'Administración'
  ]

  public Usuario: UsuarioResponse | undefined;



  fBasicInfo = this.fb.group({
    // titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    tiempo_solicitado: [NaN, [Validators.required, Validators.min(1), Validators.max(12)]],
    campo_modalidad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50000)]],
    descripcion_comprobante: ['', [Validators.minLength(3), Validators.maxLength(255)]],
    metas: this.fb.array([this.metasgroup()], [Validators.required]),
    productos: this.fb.array([this.productosgroup()], [Validators.required]),
  })

  ngOnInit(): void {

    if (this.editable) {
      this.PlanDesarrolloFirstTake++;
      let formato$ = this.dedicacionSvc.getDedicacion(this.idDedicacion).pipe(
        switchMap(
          data => this.formatoSvc.getFormatoVice(data.formatosvice!.id)
        )
      )
      formato$.subscribe(
        data => {
          this.formatoVice = data;
          this.fBasicInfo.patchValue(this.formatoVice);
          let metas = this.formatoVice.intermediate_metas_productos.filter(
            objeto => objeto.tipo == 'meta'
          ).map(meta => {
            return { meta: meta.descripcion }
          })
          let productos = this.formatoVice.intermediate_metas_productos.filter(
            objeto => objeto.tipo == 'producto'
          ).map(producto => {
            return { producto: producto.descripcion }
          })
          this.patchMeta(metas);
          this.patchProducto(productos);
          this.objetivos_has_indicador = [... new Set(this.formatoVice.intermediate_formatos.map(
            intermediate => intermediate.intermediate_objetivos_indicadores.indicadores_id
          ))]

          this.acciones = [... new Set(this.formatoVice.intermediate_formatos_accion.map(
            intermediate => intermediate.acciones_id
          ))]
        }
      )
    }



  }

  ngAfterViewInit(): void {

  }

  onSubmit() {
    // let Dedicacion = this.fBasicInfo.value as FormatoVice;


    let metas = this.fBasicInfo.value.metas?.map(meta => {
      return { "metaproducto": meta.meta, "tipo": "meta" }
    })

    let productos = this.fBasicInfo.value.productos?.map(producto => {
      return { "metaproducto": producto.producto, "tipo": "producto" }
    })

    let metas_productos = metas?.concat(productos!)

    let FormatoVice = {
      tiempo_solicitado: this.fBasicInfo.value.tiempo_solicitado,
      campo_modalidad: this.fBasicInfo.value.campo_modalidad,
      descripcion_comprobante: this.fBasicInfo.value.descripcion_comprobante,
      metas_productos: metas_productos,
      acciones: this.acciones,
      objetivos_has_indicador: this.objetivos_has_indicador,
      dedicaciones_id: this.idDedicacion
    };

    if (this.formatoVice) {
      let pathAcciones = this.formatoVice.intermediate_formatos_accion.map(intermediate => intermediate.id)
      let pathIndicadores = this.formatoVice.intermediate_formatos.map(intermadiate => intermadiate.id)
      let pathMetasProductos = this.formatoVice.intermediate_metas_productos.map(intermediate => intermediate.id)
      this.formatoSvc.patchFotmato(this.formatoVice.id, FormatoVice, pathAcciones, pathIndicadores, pathMetasProductos).subscribe(
        (res: any) => {
          if (res) {
            Swal.fire(
              {
                text: 'Formato actualizado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }
            )
          }
        }, error => {
          Swal.fire({
            text: 'Algo malo pasó vuelve a intentar',
            icon:'error',
            confirmButtonText: 'Aceptar'
          })
        }
      )
    } else {
      this.formatoSvc.postFormulario(FormatoVice).subscribe(
        (res: any) => {
          if (res) {
            Swal.fire({
              text: 'Formato generado con éxito',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }
            )
            this.comunicationSvc.setFormatoSuccess(true);
          }
        }
      );
    }


  }

  open() {
    const modalRef = this.modalSvc.open(PlanDesarrolloInstitucionalComponent, { size: 'xl' })
    if (this.editable) {
      modalRef.componentInstance.intermadiateFormatosIn = this.formatoVice.intermediate_formatos
      modalRef.componentInstance.intermediateFormatosAccion = this.formatoVice.intermediate_formatos_accion
    }
    modalRef.result.then(
      (res: any) => {
        this.acciones = res.acciones;
        this.objetivos_has_indicador = res.objetivos_has_indicador;
        console.log(this.acciones, this.objetivos_has_indicador);
        this.PlanDesarrolloFirstTake++;
      }
    ).catch(
      (err: any) => {
        Swal.fire({
          icon: 'error',
          text: 'Algo ocurrió mal, vuelve a seleccional tu plan de desarrollo institucional',
          confirmButtonText: 'Aceptar'
        })
      }
    );
  }




  // Metas

  metasgroup() {
    return this.fb.group({
      meta: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }


  get metasArr(): FormArray {
    return this.fBasicInfo.get('metas') as FormArray;
  }
  addInputMetas() {
    this.metasArr.push(this.metasgroup());
  }

  patchMeta(metas: any[]) {
    for (let [i, meta] of metas.entries()) {
      if (i != 0) {
        this.addInputMetas();
      }
    }
    this.metasArr.patchValue(metas)
  }

  // Productos

  productosgroup() {
    return this.fb.group({
      producto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  get productosArr(): FormArray {
    return this.fBasicInfo.get('productos') as FormArray;
  }

  addInputProductos() {
    this.productosArr.push(this.productosgroup());
  }

  patchProducto(productos: any) {
    for (let [i, producto] of productos.entries()) {
      if (i != 0) { this.addInputProductos(); }
    }
    this.productosArr.patchValue(productos);
  }


  // Eliminar del control
  removeInput(controlName: string, index: number) {
    const control = this.fBasicInfo.get(controlName) as FormArray;
    control.removeAt(index);
  }




  isInvalidForm(controlName: string) {
    return this.fBasicInfo.get(controlName)?.invalid && this.fBasicInfo.get(controlName)?.touched;
  }

}
