import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { CalendarEventModel } from "../model/CalendarEventModel";


@Injectable({
    providedIn: "root"
})
export class CalendarService{
    private readonly apiUrl = environment.apiURL;

    constructor(private http: HttpClient) {  }

    // Get all events in the calendar : 
    getAllEvents(): Observable<CalendarEventModel[]>{
        return this.http.get<CalendarEventModel[]>(`${this.apiUrl}/calendar/getAll`)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }

    // Get event by the id of the resource : 
    getEventByRessourceId(id: string): Observable<CalendarEventModel[]>{
        return this.http.get<CalendarEventModel[]>(`${this.apiUrl}/calendar/get/${id}`)
        .pipe(
            tap(console.log),
            catchError(this.handleError),
        );
    }

    // Add events to the calendar : 
    addCalendarEvent(events: CalendarEventModel[]): Observable<CalendarEventModel[]>{
        return this.http.post<CalendarEventModel[]>(`${this.apiUrl}/calendar/add`, events)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }
    
    // Get all resources for a user : 
    getResourcesByIdUser(id: string): Observable<CalendarEventModel[]>{
        return this.http.get<CalendarEventModel[]>(`${this.apiUrl}/calendar/get/user/${id}`)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }

    // Delete by id : 
    deleteEventById(id: string): Observable<CalendarEventModel[]>{
        return this.http.delete<CalendarEventModel[]>(`${this.apiUrl}/calendar/delete/${id}`)
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