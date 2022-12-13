import { Injectable } from '@angular/core';
import { Application } from '@interfaces/application';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComService {

  public application: Subject<Application> = new Subject();

  constructor() { 
  }


  push(data: Application) {
    this.application.next(data);
  }

}
