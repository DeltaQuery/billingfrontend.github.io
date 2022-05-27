import { InvoicesComponent } from '../invoices/invoices.component';
import { Component, ElementRef, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-print-invoice-button',
  templateUrl: './print-invoice-button.component.html',
  styleUrls: ['./print-invoice-button.component.scss']
})
export class PrintInvoiceButtonComponent implements OnInit {

  constructor(private invoiceComponent: InvoicesComponent) { }

  ngOnInit(): void {
  }

  triggerPrint(){
    this.invoiceComponent.triggerPrint();
  }
}
