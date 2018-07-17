import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
  viewProviders: []
})
export class NewCustomerComponent implements OnInit {

  private types: Object[];

  constructor() {
  }

  ngOnInit() {
  }
}
