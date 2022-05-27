import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { InvoiceService } from 'src/app/services/invoice-service/invoice-service.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { ComponentTitleService } from 'src/app/services/component-title/component-title.service';
import { StudentService } from 'src/app/services/student-service/student-service';
import { DebtorsComponent } from '../debtors/debtors.component';
import { InvoicesComponent } from '../invoices/invoices.component';
import { IncomeComponent } from '../income/income.component';
import { StudentsComponent } from '../students/students.component';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  escenario: number = this.getScenario();
  students: any = [];
  debtors!: any[];
  customers: any = [];
  invoices: any = [];
  products: any = [];
  productArr: any = [];
  invoiceArr: any = [];
  paymentsArr: number[] = [];
  datesArr: Date[] = [];
  solvencyArr: boolean[] = [];
  solvencyPercentage: number[] = [];
  property!: string;
  subscription!: Subscription;

  constructor(private _studentService: StudentService,
    private _customerService: CustomerService,
    private _invoiceService: InvoiceService,
    private _productService: ProductService,
    private _titleService: ComponentTitleService) { }

  ngOnInit(): void {
    this.getScenario();
    this.getCustomers();
    setTimeout(() => {
      this._titleService.titleName = "Inicio";
    });
  }

  updateScenario() {
    this.getCustomers();
    this.getInvoices();
    this.getProducts();
    this.getStudents();
  }

  getScenario() {
    let currentDate = new Date().toJSON().slice(0, 10);
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

    if (check >= sep && check < oct) {
      return 1;
    }
    if (check > oct && check < nov) {
      return 2;
    }
    if (check > nov && check < dic) {
      return 3;
    }
    if (check > dic && check < ene) {
      return 4;
    }
    if (check > ene && check < feb) {
      return 5;
    }
    if (check > feb && check < mar) {
      return 6;
    }
    if (check > mar && check < abr) {
      return 7;
    }
    if (check > abr && check < may) {
      return 8;
    }
    if (check > may && check < jun) {
      return 9;
    }
    if (check > jun && check < jul) {
      return 10;
    }
    if (check > jul && check < ago) {
      return 12;
    }
    return 12;
  }

  getCustomers() {
    this._customerService.getCustomers()
      .subscribe(
        {
          next: (res) => {
            this.customers = res;
            this.getInvoices();
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
            this.getProducts();
          },
          error: (err) => {
            console.log(<any>err);
          }
        }
      );
  }

  getProducts() {
    this._productService.getProducts()
      .subscribe(
        {
          next: (res) => {
            this.products = res;
            this.getStudents();
          },
          error: (err) => {
            console.log(<any>err);
          }
        }
      );
  }

  getStudents() {
    this._studentService.getStudents()
      .subscribe(
        {
          next: (res) => {
            this.students = res;
            setTimeout(() => {
              this.getProductScenario(this.productArr);
            })

          },
          error: (err) => {
            console.log(<any>err);
          }
        }
      );
  }

  getProductScenario(p: any[]) {
    for (let i = 0; i < 12; i++) {
      p[i] = this.products.filter((x: { ESCENARIO_PRODUCTO: number; }) => x.ESCENARIO_PRODUCTO === (i + 1));
    }
    this.addKeys();
  }

  addKeys() {
    for (let student of this.students) {
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
    ID_ALUMNO: number,
    NOMBRES_ALUMNO: string,
    INSCRIPCION_PAGO: number,
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
    SOLVENCIA_MESES: boolean[],
    _id: any
  }) {
    this.invoiceArr = this.invoices.filter((x: { ID_ALUMNO: any; ESTATUS: boolean; }) => x.ID_ALUMNO === student._id && x.ESTATUS == true);
    this.productArr = this.productArr.filter((entry: string) => { return entry != '' });
    this.datesArr = [];

    this.paymentsArr.length = this.productArr.length;
    this.solvencyArr.length = this.productArr.length;
    for (let b = 0; b < this.paymentsArr.length; b++) {
      this.paymentsArr[b] = 0;
    }
    for (let c = 0; c < this.solvencyArr.length; c++) {
      this.solvencyArr[c] = false;
    }
    if (this.invoiceArr.length > 0) {
      for (let i = 0; i < this.invoiceArr.length; i++) {
        for (let j = 0; j < this.productArr.length; j++) {
          for (let z = 0; z < this.productArr[j].length; z++) {
            if (this.invoiceArr[i].ESCENARIO_1 == this.productArr[j][z].ESCENARIO_PRODUCTO) {
              this.paymentsArr[j] = this.paymentsArr[j] + this.invoiceArr[i].MONTO_1_USD;
              this.datesArr[j] = this.invoiceArr[i].FECHA_REGISTRO;
              if (this.productArr[j][z].TIPO_PRODUCTO == "Full" || this.productArr[j][z].TIPO_PRODUCTO == "Complemento") {
                this.solvencyArr[j] = true;
              }
              break;
            }
            //concepto 2
            if (this.invoiceArr[i].ESCENARIO_2 == this.productArr[j][z].ESCENARIO_PRODUCTO) {
              this.paymentsArr[j] = this.paymentsArr[j] + this.invoiceArr[i].MONTO_2_USD;
              this.datesArr[j] = this.invoiceArr[i].FECHA_REGISTRO;
              if (this.productArr[j][z].TIPO_PRODUCTO == "Full" || this.productArr[j][z].TIPO_PRODUCTO == "Complemento") {
                this.solvencyArr[j] = true;
              }
              break;
            }
            //concepto 3
            if (this.invoiceArr[i].ESCENARIO_3 == this.productArr[j][z].ESCENARIO_PRODUCTO) {
              this.paymentsArr[j] = this.paymentsArr[j] + this.invoiceArr[i].MONTO_3_USD;
              this.datesArr[j] = this.invoiceArr[i].FECHA_REGISTRO;
              if (this.productArr[j][z].TIPO_PRODUCTO == "Full" || this.productArr[j][z].TIPO_PRODUCTO == "Complemento") {
                this.solvencyArr[j] = true;
              }
              break;
            }
            //concepto 4
            if (this.invoiceArr[i].ESCENARIO_4 == this.productArr[j][z].ESCENARIO_PRODUCTO) {
              this.paymentsArr[j] = this.paymentsArr[j] + this.invoiceArr[i].MONTO_4_USD;
              this.datesArr[j] = this.invoiceArr[i].FECHA_REGISTRO;
              if (this.productArr[j][z].TIPO_PRODUCTO == "Full" || this.productArr[j][z].TIPO_PRODUCTO == "Complemento") {
                this.solvencyArr[j] = true;
              }
              break;
            }
            //concepto 5
            if (this.invoiceArr[i].ESCENARIO_5 == this.productArr[j][z].ESCENARIO_PRODUCTO) {
              this.paymentsArr[j] = this.paymentsArr[j] + this.invoiceArr[i].MONTO_5_USD;
              this.datesArr[j] = this.invoiceArr[i].FECHA_REGISTRO;
              if (this.productArr[j][z].TIPO_PRODUCTO == "Full" || this.productArr[j][z].TIPO_PRODUCTO == "Complemento") {
                this.solvencyArr[j] = true;
              }
              break;
            }
          }
        }
      }
    }
    student.PAGO_MESES_MONTO = this.paymentsArr;
    student.FECHA_MESES_MONTO = this.datesArr;
    student.SOLVENCIA_MESES = this.solvencyArr;
    this.getStudentDebt(student);
  }

  getStudentDebt(student: {
    ID_ALUMNO?: number; NOMBRES_ALUMNO: any; INSCRIPCION_PAGO?: number; PAGO_MESES_MONTO: number[]; FECHA_MESES_MONTO: Date[]; PAGO_SEPTIEMBRE: number; PAGO_OCTUBRE: number; PAGO_NOVIEMBRE: number; PAGO_DICIEMBRE: number; PAGO_ENERO: number; PAGO_FEBRERO: number; PAGO_MARZO: number; PAGO_ABRIL: number; PAGO_MAYO: number; PAGO_JUNIO: number; PAGO_JULIO: number; PAGO_AGOSTO: number;
    FECHA_SEPTIEMBRE: any; FECHA_OCTUBRE: any; FECHA_NOVIEMBRE: any; FECHA_DICIEMBRE: any; FECHA_ENERO: any; FECHA_FEBRERO: any; FECHA_MARZO: any; FECHA_ABRIL: any; FECHA_MAYO: any; FECHA_JUNIO: any; FECHA_JULIO: any; FECHA_AGOSTO: any;
    SOLVENCIA_MESES: any; BECA_ALUMNO?: any; DESC_ALUMNO?: any; DEUDA_TOTAL?: any; CONCEPTO_DEUDA?: any; NIVEL_ALUMNO?: any; MES_DE_ULTIMO_PAGO?: any; INICIO_COBRO?: any; FINAL_COBRO?: any, ESTATUS?: any, FECHA_RETIRO?: any, SOLVENCIA_SEPTIEMBRE?: any,
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
  }) {
    for (let i = 0; i < this.escenario; i++) {
      if (this.escenario == (i + 1)) {
        let slicedProductArr = this.productArr.slice(0, (i + 1));
        let superSlicedProductArr: any = [];

        if (student.NIVEL_ALUMNO == "Preescolar") {
          for (let t = 0; t < slicedProductArr.length; t++) {
            let slicedProduct = slicedProductArr[t].filter((x: { TIPO_PRODUCTO: string; }) => x.TIPO_PRODUCTO == "Full");
            if (slicedProduct[0].ESCENARIO_PRODUCTO < this.escenario && slicedProduct[0].PAGO_VENCIDO_PREESCOLAR != 0) {
              superSlicedProductArr.push(slicedProduct[0].PAGO_VENCIDO_PREESCOLAR);
            } else {
              superSlicedProductArr.push(slicedProduct[0].PRECIO_PREESCOLAR);
            }
          }
        }
        if (student.NIVEL_ALUMNO == "Basica") {
          for (let t = 0; t < slicedProductArr.length; t++) {
            let slicedProduct = slicedProductArr[t].filter((x: { TIPO_PRODUCTO: string; }) => x.TIPO_PRODUCTO == "Full");
            if (slicedProduct[0].ESCENARIO_PRODUCTO < this.escenario && slicedProduct[0].PAGO_VENCIDO_BASICA != 0) {
              superSlicedProductArr.push(slicedProduct[0].PAGO_VENCIDO_BASICA);
            } else {
              superSlicedProductArr.push(slicedProduct[0].PRECIO_BASICA);
            }
          }
        }

        //determina rango de meses a cobrar
        let rango_cobranza: boolean[] = [];
        if (rango_cobranza) {
          for (let r = 0; r < 12; r++) {
            rango_cobranza[r] = false;
          }

          for (let c = 0; c < 12; c++) {
            if (student.INICIO_COBRO == (c + 1)) {
              rango_cobranza[c] = true;
            }
          }

          for (let c = 0; c < 12; c++) {
            if (student.FINAL_COBRO == (c + 1)) {
              rango_cobranza[c] = true;
            }
          }

          let startMonth = rango_cobranza.indexOf(true);
          let lastMonth = rango_cobranza.lastIndexOf(true);

          //fecha de retiro. Cobrar hasta mes de retiro
          for (let r = startMonth; r < lastMonth; r++) {
            rango_cobranza[r] = true;
          }

          if (student.ESTATUS == "1") {
            for (let r = Number(student.FECHA_RETIRO); r < 12; r++) {
              rango_cobranza[(r)] = false;
            }
          }
        }

        if (student.BECA_ALUMNO == true) {
          for (let c = 0; c < student.SOLVENCIA_MESES.length; c++) {
            student.SOLVENCIA_MESES[c] = true;
          }
        }

        if (student.DESC_ALUMNO > 0) {
          for (let i = 0; i < superSlicedProductArr.length; i++) {
            superSlicedProductArr[i] = superSlicedProductArr[i] * student.DESC_ALUMNO;
          }
        }

        //acá si solvencia mes es true, o result es negativo, o rango_cobranza es false, retorna 0
        for (let s = 0; s < superSlicedProductArr.length; s++) {
          superSlicedProductArr[s] = superSlicedProductArr[s] - student.PAGO_MESES_MONTO[s];
          if (student.SOLVENCIA_MESES[s] == true || superSlicedProductArr[s] < 0 || rango_cobranza[s] == false) {
            superSlicedProductArr[s] = 0;
          }
        }

        //deuda total
        student.PAGO_SEPTIEMBRE = student.PAGO_MESES_MONTO[0];
        student.PAGO_OCTUBRE = student.PAGO_MESES_MONTO[1];
        student.PAGO_NOVIEMBRE = student.PAGO_MESES_MONTO[2];
        student.PAGO_DICIEMBRE = student.PAGO_MESES_MONTO[3];
        student.PAGO_ENERO = student.PAGO_MESES_MONTO[4];
        student.PAGO_FEBRERO = student.PAGO_MESES_MONTO[5];
        student.PAGO_MARZO = student.PAGO_MESES_MONTO[6];
        student.PAGO_ABRIL = student.PAGO_MESES_MONTO[7];
        student.PAGO_MAYO = student.PAGO_MESES_MONTO[8];
        student.PAGO_JUNIO = student.PAGO_MESES_MONTO[9];
        student.PAGO_JULIO = student.PAGO_MESES_MONTO[10];
        student.PAGO_AGOSTO = student.PAGO_MESES_MONTO[11];
        student.FECHA_SEPTIEMBRE = student.FECHA_MESES_MONTO[0];
        student.FECHA_OCTUBRE = student.FECHA_MESES_MONTO[1];
        student.FECHA_NOVIEMBRE = student.FECHA_MESES_MONTO[2];
        student.FECHA_DICIEMBRE = student.FECHA_MESES_MONTO[3];
        student.FECHA_ENERO = student.FECHA_MESES_MONTO[4];
        student.FECHA_FEBRERO = student.FECHA_MESES_MONTO[5];
        student.FECHA_MARZO = student.FECHA_MESES_MONTO[6];
        student.FECHA_ABRIL = student.FECHA_MESES_MONTO[7];
        student.FECHA_MAYO = student.FECHA_MESES_MONTO[8];
        student.FECHA_JUNIO = student.FECHA_MESES_MONTO[9];
        student.FECHA_JULIO = student.FECHA_MESES_MONTO[10];
        student.FECHA_AGOSTO = student.FECHA_MESES_MONTO[11];
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

        let sum = 0;
        superSlicedProductArr.map((val: any) => sum += val)
        student.DEUDA_TOTAL = sum;
        this.debtors = this.students;
      }
    }
    this.getSolvencyIndex();
  }

  getSolvencyIndex() {
    let activeStudents: any[] = [];
    let statStudents: any[] = [];

    for (let i = 0; i < this.escenario; i++) {
      statStudents[i] = this.debtors.filter(
        (x: {
          INICIO_COBRO: number;
          BECA_ALUMNO: boolean;
          FECHA_RETIRO: number;
        }) =>
          x.INICIO_COBRO <= i + 1 &&
          x.BECA_ALUMNO == false &&
          x.FECHA_RETIRO > i + 1
      );
    }

    for (let i = 0; i < this.escenario; i++) {
      activeStudents[i] = this.debtors.filter(
        (x: { INICIO_COBRO: number; FECHA_RETIRO: number }) =>
          x.INICIO_COBRO <= i + 1 && x.FECHA_RETIRO > i + 1
      );
    }

    if (this.escenario >= 1) {
      statStudents[0] = statStudents[0].filter(
        (x: { SOLVENCIA_SEPTIEMBRE: boolean }) => x.SOLVENCIA_SEPTIEMBRE == true
      );
    }

    if (this.escenario >= 2) {
      statStudents[1] = statStudents[1].filter(
        (x: { SOLVENCIA_OCTUBRE: boolean }) => x.SOLVENCIA_OCTUBRE == true
      );
    }

    if (this.escenario >= 3) {
      statStudents[2] = statStudents[2].filter(
        (x: { SOLVENCIA_NOVIEMBRE: boolean }) => x.SOLVENCIA_NOVIEMBRE == true
      );
    }

    if (this.escenario >= 4) {
      statStudents[3] = statStudents[3].filter(
        (x: { SOLVENCIA_DICIEMBRE: boolean }) => x.SOLVENCIA_DICIEMBRE == true
      );
    }

    if (this.escenario >= 5) {
      statStudents[4] = statStudents[4].filter(
        (x: { SOLVENCIA_ENERO: boolean }) => x.SOLVENCIA_ENERO == true
      );
    }

    if (this.escenario >= 6) {
      statStudents[5] = statStudents[5].filter(
        (x: { SOLVENCIA_FEBRERO: boolean }) => x.SOLVENCIA_FEBRERO == true
      );
    }

    if (this.escenario >= 7) {
      statStudents[6] = statStudents[6].filter(
        (x: { SOLVENCIA_MARZO: boolean }) => x.SOLVENCIA_MARZO == true
      );
    }

    if (this.escenario >= 8) {
      statStudents[7] = statStudents[7].filter(
        (x: { SOLVENCIA_ABRIL: boolean }) => x.SOLVENCIA_ABRIL == true
      );
    }

    if (this.escenario >= 9) {
      statStudents[8] = statStudents[8].filter(
        (x: { SOLVENCIA_MAYO: boolean }) => x.SOLVENCIA_MAYO == true
      );
    }

    if (this.escenario >= 10) {
      statStudents[9] = statStudents[9].filter(
        (x: { SOLVENCIA_JUNIO: boolean }) => x.SOLVENCIA_JUNIO == true
      );
    }

    if (this.escenario >= 11) {
      statStudents[10] = statStudents[10].filter(
        (x: { SOLVENCIA_JULIO: boolean }) => x.SOLVENCIA_JULIO == true
      );
    }

    if (this.escenario >= 12) {
      statStudents[11] = statStudents[11].filter(
        (x: { SOLVENCIA_AGOSTO: boolean }) => x.SOLVENCIA_AGOSTO == true
      );
    }

    for (let i = 0; i < statStudents.length; i++) {
      statStudents[i] = statStudents[i].length;
    }

    for (let i = 0; i < activeStudents.length; i++) {
      activeStudents[i] = activeStudents[i].length;
    }

    for (let i = 0; i < this.escenario; i++) {
      this.solvencyPercentage[i] = (100 / activeStudents[i]) * statStudents[i];
      this.solvencyPercentage[i] = this.roundNumber(
        this.solvencyPercentage[i],
        2
      );
    }
    for (let i = 0; i < 12; i++) {
      this.solvencyPercentage[i + this.escenario] = 0;
      if (this.solvencyPercentage.length == 12) {
        i = 12;
      }
    }
  }

  roundNumber(n: any, precision: any) {
    const precisionWithPow10 = Math.pow(10, precision);
    return Math.round(n * precisionWithPow10) / precisionWithPow10;
  }

}
