import { Component, NgZone } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//ng-bootstrap
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';


//interfaces
import { IEconomicSupportCreate } from '@interfaces/applications/economic_support-interface';
import { DocumentsResponse, file_path } from '@interfaces/documents';

//services
import { EconomicSupportService } from '@services/applications/economic-support.service';
import { DocumentService } from '@services/document.service';

// Rxjs
import { switchMap } from 'rxjs';

// SweetAlert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-economic-support',
  templateUrl: './economic-support.component.html',
  styleUrls: ['./economic-support.component.scss'],
})
export class EconomicSupportComponent {
  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  // Files
  public files: any[] = [];
  public archivos = [1];
  public documents: file_path[] = [];

  get f() {
    return this.form.controls;
  }

  get budgetArr(): FormArray {
    return this.form.get('budget') as FormArray;
  }

  constructor(
    private fb: FormBuilder,

    private router: Router,
    
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,

    private economicSupportSvc: EconomicSupportService,
    private documentService: DocumentService
  ) {}

  ///SOLO DE EJEMPLO
  support = [
    { name: 'PREGRADO', value: true },
    { name: 'POSGRADO', value: true },
    { name: 'BIENESTAR DE LA FACULTAD', value: true },
    { name: 'BIENESTAR GENERAL', value: true },
    { name: 'GRUPOS DE INVESTIGACIÓN', value: true },
    { name: 'INTERNACIONALIZACIÓN', value: true },
  ];
  
  
  
  
  public form = this.fb.group({
    country: ['', [Validators.required]],
    state: [''],
    city: [''],
    lenguage: [''],
    support: ['', [Validators.required]],
    budget: this.fb.array([this.budgetGroup()], [Validators.required, Validators.minLength(1)]),
    start_date: [new Date(), [Validators.required]],
    end_date: [new Date(), [Validators.required]],
    justification: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    documents: [this.documents],
  });

  budgetGroup() {
    return this.fb.group({
      description: [''],
      amount: [0],
    });
  }

  addInputBubget() {
    this.budgetArr.push(this.budgetGroup());
  }

  // Remove from control
  removeInput(controlName: string, index: number) {
    const control = this.form.get(controlName) as FormArray;
    control.removeAt(index);
  }

  submit() {
    this.submitted = true;
    //Se detiene aqui si el formulario es invalido
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
    let economic_support = this.economicSupportSvc.postEconomicSupport(this.form.value as IEconomicSupportCreate);
    if (this.files.length > 0) {
      economic_support = this.documentService.postDocument(this.files as File[]).pipe(
        switchMap((data: DocumentsResponse) => {
          if (data) {
            this.form.patchValue({
              documents: data.files_paths
            })
          }
          return this.economicSupportSvc.postEconomicSupport(this.form.value as IEconomicSupportCreate)
        })
      )
    }
    console.log(this.form.value as IEconomicSupportCreate)
    economic_support.subscribe({
      next: data => {
        Swal.fire(
          {
            title: 'Su solicitud se creó correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([`/solicitudes/ver/${data.id}/apoyo-economico`])
          }
        })
      }}
    )
  }

  // --------------------------------------
  // ------------- DATEPICKER -------------
  // --------------------------------------

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.form.patchValue({
      start_date: new Date(
        this.fromDate.year,
        this.fromDate.month - 1,
        this.fromDate.day
      ),
      end_date: new Date(
        this.toDate!.year,
        this.toDate!.month - 1,
        this.toDate!.day
      ),
    });
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  // --------------------------------------
  // ---------- VALIDATE FORM -------------
  // --------------------------------------

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  onUpload(event: Event, index: number) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files.splice(index, 1, file);
    }
  }

  removeFile(index: number) {
    if (this.archivos.length > 1) {
      this.archivos.splice(index, 1);
    }
    this.files.splice(index, 1);
  }

  validSize() {
    const size = this.files.map((a) => a.size).reduce((a, b) => a + b, 0);
    return size < 2 * 1024 * 1024;
  }

  validFileType() {
    const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];

    let flag = true;
    this.files.forEach((file) => {
      flag = extensionesValidas.includes(
        file.name.split('.')[file.name.split('.').length - 1]
      );
    });
    return flag;
  }
}
