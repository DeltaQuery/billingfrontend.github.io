import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss']
})
export class CustomerDialogComponent implements OnInit {

  id_type = "V";
  selected = 'no';
  customerForm!: FormGroup;
  actionBtn : string = "Guardar";
  id_for : any = 1;
  dialogTitle : string = "Formulario de Registro";

  constructor(
    private formBuilder : FormBuilder,
    private _customerService: CustomerService,
    private _loginService: LoginServiceService,
    private dialogRef : MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateData : any
    ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.customerForm = this.formBuilder.group({
      TIPO_REPRESENTANTE : ["V", Validators.required],
      CEDULA_REPRESENTANTE : ["", [Validators.required, Validators.pattern('^[0-9]+$')]],
      NOMBRES_REPRESENTANTE : ["", Validators.required],
      DIRECCION_REPRESENTANTE : ["", Validators.required],
      TELEFONO_REPRESENTANTE : ["", [Validators.required, Validators.pattern('^[0-9]+$')] ],
      CORREO_REPRESENTANTE : ["", [Validators.required, Validators.email]],
      TIPO_CLIENTE : ["V"],
      ID_CLIENTE : ["", [Validators.pattern('^[0-9]+$')]],
      NOMBRES_CLIENTE : [""],
      DIRECCION_CLIENTE : [""],
      TELEFONO_CLIENTE : ["", [Validators.pattern('^[0-9]+$')]],
      CORREO_CLIENTE : ["", Validators.email],
      FECHA_REGISTRO : [new Date()],
      REGISTRADO_POR : [this._loginService.getUsername()],
    });
    
    if(this.updateData){
      this.dialogTitle = "Formulario de Actualización";
      this.actionBtn = "Actualizar";
      this.customerForm.controls["TIPO_REPRESENTANTE"].setValue(this.updateData.TIPO_REPRESENTANTE);
      this.customerForm.controls["CEDULA_REPRESENTANTE"].setValue(this.updateData.CEDULA_REPRESENTANTE);
      this.customerForm.controls["NOMBRES_REPRESENTANTE"].setValue(this.updateData.NOMBRES_REPRESENTANTE);
      this.customerForm.controls["DIRECCION_REPRESENTANTE"].setValue(this.updateData.DIRECCION_REPRESENTANTE);
      this.customerForm.controls["TELEFONO_REPRESENTANTE"].setValue(this.updateData.TELEFONO_REPRESENTANTE);
      this.customerForm.controls["CORREO_REPRESENTANTE"].setValue(this.updateData.CORREO_REPRESENTANTE);
      this.customerForm.controls["TIPO_CLIENTE"].setValue(this.updateData.TIPO_CLIENTE);
      this.customerForm.controls["ID_CLIENTE"].setValue(this.updateData.ID_CLIENTE);
      this.customerForm.controls["NOMBRES_CLIENTE"].setValue(this.updateData.NOMBRES_CLIENTE);
      this.customerForm.controls["DIRECCION_CLIENTE"].setValue(this.updateData.DIRECCION_CLIENTE);
      this.customerForm.controls["TELEFONO_CLIENTE"].setValue(this.updateData.TELEFONO_CLIENTE);
      this.customerForm.controls["CORREO_CLIENTE"].setValue(this.updateData.CORREO_CLIENTE);
    }
  }

  addCustomer(){
    if(!this.updateData){
      if(this.customerForm.valid){
        this.billingFill();
        this.customerForm.controls["CORREO_REPRESENTANTE"].setValue(this.customerForm.controls["CORREO_REPRESENTANTE"].value.toLowerCase());
        this._customerService.saveCustomer(this.customerForm.value)
          .subscribe({
            next: (res) => {
              alert("Representante creado correctamente.");
              this.customerForm.reset();
              this.dialogRef.close("save");
            },
            error: () => {
              console.log(Error),
              alert("Error encontrado al crear representante.")
            }
          })
      }
    } else {
      this.editCustomer();
    }
  }

  editCustomer(){
    if(this.customerForm.valid){
    this.billingFill();
    this._customerService.updateCustomer(this.updateData._id, this.customerForm.value)
      .subscribe({
        next: () => {
          alert("Representante actualizado exitosamente.");
          this.customerForm.reset();
          this.dialogRef.close("update");
        },
        error: (err: any) => {
          console.log(err),
          alert("Error encontrado al actualizar representante.")
        }
      })
    }
  }

   //INFO DISTINTA PARA FACTURACION. GENERAR AUTOMATICAMENTE SI NO SE LLENA
   billingFill() {
     if(this.customerForm.value.ID_CLIENTE == ""){
       this.customerForm.controls["ID_CLIENTE"].setValue(this.customerForm.value.CEDULA_REPRESENTANTE);
     }
     if(this.customerForm.value.NOMBRES_CLIENTE == ""){
      this.customerForm.controls["NOMBRES_CLIENTE"].setValue(this.customerForm.value.NOMBRES_REPRESENTANTE);
    }
     if(this.customerForm.value.DIRECCION_CLIENTE == ""){
      this.customerForm.controls["DIRECCION_CLIENTE"].setValue(this.customerForm.value.DIRECCION_REPRESENTANTE);
     }
     if(this.customerForm.value.TELEFONO_CLIENTE == ""){
      this.customerForm.controls["TELEFONO_CLIENTE"].setValue(this.customerForm.value.TELEFONO_REPRESENTANTE);
     }
     if(this.customerForm.value.CORREO_CLIENTE == ""){
      this.customerForm.controls["CORREO_CLIENTE"].setValue(this.customerForm.value.CORREO_REPRESENTANTE);
     }
  }
}
