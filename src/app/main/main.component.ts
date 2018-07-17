import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  routes: Array<Object> = [{
    title: 'dashboard',
    route: '/dashboard',
    icon: 'dashboard',
  }, {
    title: 'Ensayos',
    route: '/assays',
    icon: 'assignment',
  }, {
    title: 'Reportes',
    route: '/reports',
    icon: 'trending_up',
  }, {
    title: 'Calendario',
    route: '/schedule',
    icon: 'date_range',
  }, {
    title: 'Costos',
    route: '/costs',
    icon: 'attach_money',
  }, {
    title: 'Perfil',
    route: '/profile',
    icon: 'account_box',
  }];

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this._router.navigate(['/login']);
  }
}
