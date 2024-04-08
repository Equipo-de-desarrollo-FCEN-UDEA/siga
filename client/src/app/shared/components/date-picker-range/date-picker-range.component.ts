import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Holiday } from '@interfaces/holiday';

//ngBootstrap imports
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

import { LaboralDays } from '@shared/utils';

@Component({
  selector: 'app-date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.scss'],
})
export class DatePickerRangeComponent implements OnInit {
  @Input() total_days: any;
  @Input() laboralflag: boolean = true;
  @Input() holidays: Holiday[] = [];

  @Output() datePickerValues = new EventEmitter<any>();

  public form: FormGroup;

  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();
  public laboralDay: number = 0;
  public verify_date: number = 0;

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  get f() {
    return this.form.controls;
  }

  constructor(
    private calendar: NgbCalendar,
    private fb: FormBuilder,
    public formatter: NgbDateParserFormatter
  ) {
    this.form = this.fb.group({
      start_date: [new Date(), [Validators.required]],
      end_date: [new Date(), [Validators.required]],
    });
  }

  onChanged(): void {
    this.datePickerValues.emit(this.form.value);
  }

  ngOnInit(): void {}

  selectDays(fromDate: NgbDate | null, toDate: NgbDate | null): boolean {
    const tot_days = this.total_days;
    const entero_temp = tot_days;

    if (fromDate || toDate) {
      //Verify between laboral days and calendar days
      if (this.laboralflag) {
        this.laboralDay = LaboralDays(
          new Date(this.formatter.format(fromDate)),
          new Date(this.formatter.format(toDate)),
          this.holidays
        );
        //Variable to verify (laboralDay)
        this.verify_date = this.laboralDay;
      } else {
        this.verify_date =
          new Date(this.formatter.format(toDate)).getTime() -
          new Date(this.formatter.format(fromDate)).getTime();
        //In this case is important to take the date as days:
        this.verify_date = this.verify_date / (1000 * 3600 * 24) + 1;
      }
      //If days in form does not equal to required, the form does not allow continue
      if (this.verify_date != entero_temp) {
        return true;
      }
      this.form.value.end_date = new Date(this.formatter.format(toDate));
      return false;
    } else {
      return false;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.form.patchValue({
        start_date: new Date(
          this.fromDate!.year,
          this.fromDate!.month - 1,
          this.fromDate!.day
        ),
      });
    } else if (this.fromDate && !this.toDate && date) {
      this.toDate = date;
      this.form.patchValue({
        end_date: new Date(
          this.toDate.year,
          this.toDate.month - 1,
          this.toDate.day
        ),
      });
    } else {
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

    this.onChanged();
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
}
