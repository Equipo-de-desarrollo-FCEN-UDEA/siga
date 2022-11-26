import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommissionComponent } from './components/commission/commission.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  // Title for the header of create application
  public title: string = '';

  private activatedComponentReference: any;

  constructor(
    private route: ActivatedRoute,
  ) { 
    // We take the titile from the child data
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

}
