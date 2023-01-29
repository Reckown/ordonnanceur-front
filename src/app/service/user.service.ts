import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { UserModel } from "../model/userModel";


@Injectable({
    providedIn: 'root'
})
export class UserService{
    private readonly apiUrl = environment.apiURL;

    constructor(private http: HttpClient){ }

    // Get all the users in the base : 
    getAllUser(): Observable<UserModel[]>{
        return this.http.get<UserModel[]>(`${this.apiUrl}/user/getAll`)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        );
    }

    // Add user : 
    addUser(user: UserModel): Observable<UserModel>{
        return this.http.post<UserModel>(`${this.apiUrl}/user/new`, user)
        .pipe(
            tap(console.log),
            catchError(this.handleError)
        )
    }

    // Edit user : 
    editUser(user: UserModel): Observable<UserModel>{
        return this.http.post<UserModel>(`${this.apiUrl}/user/edit`, user)
        .pipe(
            tap(console.log),
            catchError(this.handleError),
        );
    }

    // Get user by id : 
    getById(id: string): Observable<UserModel[]>{
        return this.http.get<UserModel[]>(`${this.apiUrl}/user/get/${id}`)
        .pipe(
            tap(console.log),
            catchError(this.handleError),
        );
    }

    deleteById(id: string): Observable<UserModel>{
        return this.http.delete<UserModel>(`${this.apiUrl}/user/delete/${id}`)
        .pipe(
            tap(console.log),
            catchError(this.handleError),
        )
    }

    getByUsername(username: string): Observable<UserModel>{
        return this.http.get<UserModel>(`${this.apiUrl}/user/getByName/${username}`)
        .pipe(
            tap(console.log),
            catchError(this.handleError),
        );

    }

    private handleError(error: HttpErrorResponse): Observable<never>{
        console.log(error);
        return throwError(`An error occured - Error code ${error.status}`);
    }
}