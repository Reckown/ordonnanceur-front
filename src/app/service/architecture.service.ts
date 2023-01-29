import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ArchitectureModel } from "../model/architectureModel";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";


@Injectable({
    providedIn:'root'
})
export class ArchitectureService{
    private readonly apiUrl = environment.apiURL;

    constructor(private http: HttpClient){ }

    // Get all the architectures in the base : 
    getAllArchitecture(): Observable<ArchitectureModel[]>{
        return this.http.get<ArchitectureModel[]>(`${this.apiUrl}/architecture/getAll`)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }

    // Get one architecture by ID : 
    getOneArchitecture(id: string): Observable<ArchitectureModel[]>{
        return this.http.get<ArchitectureModel[]>(`${this.apiUrl}/architecture/get/${id}`)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }

    // Edit an architecture : 
    editArchitecture(architecture: ArchitectureModel): Observable<ArchitectureModel[]>{
        return this.http.post<ArchitectureModel[]>(`${this.apiUrl}/architecture/edit`, architecture)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }

    // Add a new architecture : 
    addArchitecture(architecture: ArchitectureModel): Observable<ArchitectureModel[]>{
        return this.http.post<ArchitectureModel[]>(`${this.apiUrl}/architecture/add`, architecture)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }

    // Delete an architecture : 
    deleteArchitecture(id: string): Observable<ArchitectureModel[]>{
        return this.http.delete<ArchitectureModel[]>(`${this.apiUrl}/architecture/delete/${id}`)
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