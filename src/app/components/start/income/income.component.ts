import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice-service/invoice-service.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  invoices!: any;
  monthInvoices: any[] = [0,0,0,0]
  totalIncome: number[] = [0,0,0,0]
  monthName: any[] = [0,0,0,0]

  constructor(private _invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this._invoiceService.getInvoices()
      .subscribe(
        {
          next: (res) => {
            this.invoices = res;
            let today = new Date();

            //mes actual
            let todayISO = new Date().toISOString();
            let month = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
            this.monthName[0] = today.getMonth();
            this.monthInvoices[0] = this.invoices.filter(
              (x: { FECHA_REGISTRO: any, ESTATUS: any }) => x.FECHA_REGISTRO <= todayISO && x.FECHA_REGISTRO >= month && x.ESTATUS == 1
            );

            //mes anterior
            let firstMonthDay = new Date(today.getFullYear(), today.getMonth()-1, 1).toISOString();
            let lastMonthDay = new Date(today.getFullYear(), today.getMonth(), 0).toISOString();
            this.monthName[1] = today.getMonth()-1;
            this.monthInvoices[1] = this.invoices.filter(
              (x: { FECHA_REGISTRO: any, ESTATUS: any }) => x.FECHA_REGISTRO <=lastMonthDay && x.FECHA_REGISTRO >= firstMonthDay && x.ESTATUS == 1
            );

            //mes ante anterior
            let first2MonthDay = new Date(today.getFullYear(), today.getMonth()-2, 1).toISOString();
            let last2MonthDay = new Date(today.getFullYear(), today.getMonth()-1, 0).toISOString();
            this.monthName[2] = today.getMonth()-2;
            this.monthInvoices[2] = this.invoices.filter(
              (x: { FECHA_REGISTRO: any, ESTATUS: any }) => x.FECHA_REGISTRO <=last2MonthDay && x.FECHA_REGISTRO >= first2MonthDay && x.ESTATUS == 1
            );

            //mes ante ante anterior
            let first3MonthDay = new Date(today.getFullYear(), today.getMonth()-3, 1).toISOString();
            let last3MonthDay = new Date(today.getFullYear(), today.getMonth()-2, 0).toISOString();
            this.monthName[3] = today.getMonth()-3;
            this.monthInvoices[3] = this.invoices.filter(
              (x: { FECHA_REGISTRO: any, ESTATUS: any }) => x.FECHA_REGISTRO <=last3MonthDay && x.FECHA_REGISTRO >= first3MonthDay && x.ESTATUS == 1
            );

            for(let i = 0; i < this.monthInvoices.length; i++){
              this.totalIncome[i] = this.monthInvoices[i].reduce((accumulator: any, object: { TOTAL_USD: any; }) => {
                return accumulator + object.TOTAL_USD;
              }, 0);
            }

            for(let i = 0; i<this.monthName.length; i++){
              if(this.monthName[i] == 0){
                this.monthName[i] = "Enero"
              } else if(this.monthName[i] == 1) {
                this.monthName[i] = "Febrero"
              } else if(this.monthName[i] == 2) {
                this.monthName[i] = "Marzo"
              } else if(this.monthName[i] == 3) {
                this.monthName[i] = "Abril"
              } else if(this.monthName[i] == 4) {
                this.monthName[i] = "Mayo"
              } else if(this.monthName[i] == 5) {
                this.monthName[i] = "Junio"
              } else if(this.monthName[i] == 6) {
                this.monthName[i] = "Julio"
              } else if(this.monthName[i] == 7) {
                this.monthName[i] = "Agosto"
              } else if(this.monthName[i] == 8) {
                this.monthName[i] = "Septiembre"
              } else if(this.monthName[i] == 9 || this.monthName[i] == -3) {
                this.monthName[i] = "Octubre"
              } else if(this.monthName[i] == 10 || this.monthName[i] == -2) {
                this.monthName[i] = "Noviembre"
              } else if(this.monthName[i] == 11 || this.monthName[i] == -1) {
                this.monthName[i] = "Diciembre"
              }
            }
          },
          error: (err) => {
            console.log(<any>err);
          }
        }
      );
  }


}
