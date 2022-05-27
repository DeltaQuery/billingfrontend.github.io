import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { map, shareReplay } from 'rxjs/operators';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { Router } from '@angular/router';
import { ComponentTitleService } from 'src/app/services/component-title/component-title.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  property!: string;
  subscription!: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, private _loginService: LoginServiceService, private router: Router, public _titleService: ComponentTitleService) {}

  ngOnInit() {
}

  logout(){
    this._loginService.logout();
    this.router.navigateByUrl('/login');
  }
}
