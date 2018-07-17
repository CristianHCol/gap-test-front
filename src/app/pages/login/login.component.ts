import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, MessageService } from '../../common/services/';
import { User } from './../../common/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  viewProviders: [LoginService, MessageService]
})
export class LoginComponent implements OnInit {

  public dataUser: User;

  constructor(private _router: Router,
    private _loginService: LoginService, private _messageServices: MessageService) {
      this.dataUser = new User('', '');
     }

  ngOnInit() {
  }

  login(): void {
    this._messageServices.showLoading();
    this._loginService.authenticate(this.dataUser)
    .then((loginRs) => {
      if (loginRs) {
          localStorage.setItem('user', JSON.stringify(this.dataUser));
          this._messageServices.hideLoading();
          this._router.navigate(['/dashboard']);
      } else {
        this._messageServices.openAlert('Autenticación Fallida', 'Usuario y/o Contraseña inválidos');
      }
    }).catch((e) => {
      this._messageServices.openAlert('OHHH!!', 'Algo fuera de lo normal ha ocurrido');
    });
  }
}
