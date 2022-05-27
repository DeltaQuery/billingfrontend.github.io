import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var $: any;
import { InvoiceService } from 'src/app/services/invoice-service/invoice-service.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss'],
})
export class ViewInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  dialogTitle: string = 'Factura #';
  @ViewChild("print") print!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ViewInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public updateData: any,
    private _invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.disableFormControls();
    this.printDecision();
  }

  buildForm() {
    this.invoiceForm = this.formBuilder.group({
      FECHA_REGISTRO: [],
      ID_REPRESENTANTE: [],
      CODIGO_FACTURA: [],
      CIUDAD_CLIENTE: [],
      TIPO_CLIENTE: [],
      ID_CLIENTE: [],
      NOMBRES_CLIENTE: [],
      DIRECCION_CLIENTE: [],
      TELEFONO_CLIENTE: [],
      ID_ALUMNO: [],
      NOMBRES_ALUMNO: [],
      APELLIDOS_ALUMNO: [],
      GRADO_ALUMNO: [],
      CONCEPTO_1: [],
      MONTO_1_USD: [],
      MONTO_1_BS: [],
      MONTO_1_BCV: [],
      CONCEPTO_2: [],
      MONTO_2_USD: [],
      MONTO_2_BS: [],
      MONTO_2_BCV: [],
      CONCEPTO_3: [],
      MONTO_3_USD: [],
      MONTO_3_BS: [],
      MONTO_3_BCV: [],
      CONCEPTO_4: [],
      MONTO_4_USD: [],
      MONTO_4_BS: [],
      MONTO_4_BCV: [],
      CONCEPTO_5: [],
      MONTO_5_USD: [],
      MONTO_5_BS: [],
      MONTO_5_BCV: [],
      TIPO_TRANSACCION: [],
      NO_TRANSACCION: [],
      EFECTIVO: [],
      BANCO: [],
      SUBTOTAL_BS: [],
      SUBTOTAL_USD: [],
      IVA: [],
      TOTAL_BS: [],
      TOTAL_USD: [],
      CREDITO_CONTADO: [],
      OBSERVACIONES: [],
      ESTATUS: [],
    });

    if (this.updateData) {
      this.invoiceForm.controls['FECHA_REGISTRO'].setValue(
        this.updateData.FECHA_REGISTRO
      );
      this.invoiceForm.controls['ID_REPRESENTANTE'].setValue(
        this.updateData.ID_REPRESENTANTE
      );
      this.invoiceForm.controls['CODIGO_FACTURA'].setValue(
        this.updateData.CODIGO_FACTURA
      );
      this.invoiceForm.controls['CIUDAD_CLIENTE'].setValue(
        this.updateData.CIUDAD_CLIENTE
      );
      this.invoiceForm.controls['TIPO_CLIENTE'].setValue(
        this.updateData.TIPO_CLIENTE
      );
      this.invoiceForm.controls['ID_CLIENTE'].setValue(
        this.updateData.TIPO_CLIENTE + '-' + this.updateData.ID_CLIENTE
      );
      this.invoiceForm.controls['NOMBRES_CLIENTE'].setValue(
        this.updateData.NOMBRES_CLIENTE
      );
      this.invoiceForm.controls['DIRECCION_CLIENTE'].setValue(
        this.updateData.DIRECCION_CLIENTE
      );
      this.invoiceForm.controls['TELEFONO_CLIENTE'].setValue(
        this.updateData.TELEFONO_CLIENTE
      );
      this.invoiceForm.controls['ID_ALUMNO'].setValue(
        this.updateData.ID_ALUMNO
      );
      this.invoiceForm.controls['NOMBRES_ALUMNO'].setValue(
        this.updateData.NOMBRES_ALUMNO
      );
      this.invoiceForm.controls['APELLIDOS_ALUMNO'].setValue(
        this.updateData.APELLIDOS_ALUMNO
      );
      this.invoiceForm.controls['GRADO_ALUMNO'].setValue(
        this.updateData.GRADO_ALUMNO
      );
      this.invoiceForm.controls['CONCEPTO_1'].setValue(
        this.updateData.CONCEPTO_1
      );
      this.invoiceForm.controls['CONCEPTO_2'].setValue(
        this.updateData.CONCEPTO_2
      );
      this.invoiceForm.controls['CONCEPTO_3'].setValue(
        this.updateData.CONCEPTO_3
      );
      this.invoiceForm.controls['CONCEPTO_4'].setValue(
        this.updateData.CONCEPTO_4
      );
      this.invoiceForm.controls['CONCEPTO_5'].setValue(
        this.updateData.CONCEPTO_5
      );
      this.invoiceForm.controls['MONTO_1_USD'].setValue(
        this.updateData.MONTO_1_USD
      );
      this.invoiceForm.controls['MONTO_2_USD'].setValue(
        this.updateData.MONTO_2_USD
      );
      this.invoiceForm.controls['MONTO_3_USD'].setValue(
        this.updateData.MONTO_3_USD
      );
      this.invoiceForm.controls['MONTO_4_USD'].setValue(
        this.updateData.MONTO_4_USD
      );
      this.invoiceForm.controls['MONTO_5_USD'].setValue(
        this.updateData.MONTO_5_USD
      );
      this.invoiceForm.controls['MONTO_1_BS'].setValue(
        this.updateData.MONTO_1_BS
      );
      this.invoiceForm.controls['MONTO_2_BS'].setValue(
        this.updateData.MONTO_2_BS
      );
      this.invoiceForm.controls['MONTO_3_BS'].setValue(
        this.updateData.MONTO_3_BS
      );
      this.invoiceForm.controls['MONTO_4_BS'].setValue(
        this.updateData.MONTO_4_BS
      );
      this.invoiceForm.controls['MONTO_5_BS'].setValue(
        this.updateData.MONTO_5_BS
      );
      this.invoiceForm.controls['MONTO_1_BCV'].setValue(
        this.updateData.MONTO_1_BCV
      );
      this.invoiceForm.controls['MONTO_2_BCV'].setValue(
        this.updateData.MONTO_2_BCV
      );
      this.invoiceForm.controls['MONTO_3_BCV'].setValue(
        this.updateData.MONTO_3_BCV
      );
      this.invoiceForm.controls['MONTO_4_BCV'].setValue(
        this.updateData.MONTO_4_BCV
      );
      this.invoiceForm.controls['MONTO_5_BCV'].setValue(
        this.updateData.MONTO_5_BCV
      );
      this.invoiceForm.controls['TIPO_TRANSACCION'].setValue(
        this.updateData.TIPO_TRANSACCION
      );
      this.invoiceForm.controls['NO_TRANSACCION'].setValue(
        this.updateData.NO_TRANSACCION
      );
      this.invoiceForm.controls['EFECTIVO'].setValue(this.updateData.EFECTIVO);
      this.invoiceForm.controls['BANCO'].setValue(this.updateData.BANCO);
      this.invoiceForm.controls['SUBTOTAL_BS'].setValue(
        this.updateData.SUBTOTAL_BS
      );
      this.invoiceForm.controls['SUBTOTAL_USD'].setValue(
        this.updateData.SUBTOTAL_USD
      );
      this.invoiceForm.controls['IVA'].setValue(this.updateData.IVA);
      this.invoiceForm.controls['TOTAL_BS'].setValue(this.updateData.TOTAL_BS);
      this.invoiceForm.controls['TOTAL_USD'].setValue(
        this.updateData.TOTAL_USD
      );
      this.invoiceForm.controls['CREDITO_CONTADO'].setValue(
        this.updateData.CREDITO_CONTADO
      );
      this.invoiceForm.controls['OBSERVACIONES'].setValue(
        this.updateData.OBSERVACIONES
      );
      this.invoiceForm.controls['ESTATUS'].setValue(this.updateData.ESTATUS);
    }
  }

  disableFormControls() {
    const state = 'disable';
    Object.keys(this.invoiceForm.controls).forEach((controlName) => {
      this.invoiceForm.controls[controlName][state]();
    });
  }

  triggerPrint(){
    let hide: any = $('.hide');
    hide.css( "color", "transparent" );
    this.print.nativeElement.click();
    hide.css( "color", "black" );
  }

  printDecision(){
    if(this._invoiceService.getPrintDecision() === true){
      setTimeout(() => {
        this.dialogRef.close();
        this.triggerPrint();
      });
    }
    
  }
}
