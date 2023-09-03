import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDate, NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { EconomicSupportService } from '@services/applications/economic-support.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent {
  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  // For handle errors
  public clicked = 0;
  public error = '';

  public id: number = 0;

  @Output() submitted = false;

  get f() {
    return this.form.controls;
  }

  public form = this.fb.group({
    departure_date: [new Date(), [Validators.required]],
    arrival_date: [new Date(), [Validators.required]],
    departure_place: ['', [Validators.required]],
    arrival_place: ['', [Validators.required]],
    place_birth: ['', [Validators.required]],
    //birthdate: ['', [Validators.required]],
  });

  @Output() sendForm = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    
    private route: ActivatedRoute,
    private economicSupportSvc: EconomicSupportService,

    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      this.economicSupportSvc.getEconomicSupport(this.id).subscribe((data) => {
        //console.log(data);
        this.form.patchValue({
          departure_date: data.economic_support.tickets.departure_date,
          arrival_date: data.economic_support.tickets.arrival_date,
          departure_place: data.economic_support.tickets.departure_place,
          arrival_place: data.economic_support.tickets.arrival_place,
          place_birth: data.economic_support.tickets.place_birth,
          //birthdate: data.economic_support.tickets.birthdate,
        });
      });
    });
  }


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
