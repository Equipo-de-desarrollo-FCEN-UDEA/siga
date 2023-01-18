import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullTimeCreate, FulltimeResponse } from '@interfaces/applications/full_time/full-time';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viceformat',
  templateUrl: './viceformat.component.html',
  styleUrls: ['./viceformat.component.scss']
})
export class FullTimeFormatComponent implements OnInit {

  constructor(


  ) { }

  ngOnInit(): void {
    
  }

}
