import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox'; 

import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { NgxPrintModule } from 'ngx-print';

import { ReportsRoutingModule } from './reports-routing.module';
import { StudentListComponent } from './statement-report/student-list/student-list.component';
import { BillingNoticeComponent } from './statement-report/billing-notice/billing-notice.component';
import { PrintReportButtonComponent } from './print-report-button/print-report-button.component';
import { SolvencyReportComponent } from './statement-report/solvency-report/solvency-report.component';
import { SpinnerInterceptor } from 'src/app/shared-module/interceptors/spinner-interceptor.interceptor';

@NgModule({
  declarations: [
    StudentListComponent,
    BillingNoticeComponent,
    PrintReportButtonComponent,
    SolvencyReportComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    HttpClientModule,
    ReportsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgxPrintModule,
  ],
  providers: [
    DatePipe,
    BillingNoticeComponent,
    SolvencyReportComponent,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ]
})
export class ReportsModule { }






