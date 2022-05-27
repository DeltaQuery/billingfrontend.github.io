import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login-service/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  
  constructor(private _loginService: LoginServiceService,
    private router: Router){
  }

  canActivate():boolean{
    if(this._loginService.isAuth()){
      console.log('Desloguéate para acceder a la vista de Login.');
      this.router.navigateByUrl('/inicio');
      return false;
    }
    return true;
  }
  
}
 