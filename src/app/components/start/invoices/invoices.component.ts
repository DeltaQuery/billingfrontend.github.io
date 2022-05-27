import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice-service/invoice-service.service';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoices!: any;

  constructor(private _invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  //CREAR TABLA CON DATA DE PRODUCTOS
  getInvoices() {
    this._invoiceService.getInvoices()
      .subscribe(
        {
          next: (res) => {
            this.invoices = res;
            this.invoices = this.invoices.reverse();
            this.invoices = this.invoices.splice(0,9);
          },
          error: (err) => {
            console.log(<any>err);
          }
        }
      );
  }

}
