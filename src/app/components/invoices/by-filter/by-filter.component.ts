import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InvoicesComponent } from '../invoices/invoices.component';
import { FormControl, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-by-filter',
  templateUrl: './by-filter.component.html',
  styleUrls: ['./by-filter.component.scss']
})
export class ByFilterComponent implements OnInit {
  
  showResult!: boolean;
  invoices!: any;
  invoiceForm!: any;

  constructor(private invoicesComponent: InvoicesComponent) { }

  ngOnInit(): void {
    this.buildGroup();
  }

  buildGroup(){
    this.invoiceForm = new FormGroup({
      FILTRO: new FormControl(),
      GRADO: new FormControl(),
      EFECTIVO: new FormControl(),
      ESTATUS: new FormControl(),
      CREDITO_CONTADO: new FormControl()
    });
  }

  filterFilterInvoices(){
    this.invoices = this.invoicesComponent.invoices;
    let filterValue = this.invoiceForm.controls["FILTRO"].value;
    if(filterValue == 1){
      let grado = this.invoiceForm.controls["GRADO"].value;
      let filteredInvoices = this.invoices.filter(
        (x: { GRADO_ALUMNO: any }) => x.GRADO_ALUMNO == grado
      );
      this.invoicesComponent.getDataSource(filteredInvoices);
    } else if(filterValue == 2){
      let modalidad = this.invoiceForm.controls["CREDITO_CONTADO"].value;
      let filteredInvoices = this.invoices.filter(
        (x: { CREDITO_CONTADO: any }) => x.CREDITO_CONTADO == modalidad
      );
      this.invoicesComponent.getDataSource(filteredInvoices);
    } else if(filterValue == 3){
      let efectivo = this.invoiceForm.controls["EFECTIVO"].value;
      let filteredInvoices!: any;
      if(efectivo == 1){
        filteredInvoices = this.invoices.filter(
          (x: { EFECTIVO: any }) => x.EFECTIVO > 0 && x.EFECTIVO  != null
        );
      } else if(efectivo == 2){
        filteredInvoices = this.invoices.filter(
          (x: { EFECTIVO: any }) => x.EFECTIVO == 0 || x.EFECTIVO == null || x.EFECTIVO == undefined || x.EFECTIVO == ""
        );
      }
      this.invoicesComponent.getDataSource(filteredInvoices);
    } else if(filterValue == 4){
      let estatus = this.invoiceForm.controls["ESTATUS"].value;
      let filteredInvoices = this.invoices.filter(
        (x: { ESTATUS: any }) => x.ESTATUS == estatus
      );
      this.invoicesComponent.getDataSource(filteredInvoices);
    }
  }

  back(){
    this.invoicesComponent.currentSection = 0;
    let principalBar = $("#principalBar");
    let filterBar = $("#filterBar");
    principalBar.removeClass("hide-section");
    filterBar.addClass("hide-section");
    let hideFilterColumns = $(".modalidadCol, .efectivoCol");
    let showFilterColumns = $(".telefonoClienteCol, .totalBsCol, .tipoCol, .bancoCol, .noTransaccionCol");
    hideFilterColumns.addClass("hide-section");
    showFilterColumns.removeClass("hide-section");
    this.invoicesComponent.getInvoices();
  }

}
