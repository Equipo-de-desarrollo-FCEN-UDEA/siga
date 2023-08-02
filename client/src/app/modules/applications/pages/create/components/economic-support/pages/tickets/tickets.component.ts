import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

//ng-bootstrap
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent {
  // Dates
  public fromDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;

  public hoveredDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  // For handle errors
  public clicked = 0;
  public error = '';
  
  @Output() submitted = false;

  get f() {
    return this.form.controls;
  }

  public form = this.fb.group({
    departure_date: [new Date()],
    arrival_date: [new Date()],
    departure_place: ['', [Validators.minLength(1), Validators.maxLength(50)]],
    arrival_place: ['', [Validators.minLength(1), Validators.maxLength(50)]],
    place_birth: ['', [Validators.minLength(1), Validators.maxLength(50)]],
    //birthdate: ['', [Validators.required]],
  });

  @Output() sendForm = new EventEmitter<any>();
  
  constructor(
    private fb: FormBuilder,

    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {}

  send() { this.sendForm.emit(this.form.value); }

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
    this.form.patchValue({
      departure_date : (new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day)),
      arrival_date : (new Date(this.toDate!.year, this.toDate!.month - 1, this.toDate!.day))
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
}
