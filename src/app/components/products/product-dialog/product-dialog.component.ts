import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product-service/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  productForm!: FormGroup;
  actionBtn : string = "Guardar";
  id_for : any = 1;
  productScenario!: any;
  productType!: any;
  dialogTitle : string = "Formulario de Registro";

  constructor(
    private formBuilder : FormBuilder,
    private _productService: ProductService,
    private _loginService: LoginServiceService,
    private dialogRef : MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateData : any
    ) { }

  ngOnInit(): void {

    this.buildProductForm();
    if(this.updateData){
      this.dialogTitle = "Formulario de Actualización";
      this.actionBtn = "Actualizar";
      this.productForm.controls["CONCEPTO_PRODUCTO"].setValue(this.updateData.CONCEPTO_PRODUCTO);
      this.productForm.controls["PRECIO_PREESCOLAR"].setValue(this.updateData.PRECIO_PREESCOLAR);
      this.productForm.controls["PRECIO_BASICA"].setValue(this.updateData.PRECIO_BASICA);
      this.productForm.controls["ESCENARIO_PRODUCTO"].setValue(String(this.updateData.ESCENARIO_PRODUCTO));
      this.productForm.controls["TIPO_PRODUCTO"].setValue(this.updateData.TIPO_PRODUCTO);
      this.productForm.controls["DESCRIPCION_PRODUCTO"].setValue(this.updateData.DESCRIPCION_PRODUCTO);
      if(this.updateData.IVA_PRODUCTO == false){
        this.productForm.controls["IVA_PRODUCTO"].setValue("0");
      } else {
        this.productForm.controls["IVA_PRODUCTO"].setValue("1");
      }
      this.productForm.controls["ALICUOTA_IVA"].setValue(this.updateData.ALICUOTA_IVA);
      this.productForm.controls["PRONTO_PAGO_PREESCOLAR"].setValue(this.updateData.PRONTO_PAGO_PREESCOLAR);
      this.productForm.controls["PAGO_VENCIDO_PREESCOLAR"].setValue(this.updateData.PAGO_VENCIDO_PREESCOLAR);
      this.productForm.controls["PRONTO_PAGO_BASICA"].setValue(this.updateData.PRONTO_PAGO_BASICA);
      this.productForm.controls["PAGO_VENCIDO_BASICA"].setValue(this.updateData.PAGO_VENCIDO_BASICA);
      this.productForm.controls["FECHA_REGISTRO"].setValue(this.updateData.FECHA_REGISTRO);
      this.productForm.controls["REGISTRADO_POR"].setValue(this.updateData.REGISTRADO_POR);
    }
  }

  buildProductForm(){
    this.productForm = this.formBuilder.group({
      CONCEPTO_PRODUCTO : ["", Validators.required],
      PRECIO_PREESCOLAR : [0, [Validators.pattern('^[0-9]+$')]],
      PRECIO_BASICA : [0, [Validators.pattern('^[0-9]+$')]],
      ESCENARIO_PRODUCTO : [Validators.required],
      TIPO_PRODUCTO : ["Full", [Validators.required] ],
      DESCRIPCION_PRODUCTO : [""],
      IVA_PRODUCTO : ["0", Validators.required],
      ALICUOTA_IVA : [""],
      PRONTO_PAGO_PREESCOLAR : [0,Validators.required],
      PAGO_VENCIDO_PREESCOLAR : [0,Validators.required],
      PRONTO_PAGO_BASICA : [0,Validators.required],
      PAGO_VENCIDO_BASICA : [0,Validators.required],
      FECHA_REGISTRO : [new Date()],
      REGISTRADO_POR : [this._loginService.getUsername()]
    });
  }

  addProduct(){
    if(!this.updateData){
      if(this.productForm.valid){
        this._productService.saveProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              alert("Producto creado correctamente.");
              this.productForm.reset();
              this.dialogRef.close("save");
            },
            error: (err: any) => {
              console.log(err),
              alert("Error encontrado al crear producto.")
            }
          })
      }
    } else {
      this.editProduct();
    }
  }

  editProduct(){
    if(this.productForm.valid){
    this._productService.updateProduct(this.updateData._id, this.productForm.value)
      .subscribe({
        next: (res) => {
          alert("Producto actualizado exitosamente.");
          this.productForm.reset();
          this.dialogRef.close("update");
        },
        error: (err) => {
          console.log(err),
          alert("Error encontrado al actualizar producto.")
        }
      })
    }
  }

}
