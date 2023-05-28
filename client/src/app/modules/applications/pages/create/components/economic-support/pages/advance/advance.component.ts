import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//ng-bootstrap
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { ACCOUNT_TYPE } from '../../data/economic-support';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss'],
})
export class AdvanceComponent {
  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  // For handle errors
  public clicked = 0;
  public error = '';

  get f() {
    return this.form.controls;
  }
  public ACCOUNT_TYPE = ACCOUNT_TYPE;

  @Output() submitted = false;
  @Output() sendForm = new EventEmitter<any>();

  public form = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    ],
    id: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    ],
    bank: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    ],
    value: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    ],
    account_number: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    ],
    account_type: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    ],
    start_date: [new Date(), [Validators.required]],
    end_date: [new Date(), [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,

    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {}

  send() {
    this.sendForm.emit(this.form.value);
  }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() {
    this.submitted = true;
    return this.form.value;
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
}
