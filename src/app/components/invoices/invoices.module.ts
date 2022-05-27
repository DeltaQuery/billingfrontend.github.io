import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { NgxPrintModule } from 'ngx-print';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices/invoices.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ByCustomerComponent } from './by-customer/by-customer.component';
import { PrintInvoiceButtonComponent } from './print-invoice-button/print-invoice-button.component';
import { ByRangeComponent } from './by-range/by-range.component';
import { ByFilterComponent } from './by-filter/by-filter.component';
import { SpinnerInterceptor } from 'src/app/shared-module/interceptors/spinner-interceptor.interceptor';

@NgModule({
  declarations: [
    InvoicesComponent,
    CreateInvoiceComponent,
    ByCustomerComponent,
    ByRangeComponent,
    ByFilterComponent,
    PrintInvoiceButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    InvoicesRoutingModule,
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
    NgxPrintModule
  ],
  providers: [
    InvoicesComponent,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ]
})
export class InvoicesModule { }
