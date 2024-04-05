import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsStatusService {

  constructor() { }

  startLetterStatus: boolean = false;
  viceFormatStatus: boolean = false;
  workPlanStatus: boolean = false;

  setStartLetterStatus(statusSelected:boolean): void {
    this.startLetterStatus = statusSelected;
  }

  setViceFormatStatus(statusSelected:boolean): void {
    this.viceFormatStatus = statusSelected;
  }

  setWorkPlanStatus(statusSelected:boolean): void {
    this.workPlanStatus = statusSelected;
  }
}
