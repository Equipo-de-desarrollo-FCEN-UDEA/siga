import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {


  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  // Files 
  public files : any[] = [];
  public archivos = [1];

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  public comision_type$: any;

  public isLoading = this.loaderSvc.isLoading

  constructor(
    private fb: FormBuilder,
    private calendar : NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngZone: NgZone,
    private router: Router,
    private cd: ChangeDetectorRef,

    private loaderSvc: LoaderService
  ) {

   }

   public form = this.fb.group({
    application_sub_type_id: [NaN, [Validators.required]],
    country: ['', [Validators.required]],
    state: [''],
    city: [''],
    start_date: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    lenguage: ['', [Validators.required, Validators.maxLength(50)]],
    justification: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(500)]]
   })

  ngOnInit(): void {
  }

  submit() {
    console.log('enviado')
  }

  // --------------------------------------
  // ------------- DATEPICKER -------------
  // --------------------------------------
  
  // inRange(fecha_1 : any, fecha_2 : any){
  //   fecha_1 = new Date(this.formatter.format(fecha_1));
  //   fecha_2 = new Date(this.formatter.format(fecha_2));
  //   return DiasHabiles(fecha_1, fecha_2) > this.dias_permiso;
  // }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.form.patchValue({
      start_date : this.formatter.format(this.fromDate),
      end_date : this.formatter.format(this.toDate)
    });
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  // --------------------------------------
  // ----------- TIPO DE SOLICITUD ---------
  // --------------------------------------
  onChangeSolicitud(e: any): void {
    this.cd.detectChanges();
  }


  
  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------
  get f() {
    return this.form.controls;
  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
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

  validTipoArchivo() {
    const extensionesValidas = ["png", "jpg", "gif", "jpeg", "pdf"];
    
    let flag = true; 
    this.files.forEach((file) => {
      flag = extensionesValidas.includes(file.name.split(".")[file.name.split(".").length - 1]);
    })
    return flag;

  }



  // --------------------------------------
  // -------- LUGAR - PAISES - CIUDAD -----
  // --------------------------------------

  // onChangePais(event:any) {
  //   const paisId = event.target.value;
  //   this.pais = this.paises[paisId];
  //   this.paisesCiudadesSvc.getEstados(this.pais).subscribe(
  //     (data:Estado[]) => {
  //       this.provincias = data;
  //     }
  //   )
  // }

  // onChangeEstado(event:any) {
  //   const estadoId = event.target.value;
  //   this.provincia = this.provincias[estadoId];
  //   this.paisesCiudadesSvc.getCiudades(this.pais, this.provincia).subscribe(
  //     (data:Ciudad[]) => {
  //       this.ciudades = data;
  //     }
  //   );
  // }

}
