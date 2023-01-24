import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullTimeCreate, FulltimeResponse } from '@interfaces/applications/full_time/full-time';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-full-time-format',
  templateUrl: './full-time-format.component.html',
  styleUrls: ['./full-time-format.component.scss']
})
export class FullTimeFormatComponent implements OnInit {

  constructor(


  ) { }

  ngOnInit(): void {
    
  }

}
