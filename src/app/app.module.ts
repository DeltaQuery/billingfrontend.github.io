import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

//componentes y modulos
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

//providers
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';

//eliminar al migrar componente 
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { SpinnerInterceptor } from './shared-module/interceptors/spinner-interceptor.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ConnectionServiceModule } from 'ngx-connection-service';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    SidenavComponent,
    LoginLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    SharedModuleModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ConnectionServiceModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    //token interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
