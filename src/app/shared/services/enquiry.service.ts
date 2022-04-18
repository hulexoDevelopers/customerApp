import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError, observable } from "rxjs";
import { ApiService } from '../../core/services/index';
import { Subject } from "rxjs";
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class inquiryService {

    constructor(private _api: ApiService,
        private router: Router,
        private http: HttpClient,
    ) { }


    //add new enquiry
    addNewEnquiry(data) {
        return this._api.post(`${"inquiry/addNew"}`, data)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }



    //get enquiry by enquiry id
    getEnquiryById(id: string) {
        return this._api.get(`${"inquiry/" + id}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }


    //get all customer inquiries
    getCustomerInquiriesById(id: string) {
        return this._api.get(`${"inquiry/byCustomerId/" + id}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }




}

