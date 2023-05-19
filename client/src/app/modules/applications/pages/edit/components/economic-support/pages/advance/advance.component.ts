import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ACCOUNT_TYPE } from '@modules/applications/pages/create/components/economic-support/data/economic-support';
import { NgbDate, NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { EconomicSupportService } from '@services/applications/economic-support.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss']
})
export class AdvanceComponent implements OnInit {

  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  // For handle errors
  public clicked = 0;
  public error = '';

  public id:number = 0;

  get f() {
    return this.form.controls;
  }
  public ACCOUNT_TYPE = ACCOUNT_TYPE

  @Output() submitted = false;
  @Output() sendForm = new EventEmitter<any>();

  public form = this.fb.group({
    name: ['', [Validators.required]],
    id: ['', [Validators.required]],
    bank: ['', [Validators.required]],
    value: ['', [Validators.required]],
    account_number: ['', [Validators.required]],
    account_type: ['', [Validators.required]],
    start_date: [new Date(), [Validators.required]],
    end_date: [new Date(), [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    
    private fb: FormBuilder,

    private economicSupportSvc: EconomicSupportService,

    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      this.economicSupportSvc.getEconomicSupport(this.id).subscribe((data) => {
        //console.log(data);
        this.form.patchValue({
          name: data.economic_support.payment.name,
          id: data.economic_support.payment.id,
          bank: data.economic_support.payment.bank,
          value: data.economic_support.payment.value,
          account_number: data.economic_support.payment.account_number,
          account_type: data.economic_support.payment.account_type,
          start_date: data.economic_support.payment.start_date,
          end_date: data.economic_support.payment.end_date,
        });
      });
    });
  }
  

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
