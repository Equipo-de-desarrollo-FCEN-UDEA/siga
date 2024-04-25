import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { file_path } from '@interfaces/documents';
import { FullTimeService } from '@services/applications/full_time/full-time.service';

/**
 * Angular component for selecting a start date for full time application.
 */
@Component({
  selector: 'app-full-time-select-date',
  templateUrl: './full-time-select-date.component.html',
  styleUrls: ['./full-time-select-date.component.scss'],
})
export class FullTimeSelectDateComponent {
  /** Identifier of the full-time event. */
  public id!: number;
  /** List of file paths related to the event. */
  public documents: file_path[] = [];

  /**
   * Constructor of the component.
   * @param fb Instance of FormBuilder for building the form.
   * @param route Instance of ActivatedRoute for getting route parameters.
   * @param fullTimeService Instance of FullTimeService for fetching event data.
   */
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fullTimeService: FullTimeService
  ) {
    // Gets the event ID from the route and loads event data when the component initializes.
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      this.fullTimeService.getFullTime(this.id).subscribe((data) => {
        console.log(data.full_time);

        this.form.patchValue({
          start_date: data.start_date,
          title: data.full_time.title,
          documents: data.full_time.documents,
        });
      });
    });
  }

  /** Form for selecting the start date and managing documents. */
  public form = this.fb.group({
    start_date: [new Date(), [Validators.required]],
    title: ['', [Validators.required]],
    documents: [this.documents],
  });

  /**
   * Method to set the start date in the form.
   * @param event Event containing the selected start date.
   */
  setDates(event: any) {
    this.form.patchValue({
      start_date: event.start_date,
    });
  }

  submit() {
    console.log('hola mundo');
  }
}
