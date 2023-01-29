import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem("id_token");

    if(accessToken)
    {
        request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`
        }
        });
    }

    return next.handle(request)
        .pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
        }
        }, async (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    await localStorage.removeItem("id_token");
                    this.router.navigate(['login']);
            }
        }
    }));
  }
}