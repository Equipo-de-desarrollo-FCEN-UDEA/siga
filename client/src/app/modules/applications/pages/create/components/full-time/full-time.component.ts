import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//ng-bootstrap imports
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

import {
  FullTimeCreate,
  FulltimeResponse,
} from '@interfaces/applications/full_time/full-time';
import { file_path } from '@interfaces/documents';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import Swal from 'sweetalert2';
import { Holiday } from '@interfaces/holiday';
import { LaboralDays } from '@shared/utils';

@Component({
  selector: 'app-full-time',
  templateUrl: './full-time.component.html',
  styleUrls: ['./full-time.component.scss'],
})
export class FullTimeComponent {
  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();
  public laboralDay: number = 0;
  public laboralflag: boolean = true;
  public verify_date: number = 0;

  // For handle errors
  public clicked = 0;

  // holidays
  public holidays: Holiday[] = [];

  public submitted: boolean = false;
  public documents: file_path[] = [];

  constructor(
    // Datepicker
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,

    private router: Router,
    private formBuilder: FormBuilder,

    private fullTimeSvc: FullTimeService
  ) {}

  // Form permiso
  public form = this.formBuilder.group({
    title: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    start_date: [new Date(), [Validators.required]],
    documents: [this.documents],
  });

  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------

  get f() {
    return this.form.controls;
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

    console.log(this.form.value as FullTimeCreate);

    let fullTime = this.fullTimeSvc.postFullTime(
      this.form.value as FullTimeCreate
    );
    console.log(this.form.value as FullTimeCreate);
    fullTime.subscribe({
      next: (data: FulltimeResponse) => {
        console.log('data', data);
        Swal.fire({
          allowOutsideClick: false,
          title: 'Dedicación exclusiva en creación',
          text: 'Para solicitar la dedicación debes diligenciar los 3 formatos y dar clic en actualizar',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#3AB795',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([
              '/solicitudes/editar/' + data.id + '/dedicacion',
            ]);
          }
        });
      },
    });
  }
  validSize() {
    return true;
  }

  validFileType() {
    return true;
  }

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }

  // --------------------------------------
  // ------------- DATEPICKER -------------
  // --------------------------------------

  onDateSelection(date: NgbDate) {
    this.fromDate = date;
    this.form.patchValue({
      start_date: new Date(
        this.fromDate.year,
        this.fromDate.month - 1,
        this.fromDate.day
      ),
    });
  }

  isHovered(date: NgbDate) {
    return this.fromDate && this.hoveredDate && date.equals(this.fromDate);
  }

  isInside(date: NgbDate) {
    return date.equals(this.fromDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) || this.isInside(date) || this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const PARSED = this.formatter.parse(input);
    return PARSED && this.calendar.isValid(NgbDate.from(PARSED))
      ? NgbDate.from(PARSED)
      : currentValue;
  }
}
