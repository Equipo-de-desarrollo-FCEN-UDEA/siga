import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Application } from '@interfaces/application';
import { FulltimeResponse } from '@interfaces/applications/full_time/full-time';
import { ApplicationService } from '@services/application.service';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-full-time-list',
  templateUrl: './full-time-list.component.html',
  styleUrls: ['./full-time-list.component.scss']
})
export class FullTimeListComponent implements OnInit {

  public applications: Application [] = [];
  public full_time: FulltimeResponse [] = [];
  public from_full_time: boolean = true;

  constructor(
    private fb: FormBuilder,
    private applicationSvc: ApplicationService,
    private fullTimeSvc: FullTimeService
  ) { }

  public form = this.fb.group({
    from_full_time: [true],
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
  })

  ngOnInit(): void {
  }

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }
}
