import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { StudentService } from 'src/app/services/student-service/student-service';
import { map, startWith } from 'rxjs/operators';
import { InvoicesComponent } from '../invoices/invoices.component';
declare var $: any;
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { InvoiceService } from 'src/app/services/invoice-service/invoice-service.service';

@Component({
  selector: 'app-by-customer',
  templateUrl: './by-customer.component.html',
  styleUrls: ['./by-customer.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ]
})
export class ByCustomerComponent implements OnInit {
  invoiceForm!: FormGroup;
  customers: any = [];
  customer!: any;
  customersWithStudent: any[] = [];
  showResult!: boolean;
  filteredCustomers!: Observable<any[]>;
  students: any = [];
  filteredStudents: any = [];
  @ViewChild("print") print!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private _customerService: CustomerService,
    private _studentService: StudentService,
    private _invoiceService: InvoiceService,
    private invoicesComponent: InvoicesComponent
  ) { }

  ngOnInit(): void {
    this.getStudents();
    this.buildForm();
    this.filterCustomerById();
  }

  getStudents() {
    this._studentService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.getCustomers();
      },
      error: (err: any) => {
        console.log(err), alert('Hubo un error al cargar los alumnos.');
      },
    });
  }

  getCustomers() {
    this._customerService.getCustomers().subscribe({
      next: (res) => {
        this.customers = res; 
        this.getCustomersWithStudent();
      },
      error: (err: any) => {
        console.log(err), alert('Hubo un error al cargar los representantes.')
      },
    });
  }

  getCustomersWithStudent() {
    this.customers.filter((customer: any) => {
      for (let i = 0; i < this.students.length; i++) {
        if (customer._id.toString() == this.students[i].ID_REPRESENTANTE.toString()) {
          this.customersWithStudent.push(customer);
          break;
        }
      }
    });
  }

  _filter(value: string): string[] {
    const filterValue = value;
    return this.customers.filter((customer: any) =>
      customer.CEDULA_REPRESENTANTE.toString().includes(filterValue)
    );
  }

  getCustomerStudents(id: number) {
    this.filteredStudents = this.students.filter((student: any) => student.ID_REPRESENTANTE.toString() == this.customer._id.toString())
    /*this._customerService.getCustomerStudents(id).subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (err: any) => {
        console.log(err), alert('No hay alumnos asociados a este cliente.');
      },
    });*/
  }

  getOptionText(customer: { CEDULA_REPRESENTANTE: any }) {
    if (!customer || null) {
      return '';
    }
    return customer.CEDULA_REPRESENTANTE;
  }

  buildForm() {
    this.invoiceForm = this.formBuilder.group({
      ID_REPRESENTANTE: ['', []],
    });
  }

  filterCustomerById() {
    this.filteredCustomers = this.invoiceForm.controls[
      'ID_REPRESENTANTE'
    ].valueChanges.pipe(
      startWith(''),
      map((customer) =>
        customer ? this._filter(customer) : this.customers.slice()
      )
    );
  }

  getCustomerInvoices() {
    this._invoiceService.getInvoices().subscribe({
      next: (res) => {
        let filteredInvoices!: any;
        filteredInvoices = res;
        filteredInvoices = filteredInvoices.filter(
          (x: { ID_REPRESENTANTE: number }) => x.ID_REPRESENTANTE == this.invoiceForm.controls['ID_REPRESENTANTE'].value._id
        );
        this.invoicesComponent.getDataSource(filteredInvoices);
      },
      error: (err) => {
        console.log(<any>err);
      },
    });
  }

  back() {
    this.invoicesComponent.currentSection = 0;
    let principalBar = $("#principalBar");
    let individualBar = $("#individualBar");
    principalBar.removeClass("hide-section");
    individualBar.addClass("hide-section");
    let showColumns = $(".idClienteCol, .nombresClienteCol, .telefonoClienteCol");
    let hideColumns = $(".modalidadCol, .tipoCol, .bancoCol, .efectivoCol, .noTransaccionCol");
    hideColumns.addClass("hide-section");
    showColumns.removeClass("hide-section");
    this.invoicesComponent.getInvoices();
  }
}
