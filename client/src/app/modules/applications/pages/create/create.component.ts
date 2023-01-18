import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@services/loader.service';
import { Subject } from 'rxjs';
import { CommissionComponent } from './components/commission/commission.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  // Title for the header of create application
  public title: string = '';
  public button: string = '';

  private activatedComponentReference: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { 
    // We take the title from the child data
    this.button = this.route.snapshot.firstChild?.data['button'];
    this.title = this.route.snapshot.firstChild?.data['title'];
    
  }

  ngOnInit(): void {
  }

  onActivate(componentRef: any) {
    this.activatedComponentReference = componentRef
  }

  click() {
    const childRouteComp = this.activatedComponentReference;
    childRouteComp.submit();
  }

  cancel() {
    this.location.back();
  }

  invalidForm() {
    const childRouteComp = this.activatedComponentReference;
    let validSize = !childRouteComp.validSize();
    let validFileType = !childRouteComp.validFileType();

    return validSize || validFileType
  }

}
