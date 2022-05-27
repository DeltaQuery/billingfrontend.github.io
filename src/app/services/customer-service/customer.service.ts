import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/models/customer';
import { Observable } from 'rxjs';
import { API_URI } from '../api';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public getCustomers() {
    return this.http.get(`${API_URI}/customers`);
  }

  //
  public getCustomersWithStudents() {
    return this.http.get(`${API_URI}/customers/busqueda/estudiantes`);
  }

  public getCustomer(id: string): Observable<any> {
    return this.http.get(`${API_URI}/customers/${id}`);
  }

  //
  public getCustomerStudents(id: number): Observable<any> {
    return this.http.get(`${API_URI}/students/getbycustomer/${id}`);
  }

  public saveCustomer(customer: Customer): Observable<any> {
    return this.http.post(`${API_URI}/customers`, customer);
  }

  public deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${API_URI}/customers/${id}`);
  }

  public updateCustomer(id: string, updatedCustomer: Customer): Observable<any> {
    return this.http.patch(`${API_URI}/customers/${id}`, updatedCustomer);
  }
}
