import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import { MessageService, PolicyService, CustomerService} from '../../common/services/';
import { isArray } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [MessageService, PolicyService, CustomerService]
})

export class DashboardComponent implements OnInit {
  private customerList: object[];
  private policiesList: object[];

  constructor(private _router: Router,
    private _loadingService: TdLoadingService,
    private _policyService: PolicyService,
    private _customerService: CustomerService) {
    // this.loadEssaysByMonthGraphic();
    // this.loadTopGraphics();
  };

  ngOnInit() {
    setTimeout(() => {
      const user = localStorage.getItem('user');
      this._loadingService.register('policies.load');

      this._policyService.getAll().then((response) => {
        isArray(response) ?  this.policiesList = response :  this.policiesList = [];
        this._loadingService.resolve('policies.load');
      }).catch((ex) => {
          console.log('error getting policies', ex);
      });

      this._loadingService.register('customer.load');
      this._customerService.getAll().then((response) => {
        isArray(response) ?  this.customerList = response :  this.customerList = [];
        this._loadingService.resolve('customer.load');
      }).catch((ex) => {
          console.log('error getting customers', ex);
      });
    }, 750);
  }

  showDetail(item: any, origin: number): void {
    if (origin === 1) {
      localStorage.setItem('PolicyDetail', JSON.stringify(item));
      this._router.navigate(['/policyDetail']);
    } else {
      localStorage.setItem('CustomerDetail', JSON.stringify(item));
      this._router.navigate(['/customerDetail']);
    }
  }

  addNewPolicy(): void{
    this._router.navigate(['/newPolicy']);
  }

  addNewCustomer(): void {
    this._router.navigate(['/newCustomer']);
  }
}
