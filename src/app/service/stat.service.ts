import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, throwError, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { StatByResourceModel } from "../model/StatByResourceModel";
import { StatByUserModel } from "../model/StatByUserModel";


@Injectable({
    providedIn: 'root'
})
export class StatService{
    private readonly apiUrl = environment.apiURL;

    constructor(private http: HttpClient){ }

    // Get stats by resources : 
    getStatUsageByResources(): Observable<StatByResourceModel[]>{
        return this.http.get<StatByResourceModel[]>(`${this.apiUrl}/stat/get/byResources`)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }

    // Get stats by users : 
    getStatUsageByUser(): Observable<StatByUserModel[]>{
        return this.http.get<StatByUserModel[]>(`${this.apiUrl}/stat/get/byUser`)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );

    }
    private handleError(error: HttpErrorResponse): Observable<never> {
        console.log(error);
        return throwError(`An error occured - Error code ${error.status}`);
    }
}