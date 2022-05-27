import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { StudentListComponent } from '../student-list/student-list.component';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { StudentService } from 'src/app/services/student-service/student-service';
import { map, startWith } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-billing-notice',
  templateUrl: './billing-notice.component.html',
  styleUrls: ['./billing-notice.component.scss']
})
export class BillingNoticeComponent implements OnInit {
  customerForm!: FormGroup;
  customers: any = [];
  studentDebtConcept: string = "";
  studentDebtTotal: number = 0;
  customer!: any;
  customersWithStudent: any = [];
  student!: any;
  format!: any;
  today: Date = new Date();
  days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  day = this.days[this.today.getDay()];
  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  month = this.months[this.today.getMonth()];
  year: any = new Date().getFullYear();
  currentRow!: any;
  filteredCustomers!: Observable<any[]>;
  students: any = [];
  @ViewChild("print") print!: ElementRef;
  constructor(private formBuilder: FormBuilder,
    private _customerService: CustomerService,
    private _studentService: StudentService,
    private studentList: StudentListComponent) { }

  ngOnInit(): void {
    this.getStudents();
    this.getCustomers();
    this.buildForm();
    this.filterCustomerById();
    this.formatInputChanges();
  }

  getStudents(){
    this._studentService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.getCustomers();
      },
      error: (err: any) => {
        console.log(err), alert('Hubo un error al cargar los estudiantes.');
      },
    });
  }

  getCustomers() {
    this._customerService.getCustomers().subscribe({
      next: (res) => {
        this.customers = res;
        this.getCustomerWithStudents();
      },
      error: (err: any) => {
        console.log(err), alert('Hubo un error al cargar los representantes.');
      },
    });
  }

  getCustomerWithStudents(){
    this.customers.filter((customer: any) => {
      for (let i = 0; i < this.students.length; i++) {
        if (customer._id.toString() == this.students[i].ID_REPRESENTANTE.toString()) {
          this.customersWithStudent.push(customer);
          break;
        }
      }
    });
    this.customers = this.customersWithStudent;
    this.customers.sort((a: any, b: any) => parseInt(a.CEDULA_REPRESENTANTE) - parseInt(b.CEDULA_REPRESENTANTE));
  }

  buildForm() {
    this.customerForm = this.formBuilder.group({
      ID_REPRESENTANTE: ['', []],
      NOMBRES_ALUMNO: [""],
      FORMATO: [ {value: "", disabled: true } ]
    });
  }

  filterCustomerById() {
    if (this.customer = !null || this.customer != "" || !this.customer.startsWith(" ")) {
      this.filteredCustomers = this.customerForm.controls[
        'ID_REPRESENTANTE'
      ].valueChanges.pipe(
        startWith(''),
        map((customer) =>
          customer ? this._filter(customer) : this.customers.slice()
        )
      );
    }
  }

  _filter(value: string): string[] {
    const filterValue = value;
    return this.customers.filter((customer: any) =>
      customer.CEDULA_REPRESENTANTE.toString().includes(filterValue)
    );
  }

  formatInputChanges(){
    this.customerForm.controls["NOMBRES_ALUMNO"].valueChanges.subscribe(() => {
      if(this.student){
        this.customerForm.controls["FORMATO"].enable();
      } else{
        this.customerForm.controls["FORMATO"].disable();
      }
    })
    }

  getOptionText(customer: { CEDULA_REPRESENTANTE: any }) {
    if (!customer || null) {
      return '';
    }
    return customer.CEDULA_REPRESENTANTE;
  }

  getCustomerInfo() {
    this.customer = this.customerForm.controls['ID_REPRESENTANTE'].value;
    let customerId = this.customer._id;
    this.getCustomerStudents(customerId);
  }

  getCustomerStudents(id: number) {
    this.students = this.studentList.students.filter((x: { ID_REPRESENTANTE: number; }) => x.ID_REPRESENTANTE === (id));
  }

  back() {
    this.studentList.currentSection = 0;
    let principalBar = $("#principalBar, #print-section, mat-paginator");
    let collectBar = $("#collectBar");
    principalBar.removeClass("hide-section");
    collectBar.addClass("hide-section");
    this.customerForm.controls["ID_REPRESENTANTE"].setValue(null);
    this.customerForm.controls["NOMBRES_ALUMNO"].setValue("");
    this.customerForm.controls["FORMATO"].setValue("");
    this.format = 0;
    this.customer = null;
    this.student = null;
    this.currentRow = [];
    this.studentList.currentRow = [];
  }

  checkRow(){
    this.currentRow = this.studentList.currentRow;
    console.log(this.currentRow)
    this.customer = this.customers.find((e: { _id: any; }) => e._id == this.currentRow[0].ID_REPRESENTANTE);
    this.customerForm.controls["ID_REPRESENTANTE"].setValue(this.customer);
    this.getCustomerStudents(this.customer._id);
    setTimeout(() => {
      this.student = this.students.find((e: { _id: any; }) => e._id == this.currentRow[0]._id);
      this.customerForm.controls["NOMBRES_ALUMNO"].setValue(this.student);
    })
  }

  triggerPrint() {
    this.print.nativeElement.click();
  }
}
