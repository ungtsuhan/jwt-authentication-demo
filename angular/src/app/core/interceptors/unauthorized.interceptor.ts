import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authService.logout();
                this.router.navigate(['/login'], {
                    queryParams: { returnUrl: 
                        this.router.routerState.snapshot.url == "/login" 
                        ? null
                        : this.router.routerState.snapshot.url 
                    }
                });
            }

            if(!environment.production) {
                console.log(err);
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            return throwError(() => error);
        }));
    }
}
