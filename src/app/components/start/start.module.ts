import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StartRoutingModule } from './start-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { NgxPrintModule } from 'ngx-print';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { MatIconModule } from '@angular/material/icon';

import { StartComponent } from './start/start.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { IncomeComponent } from './income/income.component';
import { DebtorsComponent } from './debtors/debtors.component';
import { StudentsComponent } from './students/students.component';
import { SpinnerInterceptor } from 'src/app/shared-module/interceptors/spinner-interceptor.interceptor';

@NgModule({
  declarations: [
    StartComponent,
    InvoicesComponent,
    IncomeComponent,
    DebtorsComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgxPrintModule,
    SharedModuleModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ]
})
export class StartModule { }
