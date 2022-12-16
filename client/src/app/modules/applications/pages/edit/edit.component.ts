import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public title: string = '';

  private activatedComponentReference: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { 
    // We take the titile from the child data
    this.title = this.route.snapshot.firstChild?.data['title'];
  }

  ngOnInit(): void {
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

}
