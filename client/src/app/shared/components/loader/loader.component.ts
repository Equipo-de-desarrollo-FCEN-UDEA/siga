import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  // Loader
  public isLoading: Subject<boolean> = this.loaderSvc.isLoading;

  constructor(public loaderSvc: LoaderService) { }

  ngOnInit(): void {
  }

}
