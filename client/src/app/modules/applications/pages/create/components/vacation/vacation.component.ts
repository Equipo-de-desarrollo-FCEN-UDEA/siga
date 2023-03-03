import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentsResponse, file_path } from '@interfaces/documents';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationTypesService } from '@services/application-types.service';
import Swal from 'sweetalert2';
import { VacationService } from '@services/applications/vacation.service';
import { VacationCreate } from '../../../../../../core/interfaces/applications/vacation';
import { DocumentService } from '@services/document.service';
import { switchMap } from 'rxjs';
import { ApplicationSubTypeService } from '@services/application-sub-type.service';
import { SignaturePad } from 'angular2-signaturepad';


@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss']
})
export class VacationComponent implements OnInit {

  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();
  public laboralDay: number = 0;

  public files : any[] = [];
  public archivos = [1];
  public documents: file_path[] = []

   // Signature
   @ViewChild(SignaturePad) signaturePad!: SignaturePad;
   signatureImg: string="";
 
   signaturePadOptions: Object = { 
     'minWidth': 2,
     'canvasWidth': 1000,
     'canvasHeight': 200
   };

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  public applicationType$ = this.applicationTypeSvc.getApplicationType(5);

  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------

  get f() { return this.form.controls; }

  constructor(

    private fb: FormBuilder,
    private calendar : NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngZone: NgZone,
    private router: Router,
    private cd: ChangeDetectorRef,

    private applicationTypeSvc: ApplicationTypesService,
    private SubTypeSvc: ApplicationSubTypeService,
    private vacationSvc: VacationService,
    private documentSvc: DocumentService
  
  ) { }
  
// Form vacation
  public form = this.fb.group({
    application_sub_type_id: [0, [Validators.required, Validators.min(1)]],
    total_days: [1,[Validators.required]],
    start_date: [new Date(), [Validators.required]],
    end_date: [new Date(), [Validators.required]],
    documents: [this.documents],
    signature:[this.signatureImg], 
    })

  submit(){
    this.submitted = true;
    // Se detiene aqui si el formulario es invalido
    if(this.form.invalid){
      Swal.fire({
        title: 'Error',
        text: '¡Revise que haya llenado todos los campos que el Formato sugiere!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }

    let vacation = this.vacationSvc.postVacation(
      this.form.value as VacationCreate);

    if (this.files.length > 0) {
      vacation = this.documentSvc.postDocument(this.files as File[]).pipe(
        switchMap((data: DocumentsResponse) => {
          if (data){
            this.form.patchValue({
              documents: data.files_paths
            })
          }
          return this.vacationSvc.postVacation(
            this.form.value as VacationCreate)
        })
      )
    }
    vacation.subscribe({
      next:(data) => {
        Swal.fire({
            title:'La solicitud se creó correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }
        ).then((result)=>{
          if (result.isConfirmed){
            this.router.navigate([`/solicitudes/ver/${data.id}/vaciones`])
          }
        });
      },error:(err)=>{
        this.error =err
      }
    })
  }

  ngOnInit(): void {
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API

  }

  // Tipo de solicitud

  onApplicationSubType(event: Event) {
    // Obtener el value antes de los ':'  
    const ID_PERMISSION_TYPE = (event.target as HTMLSelectElement).value.split(':')[0]
    this.SubTypeSvc.getApplicationSubType(+ID_PERMISSION_TYPE).subscribe({
      next: (res) => {
        this.laboralDay = res.extra.days;
      },
    });
  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.
    invalid && this.form.get(controlName)?.touched;
  }
 // --------------------------------------
  // ------------- SIGNATURE -------------
  // --------------------------------------

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad?.clear();
  }

  savePad(event:any) {
    const base64Data = this.signaturePad?.toDataURL();
    this.signatureImg = base64Data;
    console.log(base64Data);
    Swal.fire({
      title: 'Firma registrada',
      text: 'Por políticas institucionales, la firma aquí consignada no quedará almacenada en Base de Datos, solo se usará para emitir el formato. ',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3AB795',
    });
    event.target.disabled = true;
    return; 
  }
  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  onUpload(event:Event, index: number) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files.splice(index, 1, file);
    }
  }

  removeFile(index: number) {
    if (this.archivos.length > 1) {
    this.archivos.splice(index, 1);};
    this.files.splice(index, 1);
  }
  validSize() {
    const size = this.files.map(a => a.size).reduce((a, b) => a + b, 0);
    return size < 2 * 1024 * 1024;
  }

  validFileType() {
    const extensionesValidas = ["png", "jpg", "gif", "jpeg", "pdf"];
    
    let flag = true; 
    this.files.forEach((file) => {
      flag = extensionesValidas.includes(file.name.split(".")[file.name.split(".").length - 1]);
    })
    return flag;

  }

}
