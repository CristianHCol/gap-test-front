import { Policy } from './../models/policy';
import { Injectable } from '@angular/core';
import { Constants } from '../Constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PolicyService {
    headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    constructor( private http: HttpClient ) { }

    getAll():  any {
        return this.http.get(Constants.ApiUrls.Api_URL + 'api/policy', { headers: this.headers })
            .toPromise().then((r) => {
                return r;
            }).catch((e) => {
                return e;
            });
    }

    cereate(data: Policy): any {
        return this.http.post(Constants.ApiUrls.Api_URL + 'api/policy', data ,{ headers: this.headers })
        .toPromise().then((r) => {
            return r;
        }).catch((e) => {
            return e;
        });
    }

    delete(id: number): any {
        return this.http.delete(Constants.ApiUrls.Api_URL + 'api/policy/' + id, { headers: this.headers })
        .toPromise().then((r) => {
            return r;
        }).catch((e) => {
            return e;
        });
    }

    update(data: Policy): any {
        return this.http.put(Constants.ApiUrls.Api_URL + 'api/policy/' + data.Id , data , { headers: this.headers })
        .toPromise().then((r) => {
            return r;
        }).catch((e) => {
            return e;
        });
    }
}
