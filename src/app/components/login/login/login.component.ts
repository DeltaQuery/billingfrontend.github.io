import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { LoginResponse } from 'src/app/models/login-response';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showErrorMessage: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private _loginService: LoginServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(form: Login){
    this._loginService.login(form).subscribe( (res:any) => {
      localStorage.setItem('token',res.token);
      this.router.navigateByUrl('/inicio');
      this.showErrorMessage = false;
    },(error)=>{
      this.showErrorMessage = true;
    })
  }

  buildForm(){
    this.loginForm = this.formBuilder.group({
      user : ["", Validators.required],
      password : ["", [Validators.required]]
    });
  }
}
