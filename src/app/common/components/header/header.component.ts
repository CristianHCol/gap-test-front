import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user = {
    name: '',
    messages: []
  };
  constructor(private _router: Router) { }

  ngOnInit() {
    this.user.name = JSON.parse(localStorage.user).userName;
  }

  exitApp() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
