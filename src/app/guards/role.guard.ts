import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginServiceService } from '../services/login-service/login-service.service';
import decode from "jwt-decode";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private _loginService: LoginServiceService,
    public router: Router,
    private location: Location
  ){ }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    if(!this._loginService.isAuth()){
      console.log('Token no es válido o ya expiró');
      this.router.navigateByUrl('/login');
      return false;
    }

    const expectedRole = route.data['expectedRole'];
    const token: any = localStorage.getItem("token");
    let {user, role}: any = decode(token);

    if(role !== expectedRole){
      console.log("Usuario no autorizado para la vista.");
      this.router.navigateByUrl('/inicio');
      return false;
    }
    return true;   
  }

  //original
  /*canActivate(route: ActivatedRouteSnapshot): boolean{
    const expectedRole = route.data['expectedRole'];
    const token: any = localStorage.getItem("token");
    
    if(token){
      let {user, role}: any = decode(token);
      if(role !== expectedRole){
      if(!this._loginService.isAuth()){
        this.router.navigateByUrl('/login');
      }
      console.log("Usuario no autorizado para la vista.");
      return false;
    }
    return true;
    }
    
    return false;
  }*/

  }
  
