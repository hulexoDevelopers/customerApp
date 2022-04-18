import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError, observable } from "rxjs";
import { ApiService } from '../../core/services/index';
import { Subject } from "rxjs";
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class tyreService {

    constructor(private _api: ApiService,
        private router: Router,
        private http: HttpClient) { }



    //get tyre detail by id
    getTyreDetailById(id: string) {
        return this._api.get(`${"tyre/detail/" + id}`)
            .pipe(
                map((res: any) => res),
                catchError((error: any) => Observable.throw(error))
            );
    }

}

