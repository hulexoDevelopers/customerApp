import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError, observable } from "rxjs";
import { ApiService } from '../../core/services/index';
import { Subject } from "rxjs";
import { environment } from '../../../environments/environment';
// import { UserInfoService } from '../.shared/auth/userInfoService';

@Injectable({ providedIn: 'root' })
export class vehicleService {

    constructor(private _api: ApiService,
        private router: Router,
        private http: HttpClient
    ) { }




    //get all vehicle list
    getAllVehicleList() {
        return this._api.get(`${"vehicle/all"}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }

    //get vehicle by vehicle id
    getVehicleById(id: string) {
        return this._api.get(`${"vehicle/" + id}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }

    //get vehicle with detail
    getVehicleDetail(id: string) {
        return this._api.get(`${"vehicle/detail/" + id}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }
    //get vehicle recomended batteries
    getVehicleBatteriesById(id: string) {
        return this._api.get(`${"vehicle/recomendedBatteries/" + id}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }


    //get vehicle recomended tyres
    getVehicleTyresById(id: string) {
        return this._api.get(`${"vehicle/recomendedTyres/" + id}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }


    //get vehicle recomended oils
    getVehicleOilsById(id: string) {
        return this._api.get(`${"vehicle/recomendedOils/" + id}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }

}

