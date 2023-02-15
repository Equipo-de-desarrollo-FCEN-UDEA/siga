import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Holiday } from '@interfaces/holiday';
import {
  NgbDate,
  NgbDateStruct,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { file_path, DocumentsResponse } from '@interfaces/documents';

import { ApplicationSubTypeService } from '@services/application-sub-type.service';
import { ApplicationTypesService } from '@services/application-types.service';
import { DocumentService } from '@services/document.service';
import { VacationService } from '@services/applications/vacation.service';
import { HolidayService } from '@services/holiday.service';
import { LaboralDays } from '@shared/utils';


@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss']
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
  public documentsToDelete: string[] = [];

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  public id: number = 0;

  public applicationType$ = this.applicationTypeSvc.getApplicationType(1);

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

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      // this.vacationSvc.getVacation(this.id).subscribe((data) => {
      //   // console.log(data);
      //   this.form.patchValue({
      //     ...data.vacation,
      //     application_sub_type_id: data.application_sub_type_id,
      //   });
      //   // console.log(data.vacation);
      //   this.documents = data.vacation.documents!;

      //   this.SubTypeSvc.getApplicationSubType(+data.application_sub_type_id).subscribe({
      //     next: (res) => {
      //       this.laboralDay = res.extra.days;
      //     },
      //   });
      // });
    });
  }

}
