import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//ng-bootstrap
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
//interfaces
import { DocumentsResponse, file_path } from '@interfaces/documents';
import { IEconomicSupportCreate } from '@interfaces/applications/economic_support-interface';

//services
import { EconomicSupportService } from '@services/applications/economic-support.service';
import { DocumentService } from '@services/document.service';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-economic-support',
  templateUrl: './economic-support.component.html',
  styleUrls: ['./economic-support.component.scss']
})
export class EconomicSupportComponent implements OnInit {

  public id: number = 0;

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
  public documentsToDelete: string[] = []
  
  get f() {
    return this.form.controls;
  }
  
  get budgetArr(): FormArray {
    return this.form.get('budget') as FormArray;
  }

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private fb: FormBuilder,

    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,

    private economicSupportSvc: EconomicSupportService,
    private documentSvc: DocumentService
  ) { }

  ///SOLO DE EJEMPLO
  support = [
      { name: 'COMITE DE POSGRADO', value: true },
      { name: 'CONSEJO DE INSTITUTO', value: true },
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

  ngOnInit(): void {
    this.route.parent?.params.subscribe(
      params => {
        this.id = params['id']
        this.economicSupportSvc.getEconomicSupport(this.id).subscribe(
          data => {
            this.form.patchValue({
              ...data.economic_support
            });
            this.documents = data.economic_support.documents!
          }
        );
      }
    );
  }

  submit(){
    let economic_support = this.economicSupportSvc.putEconomicSupport(this.form.value as IEconomicSupportCreate, this.id);
    
    for (let path of this.documentsToDelete) {
      this.documentSvc.deleteDocument(path).subscribe(data => console.log(data, 'Documento eliminado')).unsubscribe()
    }

    if (this.files.length > 0) {
      economic_support = this.documentSvc.postDocument(this.files as File[]).pipe(
        switchMap((data: DocumentsResponse) => {
          if (data) {
            this.documents = this.documents.concat(data.files_paths)
            this.form.patchValue({
              documents: this.documents
            })
          }
          return this.economicSupportSvc.putEconomicSupport(this.form.value as IEconomicSupportCreate, this.id)
        })
      )
    }

    economic_support.subscribe(
      data => {
        Swal.fire(
          {
            title: 'La solicitud se actualizó correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([`/solicitudes/ver/${this.id}/apoyo-economico`])
          }
        })
      }
    )

  }

  addInputBubget() {
    this.budgetArr.push(this.budgetGroup());
  }

  // Remove from control
  removeInput(controlName: string, index: number) {
    const control = this.form.get(controlName) as FormArray;
    control.removeAt(index);
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
