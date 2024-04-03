import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FullTimeCreate,
  FulltimeResponse,
} from '@interfaces/applications/full_time/full-time';
import { file_path } from '@interfaces/documents';
import { Holiday } from '@interfaces/holiday';
import { NgbDate, NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { DocumentService } from '@services/document.service';
import { FormsStatusService } from "@services/applications/full_time/interaction-components/forms-status.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-full-time',
  templateUrl: './full-time.component.html',
  styleUrls: ['./full-time.component.scss'],
})
export class FullTimeComponent implements OnInit {
  public id: number = 0;
  public submitted: boolean = false;
  public application: FulltimeResponse | null = null;

  // Files
  public documents: file_path[] = [];

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

  public form: FormGroup;

  constructor(
    // Datepicker
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,

    private router: Router,
    private route: ActivatedRoute,

    private formBuilder: FormBuilder,
    private fullTimeSvc: FullTimeService,
    public formsStatusService: FormsStatusService
  ) {
    this.form = this.formBuilder.group({
      start_date: [new Date(), [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];

      this.fullTimeSvc.getFullTime(this.id).subscribe((data) => {
        this.application = data;

        data.full_time.initial_letter !== null ?
          this.formsStatusService.setStartLetterStatus(true):
          this.formsStatusService.setStartLetterStatus(false);
        data.full_time.vice_format !== null ?
          this.formsStatusService.setViceFormatStatus(true):
          this.formsStatusService.setViceFormatStatus(false);
        data.full_time.work_plan !== null ?
          this.formsStatusService.setWorkPlanStatus(true):
          this.formsStatusService.setWorkPlanStatus(false);
      });
    });

  }

  isInvalidForm() {
    if (
      this.application?.full_time.initial_letter &&
      this.application?.full_time.vice_format &&
      this.application?.full_time.work_plan
    ) {
      return false;
    } else {
      return true;
    }
  }

  //------ NAVEGATE FUNTIONS -------

  //plan de trabajo
  navegateWorkplan() {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];

      this.fullTimeSvc.getFullTime(this.id).subscribe({
        next: () => {
          this.router.navigate([
            'solicitudes/crear/plan-de-trabajo/' + this.application?.id,
          ]);
        },
      });
    });
  }

  //Formato vice
  navegateViceFormat() {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];

      this.fullTimeSvc.getFullTime(this.id).subscribe({
        next: () => {
          this.router.navigate([
            'solicitudes/crear/formato-vicerrectoria/' + this.application?.id,
          ]);
        },
      });
    });
  }

  // carta inicio
  navegateLetter() {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];

      this.fullTimeSvc.getFullTime(this.id).subscribe({
        next: () => {
          this.router.navigate([
            'solicitudes/crear/carta-inicio/' + this.application?.id,
          ]);
        },
      });
    });
  }

  // --------------------------------------
  // ------------ SUBMIT FORM  ------------
  // --------------------------------------
  submit() {
    this.submitted = true;

    if (this.isInvalidForm()) {
      return;
    }

    let fullTime = this.fullTimeSvc.requestFullTime(this.id);
    fullTime.subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Actualizado',
          text: '¡La dedicación se solicitó con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3AB795',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([
              'solicitudes/ver/' + this.id + '/dedicacion',
            ]);
          }
        });
      },
    });
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
