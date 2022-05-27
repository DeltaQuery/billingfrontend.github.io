import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice-service/invoice-service.service';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { StudentService } from 'src/app/services/student-service/student-service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ComponentTitleService } from 'src/app/services/component-title/component-title.service';
import { InvoicesComponent } from '../invoices/invoices.component';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CreateInvoiceComponent implements OnInit {

  invoiceForm!: FormGroup;
  displayedColumns: string[] = [
    "CODIGO_FACTURA",
    "FECHA_REGISTRO",
    "CONCEPTO_TOTAL",
    "TOTAL_USD",
    "actions"];
  invoices!: any;
  studentInvoices: any = [];
  dataSource = new MatTableDataSource();
  customers: any = [];
  customersWithStudent: any[] = [];
  customer: any = [];
  filteredCustomers!: Observable<any[]>;
  guardianId!: number;
  students: any = [];
  filteredStudents: any = [];
  student: any = [];
  products: any = [];
  selectedProductOne: any = "";
  selectedProductTwo: any = "";
  selectedProductThree: any = "";
  selectedProductFour: any = "";
  selectedProductFive: any = "";
  customerId!: any;
  customerType!: any;
  customerName!: string;
  customerAddress!: string;
  customerPhone!: string;
  customerMail!: string;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  expandedElement!: Invoice | null;

  constructor(
    private formBuilder: FormBuilder,
    private _invoiceService: InvoiceService,
    private _customerService: CustomerService,
    private _studentService: StudentService,
    private _productService: ProductService,
    private _titleService: ComponentTitleService,
    private invoicesComponent: InvoicesComponent,
    private _loginService: LoginServiceService
  ) { }

  ngOnInit(): void {
    this.getStudents();
    this.getProducts();
    this.getInvoices();
    this.buildForm();
    setTimeout(() => {
      this.filterCustomerById();
      this.valueChange();
      this.studentIdChange();
      this.studentGradeChange();
      this.efectivoChange();
      this.bancoChange();
    });
    setTimeout(() => {
      this._titleService.titleName = "Facturación > Registro de nueva factura";
    });
  }

  getStudents() {
    this._studentService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.getCustomers();
      },
      error: (err: any) => {
        console.log(<any>err);
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
        console.log(err),
          alert("Error encontrado al cargar representantes.")
      }
    })
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
    this.customers = this.customersWithStudent;
    this.customers.sort((a: any, b: any) => parseInt(a.CEDULA_REPRESENTANTE) - parseInt(b.CEDULA_REPRESENTANTE));
  }

  getProducts() {
    this._productService.getProducts()
      .subscribe(
        {
          next: (res) => {
            this.products = res
            this.products.sort((a: any, b: any) => parseInt(a.ESCENARIO_PRODUCTO) - parseInt(b.ESCENARIO_PRODUCTO));
          },
          error: (err) => {
            console.log(<any>err);
          }
        }
      );
  }

  getInvoices() {
    this._invoiceService.getInvoices()
      .subscribe(
        {
          next: (res) => {
            this.invoices = res;
          },
          error: (err) => {
            console.log(<any>err);
          }
        }
      );
  }

  buildForm() {
    this.invoiceForm = this.formBuilder.group({
      FECHA_REGISTRO: [new Date(), [Validators.required]],
      ID_REPRESENTANTE: ["", []],
      CODIGO_FACTURA: [0, [Validators.required]],
      CIUDAD_CLIENTE: [{ value: "Maracaibo", disabled: true }],
      TIPO_CLIENTE: [{ value: "", disabled: true }],
      ID_CLIENTE: [{ value: "", disabled: true }],
      NOMBRES_CLIENTE: [{ value: "", disabled: true }],
      DIRECCION_CLIENTE: [{ value: "", disabled: true }],
      TELEFONO_CLIENTE: [{ value: "", disabled: true }],
      CORREO_CLIENTE: ["", [Validators.required]],
      ID_ALUMNO: [],
      NOMBRES_ALUMNO: [{ value: "", disabled: true }],
      APELLIDOS_ALUMNO: [{ value: "", disabled: true }],
      GRADO_ALUMNO: [{ value: "", disabled: true }],
      CONCEPTO_1: ["", [Validators.required]],
      ESCENARIO_1: ["",],
      MONTO_1_USD: [null, [Validators.required]],
      MONTO_1_BS: [null, [Validators.required]],
      MONTO_1_BCV: [null, [Validators.required]],
      CONCEPTO_2: [null, []],
      ESCENARIO_2: ["",],
      MONTO_2_USD: [null, []],
      MONTO_2_BS: [null, []],
      MONTO_2_BCV: [[]],
      CONCEPTO_3: [null, []],
      ESCENARIO_3: ["",],
      MONTO_3_USD: [null, []],
      MONTO_3_BS: [null, []],
      MONTO_3_BCV: [[]],
      CONCEPTO_4: [null, []],
      ESCENARIO_4: ["",],
      MONTO_4_USD: [null, []],
      MONTO_4_BS: [null, []],
      MONTO_4_BCV: [[]],
      CONCEPTO_5: [null, []],
      ESCENARIO_5: ["",],
      MONTO_5_USD: [null, []],
      MONTO_5_BS: [null, []],
      MONTO_5_BCV: [[]],
      TIPO_TRANSACCION: ["T", [Validators.required]],
      NO_TRANSACCION: ["", []],
      EFECTIVO: ["", [Validators.required]],
      BANCO: ["", [Validators.required]],
      SUBTOTAL_BS: [{ value: 0, disabled: true }],
      SUBTOTAL_USD: [{ value: 0, disabled: true }],
      IVA: [{ value: 0, disabled: true }],
      TOTAL_BS: [{ value: 0, disabled: true }],
      TOTAL_USD: [{ value: 0, disabled: true }],
      CREDITO_CONTADO: ["Contado", [Validators.required]],
      OBSERVACIONES: ["", []],
      ESTATUS: [true, []],
      REGISTRADO_POR: [this._loginService.getUsername()]
    });
  }

  filterCustomerById() {
    this.filteredCustomers = this.invoiceForm.controls["ID_REPRESENTANTE"].valueChanges.pipe(
      startWith(''),
      map(customer => (customer ? this._filter(customer) : this.customers.slice())),
    );
  }

  _filter(value: string): string[] {
    const filterValue = value;
    return this.customers.filter((customer: any) => customer.CEDULA_REPRESENTANTE.toString().includes(filterValue));
  }

  valueChange() {
    this.invoiceForm.valueChanges.subscribe(data => {

      let MONTO_1_BS!: number;
      let MONTO_1_USD!: number;
      let MONTO_2_BS!: number;
      let MONTO_2_USD!: number;
      let MONTO_3_BS!: number;
      let MONTO_3_USD!: number;
      let MONTO_4_BS!: number;
      let MONTO_4_USD!: number;
      let MONTO_5_BS!: number;
      let MONTO_5_USD!: number;

      if (data.MONTO_1_BS == 0 || data.MONTO_1_BS == null || data.MONTO_1_BS == undefined || data.MONTO_1_BS == NaN) {
        MONTO_1_BS = 0;
      } else {
        MONTO_1_BS = data.MONTO_1_BS;
      }
      if (data.MONTO_1_USD == 0 || data.MONTO_1_USD == null || data.MONTO_1_USD == undefined || data.MONTO_1_USD == NaN) {
        MONTO_1_USD = 0;
      } else {
        MONTO_1_USD = data.MONTO_1_USD;
      }

      if (data.MONTO_2_BS == 0 || data.MONTO_2_BS == null || data.MONTO_2_BS == undefined || data.MONTO_2_BS == NaN) {
        MONTO_2_BS = 0;
      } else {
        MONTO_2_BS = data.MONTO_2_BS;
      }
      if (data.MONTO_2_USD == 0 || data.MONTO_2_USD == null || data.MONTO_2_USD == undefined || data.MONTO_2_USD == NaN) {
        MONTO_2_USD = 0;
      } else {
        MONTO_2_USD = data.MONTO_2_USD;
      }

      if (data.MONTO_3_BS == 0 || data.MONTO_3_BS == null || data.MONTO_3_BS == undefined || data.MONTO_3_BS == NaN) {
        MONTO_3_BS = 0;
      } else {
        MONTO_3_BS = data.MONTO_3_BS;
      }
      if (data.MONTO_3_USD == 0 || data.MONTO_3_USD == null || data.MONTO_3_USD == undefined || data.MONTO_3_USD == NaN) {
        MONTO_3_USD = 0;
      } else {
        MONTO_3_USD = data.MONTO_3_USD;
      }

      if (data.MONTO_4_BS == 0 || data.MONTO_4_BS == null || data.MONTO_4_BS == undefined || data.MONTO_4_BS == NaN) {
        MONTO_4_BS = 0;
      } else {
        MONTO_4_BS = data.MONTO_4_BS;
      }
      if (data.MONTO_4_USD == 0 || data.MONTO_4_USD == null || data.MONTO_4_USD == undefined || data.MONTO_4_USD == NaN) {
        MONTO_4_USD = 0;
      } else {
        MONTO_4_USD = data.MONTO_4_USD;
      }
      if (data.MONTO_5_BS == 0 || data.MONTO_5_BS == null || data.MONTO_5_BS == undefined || data.MONTO_5_BS == NaN) {
        MONTO_5_BS = 0;
      } else {
        MONTO_5_BS = data.MONTO_5_BS;
      }
      if (data.MONTO_5_USD == 0 || data.MONTO_5_USD == null || data.MONTO_5_USD == undefined || data.MONTO_5_USD == NaN) {
        MONTO_5_USD = 0;
      } else {
        MONTO_5_USD = data.MONTO_5_USD;
      }

      let subtotalUSD = MONTO_1_USD + MONTO_2_USD + MONTO_3_USD + MONTO_4_USD + MONTO_5_USD;
      let subtotalBs = MONTO_1_BS + MONTO_2_BS + MONTO_3_BS + MONTO_4_BS + MONTO_5_BS;

      let BCVOne = this.getBCV(MONTO_1_BS, MONTO_1_USD);
      let BCVTwo = this.getBCV(MONTO_2_BS, MONTO_2_USD);
      let BCVThree = this.getBCV(MONTO_3_BS, MONTO_3_USD);
      let BCVFour = this.getBCV(MONTO_4_BS, MONTO_4_USD);
      let BCVFive = this.getBCV(MONTO_5_BS, MONTO_5_USD);

      let totalUSD = subtotalUSD;
      let totalBs = subtotalBs;

      this.invoiceForm.controls["MONTO_1_BCV"].setValue(BCVOne, { emitEvent: false });
      this.invoiceForm.controls["MONTO_2_BCV"].setValue(BCVTwo, { emitEvent: false });
      this.invoiceForm.controls["MONTO_3_BCV"].setValue(BCVThree, { emitEvent: false });
      this.invoiceForm.controls["MONTO_4_BCV"].setValue(BCVFour, { emitEvent: false });
      this.invoiceForm.controls["MONTO_5_BCV"].setValue(BCVFive, { emitEvent: false });
      this.invoiceForm.controls["SUBTOTAL_USD"].setValue(subtotalUSD, { emitEvent: false });
      this.invoiceForm.controls["TOTAL_USD"].setValue(totalUSD, { emitEvent: false });
      this.invoiceForm.controls["SUBTOTAL_BS"].setValue(subtotalBs, { emitEvent: false });
      this.invoiceForm.controls["TOTAL_BS"].setValue(totalBs, { emitEvent: false });
    });
  }

  studentGradeChange() {
    let student = this.invoiceForm.controls["NOMBRES_ALUMNO"];
    student.valueChanges.subscribe(data => {
      if (student != null || student != undefined) {
        this.invoiceForm.controls["GRADO_ALUMNO"].setValue(this.student.GRADO_ALUMNO);
      }
    })
  }

  addInvoice() {
    if (this.invoiceForm.valid) {
      this.enableInputs();
      this.formatInputToData();
      this._invoiceService.saveInvoice(this.invoiceForm.value)
        .subscribe({
          next: () => {
            alert("Factura creada correctamente.");
            window.location.reload();
          },
          error: (err: any) => {
            console.log(err),
              alert("Error encontrado al generar factura.")
          }
        })
    }
  }

  getCustomerInfo() {
    this.customer = this.invoiceForm.controls["ID_REPRESENTANTE"].value;
    this.customerType = this.customer.TIPO_CLIENTE;
    this.customerId = this.customer.ID_CLIENTE;
    this.customerName = this.customer.NOMBRES_CLIENTE;
    this.customerAddress = this.customer.DIRECCION_CLIENTE;
    this.customerPhone = this.customer.TELEFONO_CLIENTE;
    this.customerMail = this.customer.CORREO_CLIENTE;
    this.invoiceForm.controls["TIPO_CLIENTE"].setValue(this.customerType);
    this.invoiceForm.controls["ID_CLIENTE"].setValue(this.customerId);
    this.invoiceForm.controls["NOMBRES_CLIENTE"].setValue(this.customerName);
    this.invoiceForm.controls["DIRECCION_CLIENTE"].setValue(this.customerAddress);
    this.invoiceForm.controls["TELEFONO_CLIENTE"].setValue(this.customerPhone);
    this.invoiceForm.controls["CORREO_CLIENTE"].setValue(this.customerMail);
    this.getCustomerStudents();
  }

getCustomerStudents() {
    try {
      this.filteredStudents = this.students.filter((student: any) => student.ID_REPRESENTANTE.toString() == this.customer._id.toString())
      this.invoiceForm.get("NOMBRES_ALUMNO")?.enable();
      this.invoiceForm.controls["NOMBRES_ALUMNO"].setValue(this.filteredStudents[0]);
      this.invoiceForm.controls["GRADO_ALUMNO"].setValue(this.filteredStudents[0].GRADO_ALUMNO);
      this.student = this.filteredStudents[0];
      this.getStudentInvoices(this.invoiceForm.controls["NOMBRES_ALUMNO"].value._id);
    } catch (err: any) {
      console.log(err),
        alert("No hay alumnos asociados a este cliente.")
    }
  }

  getOptionText(customer: { CEDULA_REPRESENTANTE: any; }) {
    if (!customer || null) {
      return '';
    }
    return customer.CEDULA_REPRESENTANTE;
  }

  getStudentInvoices(studentId: number) {
    this.studentInvoices = this.invoices.filter((x: { ID_ALUMNO: number; }) => x.ID_ALUMNO === studentId);
    this.dataSource = new MatTableDataSource(this.studentInvoices);
    setTimeout(() => {
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  enableInputs() {
    this.invoiceForm.get("TIPO_CLIENTE")?.enable();
    this.invoiceForm.get("DIRECCION_CLIENTE")?.enable();
    this.invoiceForm.get("TELEFONO_CLIENTE")?.enable();
    this.invoiceForm.get("ID_CLIENTE")?.enable();
    this.invoiceForm.get("NOMBRES_CLIENTE")?.enable();
    this.invoiceForm.get("APELLIDOS_ALUMNO")?.enable();
    this.invoiceForm.get("GRADO_ALUMNO")?.enable();
    this.invoiceForm.get("CIUDAD_CLIENTE")?.enable();
    this.invoiceForm.get("IVA")?.enable();
    this.invoiceForm.get("SUBTOTAL_BS")?.enable();
    this.invoiceForm.get("SUBTOTAL_USD")?.enable();
    this.invoiceForm.get("TOTAL_BS")?.enable();
    this.invoiceForm.get("TOTAL_USD")?.enable();
  }

  getBCV(monto_bs: number, monto_usd: number) {
    if (monto_bs / monto_usd == null || monto_bs / monto_usd == NaN || monto_bs / monto_usd == undefined || monto_bs / monto_usd == 0 || monto_bs == 0 || monto_usd == 0) {
      return 0;
    } else {
      return this.roundNumber((monto_bs/monto_usd),2)
    }
  }

  studentIdChange() {
    let NOMBRES_ALUMNO = this.invoiceForm.get('NOMBRES_ALUMNO');
    if (NOMBRES_ALUMNO != null) {
      NOMBRES_ALUMNO.valueChanges.subscribe(data => {
        let studentId = this.student._id;
        this.getStudentInvoices(studentId);
      });
    }
  }

  bancoChange() {
    let BANCO: any = this.invoiceForm.get('BANCO');
    let EFECTIVO: any = this.invoiceForm.get("EFECTIVO");
    BANCO.valueChanges.subscribe(() => {
      if (BANCO.value != null && BANCO.value != "" && BANCO.value != undefined) {
        if (EFECTIVO) {
          EFECTIVO.clearValidators();
          EFECTIVO.updateValueAndValidity();
        }
      }
    });
  }

  efectivoChange() {
    let BANCO: any = this.invoiceForm.get('BANCO');
    let EFECTIVO: any = this.invoiceForm.get("EFECTIVO");
    EFECTIVO.valueChanges.subscribe(() => {
      if (EFECTIVO.value != null && EFECTIVO.value != "" && EFECTIVO.value != undefined) {
        if (BANCO) {
          BANCO.clearValidators();
          BANCO.updateValueAndValidity();
        }
      }
    });
  }

  roundNumber(n: any, precision: any) {
    const precisionWithPow10 = Math.pow(10, precision);
    return Math.round(n * precisionWithPow10) / precisionWithPow10;
  }

  formatInputToData() {
    this.invoiceForm.controls["ID_REPRESENTANTE"].setValue(this.customer._id);
    this.invoiceForm.controls["TIPO_CLIENTE"].setValue(this.customer.TIPO_CLIENTE);
    this.invoiceForm.controls["NOMBRES_CLIENTE"].setValue(this.customer.NOMBRES_CLIENTE);
    this.invoiceForm.controls["DIRECCION_CLIENTE"].setValue(this.customer.DIRECCION_CLIENTE);
    this.invoiceForm.controls["TELEFONO_CLIENTE"].setValue(this.customer.TELEFONO_CLIENTE);
    this.invoiceForm.controls["ID_ALUMNO"].setValue(this.student._id);
    this.invoiceForm.controls["NOMBRES_ALUMNO"].setValue(this.student.NOMBRES_ALUMNO);
    this.invoiceForm.controls["APELLIDOS_ALUMNO"].setValue(this.student.APELLIDOS_ALUMNO);
    this.invoiceForm.controls["GRADO_ALUMNO"].setValue(this.student.GRADO_ALUMNO);
    this.invoiceForm.controls["CONCEPTO_1"].setValue(this.selectedProductOne.CONCEPTO_PRODUCTO);
    this.invoiceForm.controls["CONCEPTO_2"].setValue(this.selectedProductTwo.CONCEPTO_PRODUCTO);
    this.invoiceForm.controls["CONCEPTO_3"].setValue(this.selectedProductThree.CONCEPTO_PRODUCTO);
    this.invoiceForm.controls["CONCEPTO_4"].setValue(this.selectedProductFour.CONCEPTO_PRODUCTO);
    this.invoiceForm.controls["CONCEPTO_5"].setValue(this.selectedProductFive.CONCEPTO_PRODUCTO);
    this.invoiceForm.controls["ESCENARIO_1"].setValue(this.selectedProductOne.ESCENARIO_PRODUCTO);
    this.invoiceForm.controls["ESCENARIO_2"].setValue(this.selectedProductTwo.ESCENARIO_PRODUCTO);
    this.invoiceForm.controls["ESCENARIO_3"].setValue(this.selectedProductThree.ESCENARIO_PRODUCTO);
    this.invoiceForm.controls["ESCENARIO_4"].setValue(this.selectedProductFour.ESCENARIO_PRODUCTO);
    this.invoiceForm.controls["ESCENARIO_5"].setValue(this.selectedProductFive.ESCENARIO_PRODUCTO);
  }
  deselectOptionOne() {
    this.invoiceForm.controls["CONCEPTO_1"].setValue("");
    this.invoiceForm.controls["ESCENARIO_1"].setValue("");
    this.invoiceForm.controls["MONTO_1_USD"].setValue(0);
    this.invoiceForm.controls["MONTO_1_BS"].setValue(0);
  }
  deselectOptionTwo() {
    this.invoiceForm.controls["CONCEPTO_2"].setValue("");
    this.selectedProductTwo = "";
    this.invoiceForm.controls["ESCENARIO_2"].setValue(null);
    this.invoiceForm.controls["MONTO_2_USD"].setValue(null);
    this.invoiceForm.controls["MONTO_2_BS"].setValue(null);
  }
  deselectOptionThree() {
    this.invoiceForm.controls["CONCEPTO_3"].setValue("");
    this.selectedProductThree = "";
    this.invoiceForm.controls["ESCENARIO_3"].setValue(null);
    this.invoiceForm.controls["MONTO_3_USD"].setValue(null);
    this.invoiceForm.controls["MONTO_3_BS"].setValue(null);
  }
  deselectOptionFour() {
    this.invoiceForm.controls["CONCEPTO_4"].setValue("");
    this.selectedProductFour = "";
    this.invoiceForm.controls["ESCENARIO_4"].setValue(null);
    this.invoiceForm.controls["MONTO_4_USD"].setValue(null);
    this.invoiceForm.controls["MONTO_4_BS"].setValue(null);
  }
  deselectOptionFive() {
    this.invoiceForm.controls["CONCEPTO_5"].setValue("");
    this.selectedProductFive = "";
    this.invoiceForm.controls["ESCENARIO_5"].setValue(null);
    this.invoiceForm.controls["MONTO_5_USD"].setValue(null);
    this.invoiceForm.controls["MONTO_5_BS"].setValue(null);
  }

  viewInvoice(row: any) {
    this.invoicesComponent.viewInvoice(row);
  }

  clean() {
    window.location.reload();
  }
}


