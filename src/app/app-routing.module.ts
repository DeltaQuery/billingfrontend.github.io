import { ModuleWithProviders, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginGuard } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
      {
            path: "",
            component: SidenavComponent,
            canActivate: [LoginGuard],
            children: [
                  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
                  { path: "inicio", loadChildren: () => import("./components/start/start.module").then(m => m.StartModule) },
                  { path: "clientes", loadChildren: () => import("./components/customers/customers.module").then(m => m.CustomersModule) },
                  { path: "alumnos", loadChildren: () => import("./components/students/students.module").then(m => m.StudentsModule) },
                  { path: "productos", loadChildren: () => import("./components/products/products.module").then(m => m.ProductsModule) },
                  { path: "facturas", loadChildren: () => import("./components/invoices/invoices.module").then(m => m.InvoicesModule) },
                  { path: "reportes", loadChildren: () => import("./components/reports/reports.module").then(m => m.ReportsModule)/*, data: { expectedRole: "admin" }*/ },
                  { path: "error", component: ErrorComponent },
            ]
      },
      {
            path: "",
            component: LoginLayoutComponent,
            canActivate: [LogoutGuard],
            children: [
                  { path: '', redirectTo: 'login', pathMatch: 'full' },
                  { path: "login", loadChildren: () => import("./components/login/login.module").then(m => m.LoginModule) },
                  { path: '**', redirectTo: 'login' }
            ]
      }
];

/*const routes: Routes = [  
      { path: "login", loadChildren: () => import("./components/login/login.module").then(m => m.LoginModule), canActivate: [LogoutGuard ] },
      { path: "inicio", loadChildren: () => import("./components/start/start.module").then(m => m.StartModule), canActivate: [LoginGuard] },
      { path: "clientes", loadChildren: () => import("./components/customers/customers.module").then(m => m.CustomersModule), canActivate: [LoginGuard] },
      { path: "alumnos", loadChildren: () => import("./components/students/students.module").then(m => m.StudentsModule), canActivate: [LoginGuard] },
      { path: "productos", loadChildren: () => import("./components/products/products.module").then(m => m.ProductsModule), canActivate: [LoginGuard] },
      { path: "facturas", loadChildren: () => import("./components/invoices/invoices.module").then(m => m.InvoicesModule), canActivate: [LoginGuard] },
      { path: "reportes", loadChildren: () => import("./components/reports/reports.module").then(m => m.ReportsModule ), canActivate: [LoginGuard] },
      { path: "error", component: ErrorComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'full' } 
];*/

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

@NgModule({
      imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
                RouterModule.forRoot(routes, { useHash: true })
            ],
      exports: [RouterModule]
})
export class AppRoutingModule { }

