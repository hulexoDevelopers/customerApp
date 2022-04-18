import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError, observable } from "rxjs";
import { ApiService } from '../../core/services/index';
import { Subject } from "rxjs";
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class saveLocationService {

    constructor(private _api: ApiService,
        private router: Router,
        private http: HttpClient) { }



    //get user locations
    getUserLocation(id: string) {
        return this._api.get(`${"location/byUserId/" + id}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }

    //add new location
    addNewLocation(data) {
        return this._api.post(`${"location/addnew"}`, data)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }

    //update location
    updateLocation(id, data) {
        return this._api.put(`${"location/updateLocation/" + id}`, data)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }
}

