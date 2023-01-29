import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {User} from "../model/User";
import moment from "moment";
import { environment } from "src/environments/environment";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { UserModel } from "../model/userModel";



@Injectable({
    providedIn: "root"
})
export class AuthService {

    private readonly apiUrl = environment.apiURL;

    private isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        this.isConnected = new BehaviorSubject<boolean>(this.isLoggedIn());
    }

    login(username:string, password:string ) {
        this.setUsername(username);
        return this.http.post<User>(`${this.apiUrl}/connect/login`, {username, password})
        .pipe(
            tap((res: any) => this.setSession(res)),
        );

    }

    // Set username
    setUsername(username: string) : void{
        localStorage.setItem("username", username);
    }

    setRole(role: string): void {
        localStorage.setItem("role", role);
    }

    getRole(): string{
        return localStorage.getItem("role") ?? "";
    }

    getUsername(): string{
        return localStorage.getItem("username") ?? "";
    }

    // Register : 
    register(user: UserModel) {
        return this.http.post<UserModel>(`${this.apiUrl}/connect/register`, user)
        .pipe(
            tap(console.log),
        )
    }

    private setSession(authResult: any) {
        this.setValue(true);
        const expiresAt = moment().add(authResult.expiresIn,'second');
        localStorage.setItem('id_token', authResult.access_token);
    }   
       
    logout() {
        this.setValue(false);
        localStorage.removeItem("id_token");
        localStorage.removeItem("username");
    }

    public isLoggedIn() {
        if(localStorage.getItem("id_token")){
            return true;
        } 
        return false;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at") ?? "";
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    

    setValue(newValue: boolean): void {
        this.isConnected.next(newValue);
    }

    getValue(): Observable<boolean> {
        return this.isConnected.asObservable();
    }

}
          