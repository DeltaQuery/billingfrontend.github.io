import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { NgxPrintModule } from 'ngx-print';

import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { estatusPipe } from '../pipes/estatusPipe.pipe';
import { productsViewPipe } from '../pipes/productsView.pipe';
import { invoiceEstatusPipe } from '../pipes/invoiceEstatusPipe.pipe';
import { ReturnButtonComponent } from './return-button/return-button.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    ViewInvoiceComponent,
    estatusPipe,
    productsViewPipe,
    invoiceEstatusPipe,
    ReturnButtonComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  exports: [
    ViewInvoiceComponent,
    estatusPipe,
    productsViewPipe,
    invoiceEstatusPipe,
    ReturnButtonComponent,
    SpinnerComponent
  ]
})
export class SharedModuleModule { }
