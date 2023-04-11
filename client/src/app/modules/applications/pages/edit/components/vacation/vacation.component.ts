//angular imports
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//ngBootstrap imports
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

//rxjs imports
import { switchMap } from 'rxjs';

//sweetAlert imports
import Swal from 'sweetalert2';

//interfaces imports
import { DocumentsResponse, file_path } from '@interfaces/documents';
import { Holiday } from '@interfaces/holiday';
import { VacationCreate } from '@interfaces/applications/vacation';

//services imports
import { ApplicationTypesService } from '@services/application-types.service';
import { VacationService } from '@services/applications/vacation.service';
import { DocumentService } from '@services/document.service';
import { ApplicationSubTypeService } from '@services/application-sub-type.service';
import { HolidayService } from '@services/holiday.service';

//shared imports
import { LaboralDays } from '@shared/utils';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss'],
})
export class VacationComponent implements OnInit {
  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();
  public laboralDay: number = 0;

  // Files
  public files: any[] = [];
  public document_new = [1];
  public documents: file_path[] = [];
  public documentsToDelete: file_path[] = [];

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  public id: number = 0;

  public applicationType$ = this.applicationTypeSvc.getApplicationType(5);

  // holidays
  public holidays: Holiday[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private router: Router,
    private route: ActivatedRoute,

    private applicationTypeSvc: ApplicationTypesService,
    private SubTypeSvc: ApplicationSubTypeService,
    private vacationSvc: VacationService,
    private documentSvc: DocumentService,
    private holidaySvc: HolidayService
  ) {
    this.fromDate = null;
    this.toDate = null;
  }

  // Form vacation
  public form = this.formBuilder.group({
    application_sub_type_id: [0, [Validators.required]],
    total_days: [1, [Validators.required]],
    start_date: [new Date(), [Validators.required]],
    end_date: [new Date(), [Validators.required]],
    documents: [this.documents],
    //signature: [this.signatureImg],
  });

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      this.vacationSvc.getVacation(this.id).subscribe((data) => {
        this.form.patchValue({
          ...data.vacation,
          application_sub_type_id: data.application_sub_type_id,
        });
        this.documents = data.vacation.documents!;
        this.SubTypeSvc.getApplicationSubType(
          +data.application_sub_type_id
        ).subscribe({
          next: (res) => {
            this.laboralDay = res.extra.days;
          },
        });
      });
    });
  }

  ngAfterViewInit(): void {
    this.holidaySvc.getHolidays().subscribe({
      next: (data) => {
        this.holidays = data;
      },
    });
  }

  // --------------------------------------
  // ------------ SUBMIT FORM  ------------
  // --------------------------------------
  submit() {
    this.submitted = true;

    // Se detiene aqui si el formulario es invalido
    if (this.form.invalid) {
      return;
    }

    let vacation = this.vacationSvc.putVacation(
      this.form.value as VacationCreate,
      this.id
    );

    // for (let path of this.documentsToDelete) {
    //   this.documentSvc.deleteDocument(path).subscribe().unsubscribe();
    // }

    if (this.files.length > 0) {
      vacation = this.documentSvc.postDocument(this.files as File[]).pipe(
        switchMap((data: DocumentsResponse) => {
          if (data) {
            this.form.patchValue({
              documents: data.files_paths,
            });
          }
          console.log(this.form.value);
          return this.vacationSvc.putVacation(
            this.form.value as VacationCreate,
            this.id
          );
        })
      );
    }
    vacation.subscribe({
      next: (res) => {
        console.log('vacation updated', vacation);
        Swal.fire({
          title: 'Actualizado',
          text: '¡El registro de vacaciones se actualizó con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3AB795',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([
              'solicitudes/ver/' + this.id + '/vacaciones',
            ]);
          }
        });
      },
      error: (err) => {
        console.log('salio error', err);
        this.error = err;
      },
    });
  }

  // --------------------------------------
  // --------- VACATION TYPES  ---------
  // --------------------------------------

  onApplicationSubType(event: Event) {
    // Obtener el value antes de los ':'
    const ID_VACATION_TYPE = (event.target as HTMLSelectElement).value.split(
      ':'
    )[0];
    console.log(ID_VACATION_TYPE);
    this.SubTypeSvc.getApplicationSubType(+ID_VACATION_TYPE).subscribe({
      next: (res) => {
        this.laboralDay = res.extra.days;
      },
    });
  }

  // --------------------------------------
  // ------------- DATEPICKER -------------
  // --------------------------------------

  selectDays(fromDate: NgbDate | null, toDate: NgbDate | null): boolean {
    if (fromDate || toDate) {
      return (
        LaboralDays(
          new Date(this.formatter.format(fromDate)),
          new Date(this.formatter.format(toDate)),
          this.holidays
        ) > this.laboralDay
      );
    } else {
      return false;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      console.log('!this.fromDate && !this.toDate');
      this.fromDate = date;
      this.form.patchValue({
        start_date: new Date(
          this.fromDate!.year,
          this.fromDate!.month - 1,
          this.fromDate!.day
        ),
      });
    } else if (this.fromDate && !this.toDate && date) {
      console.log(
        'this.fromDate && !this.toDate && date',
        this.fromDate,
        this.toDate,
        date
      );
      this.toDate = date;
      this.form.patchValue({
        end_date: new Date(
          this.toDate.year,
          this.toDate.month - 1,
          this.toDate.day
        ),
      });
    } else {
      console.log('else', this.fromDate, this.toDate);
      this.toDate = null;
      this.fromDate = date;
      this.form.patchValue({
        start_date: new Date(
          this.fromDate.year,
          this.fromDate.month - 1,
          this.fromDate.day
        ),
      });
      this.form.patchValue({
        end_date: new Date(
          this.toDate!.year,
          this.toDate!.month - 1,
          this.toDate!.day
        ),
      });
    }
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

  isHoveredInvalid(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      this.selectDays(this.fromDate, this.hoveredDate) &&
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
    const PARSED = this.formatter.parse(input);
    return PARSED && this.calendar.isValid(NgbDate.from(PARSED))
      ? NgbDate.from(PARSED)
      : currentValue;
  }

  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------

  // Acceder a los form
  get f() {
    return this.form.controls;
  }

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  deleteDocument(path: string, i: number) {
    Swal.fire({
      title: 'Eliminar documento',
      text: '¿Está seguro de querer eliminar este documento?, no podrá recuperarlo',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
    }).then((result) => {
      if (result.isConfirmed) {
        //this.documentsToDelete = this.documentsToDelete.concat([path]);
        this.documents.splice(i, 1);
      }
    });
  }

  // Subir un archivo
  onUpload(event: Event, index: number) {
    const ELEMENT = event.target as HTMLInputElement;
    const FILE = ELEMENT.files?.item(0);
    if (FILE) {
      this.files.splice(index, 1, FILE);
    }
  }

  // Eliminar achivos
  removeFile(index: number) {
    if (this.document_new.length > 1) {
      this.document_new.splice(index, 1);
    }
    this.files.splice(index, 1);
  }

  // Verifica el tamaño de los archivos que se van a adjuntar al permiso, max:2MB
  validSize() {
    const SIZE = this.files.map((a) => a.size).reduce((a, b) => a + b, 0);
    return SIZE < 2 * 1024 * 1024;
  }

  // Verifica que el archivo a adjuntar sea de un tipo valido
  validFileType() {
    const VALID_EXTENSIONS = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];

    let flag = true;
    this.files.forEach((file) => {
      // separa el último punto del nombre del archivo para verificar su tipo
      flag = VALID_EXTENSIONS.includes(
        file.name.split('.')[file.name.split('.').length - 1]
      );
    });
    return flag;
  }
}
