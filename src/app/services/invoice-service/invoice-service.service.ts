import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from 'src/app/models/invoice';
import { Observable } from 'rxjs';
declare var $: any;
import { API_URI } from '../api';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private printOrNot: boolean = false;

  constructor(private http: HttpClient) { }

  public setPrintDecision(boolean: boolean){
    return this.printOrNot = boolean;
  }

  public getPrintDecision(){
    return this.printOrNot;
  }

  public getInvoices() {
    return this.http.get(`${API_URI}/invoices`);
  }

  public getInvoice(id: string): Observable<any> {
    return this.http.get(`${API_URI}/invoices/${id}`);
  }

  public saveInvoice(invoice : Invoice): Observable<any> {
    return this.http.post(`${API_URI}/invoices`, invoice);
  }

  //por ahora no se usa, se updatea invoice poniendole estatus anulado
  public removeInvoice(id: string): Observable<any> {
    return this.http.delete(`${API_URI}/invoices/${id}`);
  }

  public updateInvoice(id: string, updatedInvoice: Invoice): Observable<any> {
    return this.http.patch(`${API_URI}/invoices/${id}`, updatedInvoice);
  }
}
