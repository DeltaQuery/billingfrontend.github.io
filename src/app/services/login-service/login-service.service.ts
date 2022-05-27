import { Injectable } from '@angular/core';
import { Login } from 'src/app/models/login';
import { LoginResponse } from 'src/app/models/login-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, throwError, catchError, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from "jwt-decode";
import { API_URI } from '../api';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient,
    private jwtHelper: JwtHelperService) { }

  login(form: Login):Observable<LoginResponse | void>{
    return this.http.post<LoginResponse>(
      `${API_URI}/users/login`,form);
  }

  isAuth():boolean{
    //da error cuando no hay token, pero funciona
    const token: any = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }

  logout(){
    localStorage.removeItem('token');
  }

  private handlerError(err: { message: any; }): Observable<never> {
    let errorMessage = "Un error ha ocurrido extrayendo la data";
    if(err){
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);

  }

  getUsername(){
    const token: any = localStorage.getItem("token");
    const user: any = decode(token);
    return user.usuario.user;
  }
}
