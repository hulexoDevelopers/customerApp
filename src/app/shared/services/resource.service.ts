import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError, observable } from "rxjs";
import { ApiService } from '../../core/services/index';
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class resourceService {

    public allCategories: any;
    public allTypes: any;

    constructor(private _api: ApiService,
        private router: Router,
        private http: HttpClient,

    ) { }





    loadData() {

        // this.getAllMealCategories().subscribe(res => {
        //     this.allCategories = res.data;
        // });
        // // this.getAllMealPlans();
        // this.getAllMealTypes().subscribe(res => {
        //     this.allTypes = res.data;
        // });
    }


}

