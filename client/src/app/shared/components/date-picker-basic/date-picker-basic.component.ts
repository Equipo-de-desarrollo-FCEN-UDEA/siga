import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-basic',
  templateUrl: './date-picker-basic.component.html',
  styleUrls: ['./date-picker-basic.component.scss'],
})
export class DatePickerBasicComponent implements OnInit {
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  @Output() datePickerValues = new EventEmitter<any>();

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.form = this.fb.group({
      start_date: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.datePickerValues.emit(this.form.value.start_date);
  }

  onDateSelection(date: NgbDate) {
    this.fromDate = date;
    this.form.patchValue({
      start_date: new Date(
        this.fromDate.year,
        this.fromDate.month - 1,
        this.fromDate.day
      ),
    });

    this.datePickerValues.emit(this.form.value.start_date);
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
