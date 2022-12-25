import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { DocumentService } from '@services/document.service';

@Component({
  selector: 'app-full-time',
  templateUrl: './full-time.component.html',
  styleUrls: ['./full-time.component.scss']
})
export class FullTimeComponent implements OnInit {

  constructor(
    private router: Router,

    private fullTimeSvc: FullTimeService,
    private documentSvc: DocumentService
  ) { }

  ngOnInit(): void {
  }


  openDocument(path:string) {
    this.documentSvc.getDocument(path).subscribe(
      res => window.open(window.URL.createObjectURL(res))
    )
  }

  isInvalidForm(){

  }

}
