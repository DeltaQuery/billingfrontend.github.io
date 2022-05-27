import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices/invoices.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ByCustomerComponent } from './by-customer/by-customer.component';

const routes: Routes = [
  { path: "", 
  children: [
      { path: "", component: InvoicesComponent },
      { path: "facturar", component: CreateInvoiceComponent },
      { path: "facturas-individuales", component: ByCustomerComponent },
      { path: "**", redirectTo: "invoices" }
  ] }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
