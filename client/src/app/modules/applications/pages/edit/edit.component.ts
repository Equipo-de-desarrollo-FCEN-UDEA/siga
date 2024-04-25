import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  public title: string = '';
  public button: string = '';

  private activatedComponentReference: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { 
    // We take the titile from the child data
    this.button = this.route.snapshot.firstChild?.data['button'];
    this.title = this.route.snapshot.firstChild?.data['title'];
  }

  onActivate(componentRef: any) {
    this.activatedComponentReference = componentRef
  }

  cancel() {
    this.location.back();
  }

  click() {
    const childRouteComp = this.activatedComponentReference;
    childRouteComp.submit();
  }

  invalidForm() {
    const childRouteComp = this.activatedComponentReference;
    return childRouteComp.invalidFile? !childRouteComp.invalidFile(): false;
  }

  

}
