import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice-service/invoice-service.service';
import { InvoicesComponent } from '../invoices/invoices.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-by-range',
  templateUrl: './by-range.component.html',
  styleUrls: ['./by-range.component.scss']
})
export class ByRangeComponent implements OnInit {

    //buscar generar variable dinamica segun año del sistema para filtro de facturas
    periodo_cierre: number = 2022;
    periodo_inicio: number = 2021;
    showResult!: boolean;
    invoices!: any;
    period!: any;
    invoiceForm!: any;

  constructor(private _invoiceService: InvoiceService, private invoicesComponent: InvoicesComponent) { }

  ngOnInit(): void {
    this.buildGroup();
  }

  buildGroup(){
    this.invoiceForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
      FILTRO: new FormControl(),
      MES: new FormControl(),
      PERSONALIZADO: new FormControl()
    });
  }
  //CREAR TABLA CON DATA DE PRODUCTOS
  getInvoices(){
    this._invoiceService.getInvoices()
      .subscribe(
      { next: (res) => {
        this.invoicesComponent.invoices = res;
      },
        error: (err) => {
        console.log(<any>err);
        }
      }
    );
  }

  filterRangeInvoices(){
    let filterValue = this.invoiceForm.controls["FILTRO"].value;
    if(filterValue == 1){
      let yesterday = new Date(Date.now() - 1 * 864e5 - new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4).toISOString();
      let tomorrow = new Date(Date.now() +1 * 864e5 - new Date(Date.now() +1 * 864e5).getTimezoneOffset() * 6e4).toISOString();
      let filteredInvoices = this.invoicesComponent.invoices.filter(
        (x: { FECHA_REGISTRO: any }) => x.FECHA_REGISTRO > yesterday && x.FECHA_REGISTRO < tomorrow
      );
      this.invoicesComponent.getDataSource(filteredInvoices);
      
    } else if(filterValue == 2){
      let today = new Date().toISOString()
      let week = new Date(Date.now() - 7 * 864e5 - new Date(Date.now() - 6 * 864e5).getTimezoneOffset() * 6e4).toISOString();
      let filteredInvoices = this.invoicesComponent.invoices.filter(
        (x: { FECHA_REGISTRO: any }) => x.FECHA_REGISTRO <= today && x.FECHA_REGISTRO >= week
      );
      this.invoicesComponent.getDataSource(filteredInvoices);
    } else if(filterValue == 3){
      let today = new Date();
      let todayISO = new Date().toISOString();
      let month = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
      let filteredInvoices = this.invoicesComponent.invoices.filter(
        (x: { FECHA_REGISTRO: any }) => x.FECHA_REGISTRO <= todayISO && x.FECHA_REGISTRO >= month
      );
      this.invoicesComponent.getDataSource(filteredInvoices);
    } else if(filterValue == 4){
      let today = new Date();
      let firstMonthDay = new Date(today.getFullYear(), today.getMonth()-1, 1).toISOString();
      let lastMonthDay = new Date(today.getFullYear(), today.getMonth(), 0).toISOString();
      let filteredInvoices = this.invoicesComponent.invoices.filter(
        (x: { FECHA_REGISTRO: any }) => x.FECHA_REGISTRO <= lastMonthDay && x.FECHA_REGISTRO >= firstMonthDay
      );
      this.invoicesComponent.getDataSource(filteredInvoices);
    } else if(filterValue == 5){
      let filterValue: number = this.invoiceForm.controls["MES"].value;
      let inicio_mes: any;
      let final_mes: any;
      let finalFilterValue = +filterValue +1;
      if(filterValue >= 0 && filterValue <= 7){
        inicio_mes = new Date(this.periodo_cierre, filterValue, 1).toISOString();
        final_mes = new Date(this.periodo_cierre, finalFilterValue, 0).toISOString();
      } else if(filterValue > 7){
        inicio_mes = new Date(this.periodo_cierre, filterValue, 1).toISOString();
        final_mes = new Date(this.periodo_inicio, finalFilterValue, 0).toISOString();
      }
      let filteredInvoices = this.invoicesComponent.invoices.filter(
        (x: { FECHA_REGISTRO: any }) => x.FECHA_REGISTRO <= final_mes && x.FECHA_REGISTRO >= inicio_mes
      );
      this.invoicesComponent.getDataSource(filteredInvoices);
    } else if(filterValue == 6){
      if(this.invoiceForm.controls["start"].value != null && this.invoiceForm.controls["end"].value != null){
        let start: number = this.invoiceForm.controls["start"].value.toISOString();
      let end: number = this.invoiceForm.controls["end"].value.toISOString();
      let filteredInvoices = this.invoicesComponent.invoices.filter(
        (x: { FECHA_REGISTRO: any }) => x.FECHA_REGISTRO <= end && x.FECHA_REGISTRO >= start
      );
      this.invoicesComponent.getDataSource(filteredInvoices);
      }
    }
  }

  back(){
    this.invoicesComponent.currentSection = 0;
    let principalBar = $("#principalBar");
    let rangeBar = $("#rangeBar");
    principalBar.removeClass("hide-section");
    rangeBar.addClass("hide-section");
    this.invoicesComponent.getInvoices();
  }

}
