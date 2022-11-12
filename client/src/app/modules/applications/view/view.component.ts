import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '@interfaces/application';
import { Observable } from 'rxjs';
import { ComService } from './connection/com.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, AfterViewChecked {

  public title:string = '';

  public application$ = new Observable<Application>();

  public text$ = new Observable<string>();

  public historyStatus = false;

  constructor(
    private route: ActivatedRoute,
    private comSvc: ComService,
    private cdRef: ChangeDetectorRef
  ) { 
    this.title = this.route.snapshot.firstChild?.data['title'];
    this.application$ = this.comSvc.application;
  }

  ngOnInit(): void {
    
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges()
  }

}
