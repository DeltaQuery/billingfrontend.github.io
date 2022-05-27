import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { StudentService } from 'src/app/services/student-service/student-service';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { InvoiceService } from 'src/app/services/invoice-service/invoice-service.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { BillingNoticeComponent } from '../billing-notice/billing-notice.component';
import * as XLSX from 'xlsx';
import { ComponentTitleService } from 'src/app/services/component-title/component-title.service';
declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class StudentListComponent implements OnInit {

  currentSection = 0;
  sticky: boolean = true;
  escenario: number = this.getScenario();
  scenarioForm!: FormGroup;
  students: any = [];
  customers: any = [];
  invoices: any = [];
  products: any = [];
  productArr: any = [];
  invoiceArr: any = [];
  paymentsArr: number[] = [];
  datesArr: Date[] = [];
  solvencyArr: boolean[] = [];
  displayedColumns: string[] = [
    "select",
    "DEUDA_TOTAL",
    "GRADO_ALUMNO", 
    "NOMBRES_ALUMNO", 
    "NOMBRES_REPRESENTANTE", 
    "CEDULA_REPRESENTANTE", 
    "CORREO_REPRESENTANTE",
    "TELEFONO_REPRESENTANTE",
    "DIRECCION_REPRESENTANTE",
    "PAGO_INSCRIPCION",
    "FECHA_INSCRIPCION",
    "PAGO_SEPTIEMBRE",
    "FECHA_SEPTIEMBRE",
    "PAGO_OCTUBRE",
    "FECHA_OCTUBRE",
    "PAGO_NOVIEMBRE",
    "FECHA_NOVIEMBRE",
    "PAGO_DICIEMBRE",
    "FECHA_DICIEMBRE",
    "PAGO_ENERO",
    "FECHA_ENERO",
    "PAGO_FEBRERO",
    "FECHA_FEBRERO",
    "PAGO_MARZO",
    "FECHA_MARZO",
    "PAGO_ABRIL",
    "FECHA_ABRIL",
    "PAGO_MAYO",
    "FECHA_MAYO",
    "PAGO_JUNIO",
    "FECHA_JUNIO",
    "PAGO_JULIO",
    "FECHA_JULIO",
    "PAGO_AGOSTO",
    "FECHA_AGOSTO",
    "ESTATUS",
    "actions"];
  @ViewChild("print") print!: ElementRef;
  @ViewChild('collectBar', {static: false}) collectBar!: BillingNoticeComponent;
  searchKey!: any;
  dataSource = new MatTableDataSource(this.students);
  selection = new SelectionModel<any>(false, []); 
  currentRow: any = [];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';
  solvencyPercentage: number[] = [];
  counter: number = 0;
  debtors: any[] = [];

  
  constructor(
    private formBuilder : FormBuilder,
    private _studentService: StudentService,
    private _customerService: CustomerService,
    private _invoiceService: InvoiceService,
    private _productService: ProductService,
    private _titleService: ComponentTitleService
    ) { }

  ngOnInit(): void {
    this.getScenario();
    this.buildScenarioForm();
    this.getCustomers();
    setTimeout(() => {
      this._titleService.titleName = "Informes";
    });
  }

  updateScenario(){
    this.getCustomers();
    this.getInvoices();
    this.getProducts();
    this.getStudents(); 
  }

  getScenario(){
    let currentDate = new Date().toJSON().slice(0,10);
    let sep = new Date('2021/09/05');
    let oct = new Date('2021/10/05');
    let nov = new Date('2021/11/05');
    let dic = new Date('2021/12/05');
    let ene = new Date('2022/01/05');
    let feb = new Date('2022/02/05');
    let mar = new Date('2022/03/05');
    let abr = new Date('2022/04/05');
    let may = new Date('2022/05/05');
    let jun = new Date('2022/06/05');
    let jul = new Date('2022/07/05');
    let ago = new Date('2022/08/05');
    let check = new Date(currentDate);

    if(check >= sep && check < oct){
      return 1;
    }
    if(check > oct && check < nov){
      return 2;
    }
    if(check > nov && check < dic){
      return 3;
    }
    if(check > dic && check < ene){
      return 4;
    }
    if(check > ene && check < feb){
      return 5;
    }
    if(check > feb && check < mar){
      return 6;
    }
    if(check > mar && check < abr){
      return 7;
    }
    if(check > abr && check < may){
      return 8;
    }
    if(check > may && check < jun){
      return 9;
    }
    if(check > jun && check < jul){
      return 10;
    }
    if(check > jul && check < ago){
      return 12;
    }
      return 12;
  }
  
  buildScenarioForm(){
    this.scenarioForm = this.formBuilder.group({
      SELECT_SCENARIO : [this.getScenario().toString(), Validators.required],
    });
  }

  getCustomers(){
    this._customerService.getCustomers()
      .subscribe(
      { next: (res) => {
        this.customers = res;
        this.getInvoices();
      },
        error: (err) => {
        console.log(<any>err);
        }
      }
    );
  }

  getInvoices(){
    this._invoiceService.getInvoices()
      .subscribe(
      { next: (res) => {
        this.invoices = res;
        this.getProducts();
      },
        error: (err) => {
        console.log(<any>err);
        }
      }
    );
  }

  getProducts(){
    this._productService.getProducts()
      .subscribe(
      { next: (res) => {
        this.products = res;
        this.getStudents(); 
        
      },
        error: (err) => {
        console.log(<any>err);
        }
      }
    );
  }

  getStudents(){
    this._studentService.getStudents()
      .subscribe(
      { next: (res) => {
        this.students = res;
        this.getProductScenario();
        this.dataSource = new MatTableDataSource(this.students); 
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      },
        error: (err) => {
        console.log(<any>err);
        }
      }
    );
  }

  getProductScenario(){
    for(let i = 0; i< this.escenario; i++){
      this.productArr[i] = this.products.filter((x: { ESCENARIO_PRODUCTO: number; }) => x.ESCENARIO_PRODUCTO === i)
      }
      this.productArr = this.productArr.filter((entry: string) => { return entry != '' });
      this.addKeys()
  }

  addKeys(){
    for(let student of this.students){
      let customer = this.customers.find((e: { _id: string; }) => e._id == student.ID_REPRESENTANTE);
      if(customer){
        student.TIPO_REPRESENTANTE = customer.TIPO_REPRESENTANTE,
        student.CEDULA_REPRESENTANTE = customer.CEDULA_REPRESENTANTE,
        student.NOMBRES_REPRESENTANTE = customer.NOMBRES_REPRESENTANTE,
        student.CORREO_REPRESENTANTE = customer.CORREO_REPRESENTANTE,
        student.TELEFONO_REPRESENTANTE = customer.TELEFONO_REPRESENTANTE,
        student.DIRECCION_REPRESENTANTE = customer.DIRECCION_REPRESENTANTE 
        } else {
          let notFound = "N/A"
        student.TIPO_REPRESENTANTE = notFound,
        student.CEDULA_REPRESENTANTE = notFound,
        student.NOMBRES_REPRESENTANTE = notFound,
        student.CORREO_REPRESENTANTE = notFound,
        student.TELEFONO_REPRESENTANTE = notFound,
        student.DIRECCION_REPRESENTANTE = notFound
        }
      student.PREINSCRIPCION_PAGO = 0,
      student.PAGO_INSCRIPCION = 0,
      student.PREINSCRIPCION_FECHA = Date,
      student.FECHA_INSCRIPCION = Date,
      student.PAGO_MESES_MONTO = [],
      student.PAGO_MESES_FECHA = [],
      student.SOLVENCIA_MESES = [],
      //no logro asignar valor de PAGO_MESES_MONTO == this.paymentsArr. Se hace y se ejecutan los calculos de deuda correctamente,
      //pero el resultado final al momento de generar el Objecto Student, retorna 0 en todo. Y no hay forma de asignarlo.
      //Parece estar relacionado con utilizar una propiedad como Arr de Objetos. Si asigno el valor a una propiedad que no es un Arr, no problem
      student.PAGO_SEPTIEMBRE = 0,
      student.PAGO_OCTUBRE = 0,
      student.PAGO_NOVIEMBRE = 0,
      student.PAGO_DICIEMBRE = 0,
      student.PAGO_ENERO = 0,
      student.PAGO_FEBRERO = 0,
      student.PAGO_MARZO = 0,
      student.PAGO_ABRIL = 0,
      student.PAGO_MAYO = 0,
      student.PAGO_JUNIO = 0,
      student.PAGO_JULIO = 0,
      student.PAGO_AGOSTO = 0,
      student.FECHA_SEPTIEMBRE = "",
      student.FECHA_OCTUBRE = "",
      student.FECHA_NOVIEMBRE = "",
      student.FECHA_DICIEMBRE = "",
      student.FECHA_ENERO = "",
      student.FECHA_FEBRERO = "",
      student.FECHA_MARZO = "",
      student.FECHA_ABRIL = "",
      student.FECHA_MAYO = "",
      student.FECHA_JUNIO = "",
      student.FECHA_JULIO = "",
      student.FECHA_AGOSTO = "",
      student.DEUDA_TOTAL = 0;
      this.getStudentInvoices(student);
    }
  }

  getStudentInvoices(student: { 
    _id: string,
    NOMBRES_ALUMNO: string,
    PAGO_INSCRIPCION: number,
    PAGO_SEPTIEMBRE: number,
    PAGO_OCTUBRE: number,
    PAGO_NOVIEMBRE: number,
    PAGO_DICIEMBRE: number,
    PAGO_ENERO: number,
    PAGO_FEBRERO: number,
    PAGO_MARZO: number,
    PAGO_ABRIL: number,
    PAGO_MAYO: number,
    PAGO_JUNIO: number,
    PAGO_JULIO: number,
    PAGO_AGOSTO: number,
    FECHA_INSCRIPCION: any,
    FECHA_SEPTIEMBRE: any,
    FECHA_OCTUBRE: any,
    FECHA_NOVIEMBRE: any,
    FECHA_DICIEMBRE: any,
    FECHA_ENERO: any,
    FECHA_FEBRERO: any,
    FECHA_MARZO: any,
    FECHA_ABRIL: any,
    FECHA_MAYO: any,
    FECHA_JUNIO: any,
    FECHA_JULIO: any,
    FECHA_AGOSTO: any,
    PAGO_MESES_MONTO: number[],
    FECHA_MESES_MONTO: Date[],
    REGISTRO_MESES_MONTO: number[],
    SOLVENCIA_MESES: boolean[] }){
    this.invoiceArr = this.invoices.filter((x: { ID_ALUMNO: any; ESTATUS: boolean; }) => x.ID_ALUMNO === student._id && x.ESTATUS == true);
    this.datesArr = [];

          this.paymentsArr.length = this.productArr.length;
          this.solvencyArr.length = this.productArr.length;
          for(let b = 0; b < this.paymentsArr.length; b++){
            this.paymentsArr[b] = 0;
          }
          for(let c = 0; c < this.solvencyArr.length; c++){
            this.solvencyArr[c] = false;
          }
      if(this.invoiceArr.length > 0){
      for(let i = 0; i < this.invoiceArr.length; i++){
        for(let j = 0; j < this.productArr.length; j++){
          for(let z = 0; z < this.productArr[j].length; z++){
            if(this.invoiceArr[i].ESCENARIO_1 == this.productArr[j][z].ESCENARIO_PRODUCTO){ 
              this.paymentsArr[j] = this.paymentsArr[j] + this.invoiceArr[i].MONTO_1_USD;
              this.datesArr[j] = this.invoiceArr[i].FECHA_REGISTRO;
              if(this.productArr[j][z].TIPO_PRODUCTO == "Full" || this.productArr[j][z].TIPO_PRODUCTO == "Complemento"){
                this.solvencyArr[j] = true;
              }
              break;
            }
            //concepto 2
            if(this.invoiceArr[i].ESCENARIO_2 == this.productArr[j][z].ESCENARIO_PRODUCTO){ 
              this.paymentsArr[j] = this.paymentsArr[j] + this.invoiceArr[i].MONTO_2_USD;
              this.datesArr[j] = this.invoiceArr[i].FECHA_REGISTRO;
              if(this.productArr[j][z].TIPO_PRODUCTO == "Full" || this.productArr[j][z].TIPO_PRODUCTO == "Complemento"){
                this.solvencyArr[j] = true;
              }
              break;
            }
            //concepto 3
            if(this.invoiceArr[i].ESCENARIO_3 == this.productArr[j][z].ESCENARIO_PRODUCTO){ 
              this.paymentsArr[j] = this.paymentsArr[j] + this.invoiceArr[i].MONTO_3_USD;
              this.datesArr[j] = this.invoiceArr[i].FECHA_REGISTRO;
              if(this.productArr[j][z].TIPO_PRODUCTO == "Full" || this.productArr[j][z].TIPO_PRODUCTO == "Complemento"){
                this.solvencyArr[j] = true;
              }
              break;
            }
            //concepto 4
            if(this.invoiceArr[i].ESCENARIO_4 == this.productArr[j][z].ESCENARIO_PRODUCTO){ 
              this.paymentsArr[j] = this.paymentsArr[j] + this.invoiceArr[i].MONTO_4_USD;
              this.datesArr[j] = this.invoiceArr[i].FECHA_REGISTRO;
              if(this.productArr[j][z].TIPO_PRODUCTO == "Full" || this.productArr[j][z].TIPO_PRODUCTO == "Complemento"){
                this.solvencyArr[j] = true;
              }
              break;
            }
            //concepto 5
            if(this.invoiceArr[i].ESCENARIO_5 == this.productArr[j][z].ESCENARIO_PRODUCTO){ 
              this.paymentsArr[j] = this.paymentsArr[j] + this.invoiceArr[i].MONTO_5_USD;
              this.datesArr[j] = this.invoiceArr[i].FECHA_REGISTRO;
              if(this.productArr[j][z].TIPO_PRODUCTO == "Full" || this.productArr[j][z].TIPO_PRODUCTO == "Complemento"){
                this.solvencyArr[j] = true;
              }
              break;
            }  
          }  
        }
      }              
    }
    student.PAGO_INSCRIPCION = this.paymentsArr[0]
    student.FECHA_INSCRIPCION = this.datesArr[0]
    student.PAGO_MESES_MONTO = [... this.paymentsArr.slice(1)];
    student.FECHA_MESES_MONTO = [... this.datesArr.slice(1)];
    student.SOLVENCIA_MESES = [... this.solvencyArr.slice(1)]; 
    this.getStudentDebt(student);
  }

  getStudentDebt(student: { ID_ALUMNO?: number; NOMBRES_ALUMNO: any; INSCRIPCION_PAGO?: number; PAGO_MESES_MONTO: number[]; FECHA_MESES_MONTO: Date[]; PAGO_SEPTIEMBRE: number; PAGO_OCTUBRE: number; PAGO_NOVIEMBRE: number; PAGO_DICIEMBRE: number; PAGO_ENERO: number; PAGO_FEBRERO: number; PAGO_MARZO: number; PAGO_ABRIL: number; PAGO_MAYO: number; PAGO_JUNIO: number; PAGO_JULIO: number; PAGO_AGOSTO: number; 
    FECHA_SEPTIEMBRE: any; FECHA_OCTUBRE: any; FECHA_NOVIEMBRE: any; FECHA_DICIEMBRE: any; FECHA_ENERO: any; FECHA_FEBRERO: any; FECHA_MARZO: any; FECHA_ABRIL: any; FECHA_MAYO: any; FECHA_JUNIO: any; FECHA_JULIO: any; FECHA_AGOSTO: any;
    SOLVENCIA_MESES: any; BECA_ALUMNO?: boolean; DESC_ALUMNO?: any; DEUDA_TOTAL?: any; CONCEPTO_DEUDA?: any; NIVEL_ALUMNO?: any; MES_DE_ULTIMO_PAGO?: any; INICIO_COBRO?: any; FINAL_COBRO?: any, ESTATUS?: boolean, FECHA_RETIRO?: any, SOLVENCIA_SEPTIEMBRE?: any,
    SOLVENCIA_OCTUBRE?: any,
    SOLVENCIA_NOVIEMBRE?: any,
    SOLVENCIA_DICIEMBRE?: any;
    SOLVENCIA_ENERO?: any;
    SOLVENCIA_FEBRERO?: any;
    SOLVENCIA_MARZO?: any;
    SOLVENCIA_ABRIL?: any;
    SOLVENCIA_MAYO?: any;
    SOLVENCIA_JUNIO?: any;
    SOLVENCIA_JULIO?: any;
    SOLVENCIA_AGOSTO?: any;
 }){
      for(let i = 0; i < this.escenario; i++){
        if(this.escenario == (i+1)){
          let slicedProductArr = this.productArr.slice(1, (i+1));
          let superSlicedProductArr: any = [];

          if(student.NIVEL_ALUMNO === "Preescolar"){
            for(let t = 0; t < slicedProductArr.length; t++){
              let slicedProduct = slicedProductArr[t].filter((x: { TIPO_PRODUCTO: string; }) => x.TIPO_PRODUCTO == "Full");
              if(slicedProduct[0].ESCENARIO_PRODUCTO < this.escenario && slicedProduct[0].PAGO_VENCIDO_PREESCOLAR != 0){
                superSlicedProductArr.push(slicedProduct[0].PAGO_VENCIDO_PREESCOLAR);
              } else {
                superSlicedProductArr.push(slicedProduct[0].PRECIO_PREESCOLAR);
              }
            }
          }
          if(student.NIVEL_ALUMNO === "Básica"){
            for(let t = 0; t < slicedProductArr.length; t++){
              let slicedProduct = slicedProductArr[t].filter((x: { TIPO_PRODUCTO: string; }) => x.TIPO_PRODUCTO == "Full");
              if(slicedProduct[0].ESCENARIO_PRODUCTO < this.escenario && slicedProduct[0].PAGO_VENCIDO_BASICA != 0){
                superSlicedProductArr.push(slicedProduct[0].PAGO_VENCIDO_BASICA);
              } else {
                superSlicedProductArr.push(slicedProduct[0].PRECIO_BASICA);
              }
            }
          }
          //determina rango de meses a cobrar
          let rango_cobranza: boolean[] = [];
          if(rango_cobranza){
            for(let r = 0; r<12; r++){
              rango_cobranza[r] = false;
            }
  
            for(let c = 0; c<12; c++){
              if(student.INICIO_COBRO === (c+1)){
                rango_cobranza[c] = true;
              }
            }

            for(let c = 0; c<12; c++){
              if(student.FINAL_COBRO === (c+1)){
                rango_cobranza[c] = true;
              }
            }

            let startMonth = rango_cobranza.indexOf(true);
            let lastMonth = rango_cobranza.lastIndexOf(true);
  
            //fecha de retiro. Cobrar hasta mes de retiro
            for(let r = startMonth; r < lastMonth; r++){
              rango_cobranza[r] = true;
            }

            if(student.ESTATUS == false){
              for(let r = Number(student.FECHA_RETIRO); r<12; r++){
                rango_cobranza[(r)] = false;
              }
            }
          }
        
          if(student.BECA_ALUMNO == true){
            for(let c = 0; c < student.SOLVENCIA_MESES.length; c++){
              student.SOLVENCIA_MESES[c] = true;
            }
          }

          if(student.DESC_ALUMNO > 0){
            for(let i = 0; i < superSlicedProductArr.length; i++){
            superSlicedProductArr[i] = superSlicedProductArr[i] * student.DESC_ALUMNO;
            }
          }

          //acá si solvencia mes es true, o result es negativo, o rango_cobranza es false, retorna 0
          for(let s = 0; s < superSlicedProductArr.length; s++){
            superSlicedProductArr[s] = superSlicedProductArr[s] - student.PAGO_MESES_MONTO[s];
            if(student.SOLVENCIA_MESES[s] == true || superSlicedProductArr[s] < 0 || rango_cobranza[s] == false){
              superSlicedProductArr[s] = 0;
            }
          }

            //deuda total
            student.PAGO_SEPTIEMBRE  = student.PAGO_MESES_MONTO[0];
            student.PAGO_OCTUBRE  = student.PAGO_MESES_MONTO[1];
            student.PAGO_NOVIEMBRE  = student.PAGO_MESES_MONTO[2];
            student.PAGO_DICIEMBRE  = student.PAGO_MESES_MONTO[3];
            student.PAGO_ENERO  = student.PAGO_MESES_MONTO[4];
            student.PAGO_FEBRERO  = student.PAGO_MESES_MONTO[5];
            student.PAGO_MARZO  = student.PAGO_MESES_MONTO[6];
            student.PAGO_ABRIL  = student.PAGO_MESES_MONTO[7];
            student.PAGO_MAYO  = student.PAGO_MESES_MONTO[8];
            student.PAGO_JUNIO  = student.PAGO_MESES_MONTO[9];
            student.PAGO_JULIO  = student.PAGO_MESES_MONTO[10];
            student.PAGO_AGOSTO  = student.PAGO_MESES_MONTO[11];
            student.FECHA_SEPTIEMBRE  = student.FECHA_MESES_MONTO[0];
            student.FECHA_OCTUBRE  = student.FECHA_MESES_MONTO[1];
            student.FECHA_NOVIEMBRE  = student.FECHA_MESES_MONTO[2];
            student.FECHA_DICIEMBRE  = student.FECHA_MESES_MONTO[3];
            student.FECHA_ENERO  = student.FECHA_MESES_MONTO[4];
            student.FECHA_FEBRERO  = student.FECHA_MESES_MONTO[5];
            student.FECHA_MARZO  = student.FECHA_MESES_MONTO[6];
            student.FECHA_ABRIL  = student.FECHA_MESES_MONTO[7];
            student.FECHA_MAYO  = student.FECHA_MESES_MONTO[8];
            student.FECHA_JUNIO  = student.FECHA_MESES_MONTO[9];
            student.FECHA_JULIO  = student.FECHA_MESES_MONTO[10];
            student.FECHA_AGOSTO  = student.FECHA_MESES_MONTO[11];
            student.SOLVENCIA_SEPTIEMBRE = student.SOLVENCIA_MESES[0];
        student.SOLVENCIA_OCTUBRE = student.SOLVENCIA_MESES[1];
        student.SOLVENCIA_NOVIEMBRE = student.SOLVENCIA_MESES[2];
        student.SOLVENCIA_DICIEMBRE = student.SOLVENCIA_MESES[3];
        student.SOLVENCIA_ENERO = student.SOLVENCIA_MESES[4];
        student.SOLVENCIA_FEBRERO = student.SOLVENCIA_MESES[5];
        student.SOLVENCIA_MARZO = student.SOLVENCIA_MESES[6];
        student.SOLVENCIA_ABRIL = student.SOLVENCIA_MESES[7];
        student.SOLVENCIA_MAYO = student.SOLVENCIA_MESES[8];
        student.SOLVENCIA_JUNIO = student.SOLVENCIA_MESES[9];
        student.SOLVENCIA_JULIO = student.SOLVENCIA_MESES[10];
        student.SOLVENCIA_AGOSTO = student.SOLVENCIA_MESES[11];

            let startDebt = superSlicedProductArr.findIndex((n: number) => n > 0);
            let lastDebt = superSlicedProductArr.findLastIndex((n: number) => n > 0);
            let conceptoDeuda!: string;
            if(startDebt == 0){
              conceptoDeuda = "Mes de Septiembre 2021";
            }
            if(startDebt == 1){
              conceptoDeuda = "Mes de Octubre 2021";
            }
            if(startDebt == 2){
              conceptoDeuda = "Mes de Noviembre 2021";
            }
            if(startDebt == 3){
              conceptoDeuda = "Mes de Diciembre 2021";
            }
            if(startDebt == 4){
              conceptoDeuda = "Mes de Enero 2022";
            }
            if(startDebt == 5){
              conceptoDeuda = "Mes de Febrero 2022";
            }
            if(startDebt == 6){
              conceptoDeuda = "Mes de Marzo 2022";
            }
            if(startDebt == 7){
              conceptoDeuda = "Mes de Abril 2022";
            }
            if(startDebt == 8){
              conceptoDeuda = "Mes de Mayo 2022";
            }
            if(startDebt == 9){
              conceptoDeuda = "Mes de Junio 2022";
            }
            if(startDebt == 10){
              conceptoDeuda = "Mes de Julio 2022";
            }
            if(startDebt == 11){
              conceptoDeuda = "Mes de Agosto 2022";
            }
            if(startDebt != lastDebt){
              conceptoDeuda = conceptoDeuda + " - ";
              if(lastDebt == 0){
                conceptoDeuda = conceptoDeuda + " Mes de Septiembre 2021";
                student.MES_DE_ULTIMO_PAGO = "Mes de Septiembre de 2021";
              }
              if(lastDebt == 1){
                conceptoDeuda = conceptoDeuda +  " Mes de Octubre 2021";
                student.MES_DE_ULTIMO_PAGO = "Mes de Octubre de 2021";
              }
              if(lastDebt == 2){
                conceptoDeuda = conceptoDeuda + " Mes de Noviembre 2021";
                student.MES_DE_ULTIMO_PAGO = "Mes de Noviembre de 2021";
              }
              if(lastDebt == 3){
                conceptoDeuda = conceptoDeuda +  " Mes de Diciembre 2021";
                student.MES_DE_ULTIMO_PAGO = "Mes de Diciembre de 2021";
              }
              if(lastDebt == 4){
                conceptoDeuda = conceptoDeuda +  " Mes de Enero 2022";
                student.MES_DE_ULTIMO_PAGO = "Mes de Enero de 2022";
              }
              if(lastDebt == 5){
                conceptoDeuda = conceptoDeuda +  " Mes de Febrero 2022";
                student.MES_DE_ULTIMO_PAGO = "Mes de Febrero de 2022";
              }
              if(lastDebt == 6){
                conceptoDeuda = conceptoDeuda + " Mes de Marzo 2022";
                student.MES_DE_ULTIMO_PAGO = "Mes de Marzo de 2022";
              }
              if(lastDebt == 7){
                conceptoDeuda = conceptoDeuda +  " Mes de Abril 2022";
                student.MES_DE_ULTIMO_PAGO = "Mes de Abril de 2022";
              }
              if(lastDebt == 8){
                conceptoDeuda = conceptoDeuda +  " Mes de Mayo 2022";
                student.MES_DE_ULTIMO_PAGO = "Mes de Mayo de 2022";
              }
              if(lastDebt == 9){
                conceptoDeuda = conceptoDeuda + " Mes de Junio 2022";
                student.MES_DE_ULTIMO_PAGO = "Mes de Junio de 2022";
              }
              if(lastDebt == 10){
                conceptoDeuda = conceptoDeuda +  " Mes de Julio 2022";
                student.MES_DE_ULTIMO_PAGO = "Mes de Julio de 2022";
              } 
              if(lastDebt == 11){
                student.MES_DE_ULTIMO_PAGO = "Mes de Agosto de 2022";
              } 
            }
            student.CONCEPTO_DEUDA = conceptoDeuda;
            let sum = 0;
            superSlicedProductArr.map((val: any)=>sum+=val)
            student.DEUDA_TOTAL = sum;
            this.debtors = this.students;
        }
      }
  }

  applyFilter(){
      this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  
  cleanFilter(){
      this.searchKey = "";
      this.applyFilter();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  collectButton() {
    this.currentRow = this.selection.selected;
    this.currentSection = 1;
    let principalBar = $("#principalBar, #print-section, mat-paginator");
    let collectBar = $("#collectBar");
    principalBar.addClass("hide-section");
    collectBar.removeClass("hide-section");
    if(this.currentRow.length > 0){
      this.collectBar.checkRow();
      setTimeout(() => {
          this.selection.clear();
      })
    }
  }

  solvencyButton(){
    this.sticky = false;
    this.currentSection = 2;
    let principalBar = $("#principalBar");
    let solvencyBar = $("#solvencyBar");
    principalBar.addClass("hide-section");
    solvencyBar.removeClass("hide-section");
    this.solvencyColumns();
  }

  solvencyColumns(){
    let table = $("#table-section");
    table.width("100%");
    let hideIndividualColumns = $(".secondaryCol");
    hideIndividualColumns.addClass("hide-section");
  }

  getDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    setTimeout(() => {
      if (this.currentSection === 2) {
        this.solvencyColumns();
      } 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  exportExcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('table-section');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
  }

  triggerPrint(){
    this.print.nativeElement.click();
  }
}


