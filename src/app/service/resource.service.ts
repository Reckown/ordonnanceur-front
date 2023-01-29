import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ResourceModel } from "../model/resourceModel";


@Injectable({
    providedIn: 'root'
})
export class ResourcesService{
    private readonly apiUrl = environment.apiURL;

    constructor(private http: HttpClient){ }

    // Get all the resources in the base : 
    getAllResources(): Observable<ResourceModel[]>{
        return this.http.get<ResourceModel[]>(`${this.apiUrl}/resource/getAll`)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }

    // Add a new resource to the base : 
    addResource(resource: ResourceModel): Observable<ResourceModel[]>{
        return this.http.post<ResourceModel[]>(`${this.apiUrl}/resource/add`, resource)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }

    // Get one resource by id : 
    getById(id: string): Observable<ResourceModel[]>{
        return this.http.get<ResourceModel[]>(`${this.apiUrl}/resource/get/${id}`)
        .pipe(
            tap(console.log),
            catchError(this.handleError),
        );
    }
    
    // Delete a resource by id : 
    deleteById(id: string): Observable<ResourceModel[]>{
        return this.http.delete<ResourceModel[]>(`${this.apiUrl}/resource/delete/${id}`)
        .pipe(
            tap(console.log),
            catchError(this.handleError),
        )
    }

    // Edit a resource : 
    editResource(resource: ResourceModel): Observable<ResourceModel[]>{
        return this.http.post<ResourceModel[]>(`${this.apiUrl}/resource/edit`, resource)
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