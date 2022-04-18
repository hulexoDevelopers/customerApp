import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { dataStorageService } from './../../shared/services/data.storage';
import { StorageService } from './../../shared/services/storage.servicet';
import { DataService } from 'src/app/shared/services/data.service';
import { Storage } from '@ionic/storage-angular';
import { capStorageService } from './../../shared/services/cap.storage';
@Injectable()
export class OtpService {

    isAuth: boolean = false;
    token: string;

    constructor(private http: HttpClient,
        private cap: capStorageService,
        private route: Router, private st: Storage, private dataStorageService: dataStorageService, private storageService: StorageService, private DataService: DataService) {

    }



    private formatErrors(error: any) {
        return throwError(error.error);
    }

    get(path: string, httpParams: HttpParams = new HttpParams()): Observable<any> {
        return this.http
            .get(`${environment.otp_url}${path}`, {
            })
            .pipe(catchError(this.formatErrors));
    }



}
