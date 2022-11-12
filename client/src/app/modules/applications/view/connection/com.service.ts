import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComService {

  public application: Subject<string> = new Subject();

  constructor() { 
  }


  push(data: string) {
    this.application.next(data);
  }

}
