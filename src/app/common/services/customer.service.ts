import { Injectable } from '@angular/core';
import { Constants } from '../Constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    constructor( private http: HttpClient ) { }

    getAll():  any {
        return this.http.get(Constants.ApiUrls.Api_URL + 'api/customer', { headers: this.headers })
            .toPromise().then((r) => {
                return r;
            }).catch((e) => {
                return e;
            });
    }

    findByIdUser(id: number):  any {
        return this.http.get(Constants.ApiUrls.Api_URL + 'api/customer/' + id, { headers: this.headers })
            .toPromise().then((r) => {
                return r;
            }).catch((e) => {
                return e;
            });
    }

    cereate(data: Customer): any {
        return this.http.post(Constants.ApiUrls.Api_URL + 'api/customer', data , { headers: this.headers })
        .toPromise().then((r) => {
            return r;
        }).catch((e) => {
            return e;
        });
    }

    update(data: Customer): any {
        return this.http.put(Constants.ApiUrls.Api_URL + 'api/customer/' + data.Id , data , { headers: this.headers })
        .toPromise().then((r) => {
            return r;
        }).catch((e) => {
            return e;
        });
    }

    delete(id: number): any {
        return this.http.delete(Constants.ApiUrls.Api_URL + 'api/customer/' + id, { headers: this.headers })
        .toPromise().then((r) => {
            return r;
        }).catch((e) => {
            return e;
        });
    }
}
