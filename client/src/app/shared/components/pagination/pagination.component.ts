import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() items: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
