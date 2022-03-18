import { Injectable } from '@angular/core';
import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    Router, 
    RouterStateSnapshot, 
    UrlTree 
} from "@angular/router";
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): 
            | Observable<boolean | UrlTree> 
            | Promise<boolean | UrlTree>
            | boolean 
            | UrlTree {
                return this.authService.user$.pipe(
                    map(user => {
                        if (user) {
                            return true;
                        } else {
                            this.authService.clearLocalStorage();
                            this.router.navigate(['login'], {
                                queryParams: { returnUrl: state.url },
                            });
                            return false;
                        }
                    })
                )
            }
}