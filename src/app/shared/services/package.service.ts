import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError, observable } from "rxjs";
import { ApiService } from '../../core/services/index';
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class packageService {

    constructor(private _api: ApiService,
        private router: Router,
        private http: HttpClient) { }


    //get all batteries
    getAllpackages() {
        return this._api.get(`${"package/all"}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }


}

