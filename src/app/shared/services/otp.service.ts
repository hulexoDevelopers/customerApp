import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError, observable } from "rxjs";
import { OtpService } from '../../core/services/index';



@Injectable({ providedIn: 'root' })
export class otpService {

    constructor(private _api: OtpService,
        private router: Router,
        private http: HttpClient) { }



    //get oil detail by id
    sendOtp(data) {
        return this._api.get(`${"sendOtp/" + data.contact + '/' + data.email}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }

    //verify otp
    verifyOtp(data) {
        return this._api.get(`${"verifyOtp/" + data.otp + '/' + data.contact}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }

}

