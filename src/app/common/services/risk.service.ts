import { Injectable } from '@angular/core';
import { Constants } from '../Constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RiskService {
    headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    constructor( private http: HttpClient ) { }

    getAll(): any {
        return this.http.get(Constants.ApiUrls.Api_URL + 'api/risk', { headers: this.headers })
            .toPromise().then((r) => {
                return r;
            }).catch((e) => {
                return e;
            });
    }
}
