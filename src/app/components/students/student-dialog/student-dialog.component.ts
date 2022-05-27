import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { StudentService } from 'src/app/services/student-service/student-service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnInit {

  customers: any = [];
  selectedCustomer!: string;
  estatus!: string;
  beca!: boolean;
  id_type = "V";
  studentForm!: FormGroup;
  actionBtn : string = "Guardar";
  id_for : any = 1;
  dialogTitle : string = "Formulario de Registro";
  filteredCustomers!: Observable<any[]>;
  customer: any = [];

  constructor(
    private formBuilder : FormBuilder,
    private _studentService: StudentService,
    private _customerService: CustomerService,
    private _loginService: LoginServiceService,
    private dialogRef : MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateData : any
    ) { }

  ngOnInit() {
    this.getCustomers();
    this.buildStudentForm();
    this.filterCustomerId();
  }

  filterCustomerId(){
    this.filteredCustomers = this.studentForm.controls["CEDULA_REPRESENTANTE"].valueChanges.pipe(
      startWith(''),
      map(customer => (customer ? this._filter(customer) : this.customers.slice())),
    );
  }

  buildStudentForm(){
    this.studentForm = this.formBuilder.group({
      NOMBRES_ALUMNO : ["", Validators.required],
      APELLIDOS_ALUMNO : ["", [Validators.required]],
      GRADO_ALUMNO : ["", Validators.required],
      NIVEL_ALUMNO : [""],
      TIPO_ALUMNO : ["V"],
      CEDULA_ALUMNO : ["", [Validators.pattern('^[0-9]+$')]],
      SEXO_ALUMNO : [""],
      EDAD_ALUMNO : ["", [Validators.pattern('^[0-9]+$')]],
      BECA_ALUMNO : ["0"],
      DESC_ALUMNO : [0],
      INICIO_COBRO : ["1", [Validators.required]],
      FINAL_COBRO : ["12", [Validators.required]],
      ID_REPRESENTANTE : [null, /*Validators.required*/],
      TIPO_REPRESENTANTE : [""],
      CEDULA_REPRESENTANTE : ["", Validators.required],
      NOMBRES_REPRESENTANTE : ["", /*Validators.required*/],
      FECHA_REGISTRO : [new Date()],
      ESTATUS : ["0", [Validators.required]],
      FECHA_RETIRO : ["12", [Validators.required]],
      REGISTRADO_POR : [this._loginService.getUsername()]
    });
  }

  updatedData(){
    if(this.updateData){
      let customer = this.customers.find((e: { _id: string; }) => e._id == this.updateData.ID_REPRESENTANTE);
      this.dialogTitle = "Formulario de Actualización";
      this.actionBtn = "Actualizar";
      this.studentForm.controls["NOMBRES_ALUMNO"].setValue(this.updateData.NOMBRES_ALUMNO);
      this.studentForm.controls["APELLIDOS_ALUMNO"].setValue(this.updateData.APELLIDOS_ALUMNO);
      this.studentForm.controls["GRADO_ALUMNO"].setValue(this.updateData.GRADO_ALUMNO);
      this.studentForm.controls["NIVEL_ALUMNO"].setValue(this.updateData.NIVEL_ALUMNO);
      this.studentForm.controls["TIPO_ALUMNO"].setValue(this.updateData.TIPO_ALUMNO);
      this.studentForm.controls["CEDULA_ALUMNO"].setValue(this.updateData.CEDULA_ALUMNO);
      this.studentForm.controls["SEXO_ALUMNO"].setValue(this.updateData.SEXO_ALUMNO);
      this.studentForm.controls["EDAD_ALUMNO"].setValue(this.updateData.EDAD_ALUMNO);
      this.studentForm.controls["DESC_ALUMNO"].setValue(this.updateData.DESC_ALUMNO);
      this.studentForm.controls["INICIO_COBRO"].setValue(this.updateData.INICIO_COBRO.toString());
      this.studentForm.controls["FINAL_COBRO"].setValue(this.updateData.FINAL_COBRO.toString());
      this.studentForm.controls["FECHA_REGISTRO"].setValue(this.updateData.FECHA_REGISTRO);
      if(customer){
        this.studentForm.controls["CEDULA_REPRESENTANTE"].setValue(customer);
      }
      else {
        let noCustomer = {
          TIPO_REPRESENTANTE: "N",
          CEDULA_REPRESENTANTE: "No tiene representante asignado, favor asignar representante válido"
        }
        this.studentForm.controls["CEDULA_REPRESENTANTE"].setValue(noCustomer);
      }
      if(this.updateData.BECA_ALUMNO == false) {
        this.studentForm.controls["BECA_ALUMNO"].setValue("0");
      } else {
        this.studentForm.controls["BECA_ALUMNO"].setValue("1");
      }
      if(this.updateData.ESTATUS == true) {
        this.studentForm.controls["ESTATUS"].setValue("0");
      } else {
        this.studentForm.controls["ESTATUS"].setValue("1");
      }
      this.studentForm.controls["FECHA_RETIRO"].setValue(this.updateData.FECHA_RETIRO.toString());
      this.studentForm.controls["REGISTRADO_POR"].setValue(this.updateData.REGISTRADO_POR);
    }
  }

  addStudent(){
    this.setLevel();
    this.customer = this.studentForm.controls["CEDULA_REPRESENTANTE"].value;

    this.studentForm.controls["ID_REPRESENTANTE"].setValue(this.customer._id);

    if(this.studentForm.controls["BECA_ALUMNO"].value == "0") {
      this.studentForm.controls["BECA_ALUMNO"].setValue(false);
    } else {
      this.studentForm.controls["BECA_ALUMNO"].setValue(true);
    }
    if(this.studentForm.controls["ESTATUS"].value == "0") {
      this.studentForm.controls["ESTATUS"].setValue(true);
    } else {
      this.studentForm.controls["ESTATUS"].setValue(false);
    }
    if(!this.updateData){
      if(this.studentForm.valid){
        this._studentService.saveStudent(this.studentForm.value)
          .subscribe({
            next: () => {
              alert("Alumno creado correctamente.");
              this.studentForm.reset();
              this.dialogRef.close("save");
            },
            error: (err: any) => {
              console.log(err),
              alert("Error encontrado al crear alumno.")
            }
          })
      }
    } else {
      this.updateStudent();
    }
  }

  updateStudent(){
    if(this.studentForm.valid){
    this._studentService.updateStudent(this.updateData._id, this.studentForm.value)
      .subscribe({ 
        next: () => {
          alert("Alumno actualizado exitosamente.");
          this.studentForm.reset();
          this.dialogRef.close("update");
        },
        error: (err: any) => {
          console.log(err),
          console.log(this.studentForm.value),
          alert("Error encontrado al actualizar alumno.")
        }
      })
    }
  }

  getCustomers(){
    this._customerService.getCustomers().subscribe({
      next: (res) => {
        this.customers = res;
        this.customers.sort((a: any, b: any) => parseInt(a.CEDULA_REPRESENTANTE) - parseInt(b.CEDULA_REPRESENTANTE));
        setTimeout(() => {
          this.updatedData();
        });
      },
      error: (err: any) => {
        console.log(err),
        alert("No ha sido posible obtener los representantes.")
      }
    })
  }

  getOptionText(customer: { CEDULA_REPRESENTANTE: any; }) {
    if (!customer || null) {
      return '';
    }
    return customer.CEDULA_REPRESENTANTE;
  }

  _filter(value: string): string[] {
    const filterValue = value;
    return this.customers.filter((customer: any) => customer.CEDULA_REPRESENTANTE.toString().includes(filterValue));
  }

  setLevel(){
    if(this.studentForm.controls["GRADO_ALUMNO"].value == "Sala de 3" || this.studentForm.controls["GRADO_ALUMNO"].value == "Sala de 4" || this.studentForm.controls["GRADO_ALUMNO"].value == "Sala de 5"){
      this.studentForm.controls["NIVEL_ALUMNO"].setValue("Preescolar");
    }
    if(this.studentForm.controls["GRADO_ALUMNO"].value == "1er Grado" || this.studentForm.controls["GRADO_ALUMNO"].value == "2do Grado" || this.studentForm.controls["GRADO_ALUMNO"].value == "3er Grado" || this.studentForm.controls["GRADO_ALUMNO"].value == "4to Grado" || this.studentForm.controls["GRADO_ALUMNO"].value == "5to Grado" || this.studentForm.controls["GRADO_ALUMNO"].value == "6to Grado"){
      this.studentForm.controls["NIVEL_ALUMNO"].setValue("Básica");
    }
    if(this.studentForm.controls["GRADO_ALUMNO"].value == "1er Año" || this.studentForm.controls["GRADO_ALUMNO"].value == "2do Año" || this.studentForm.controls["GRADO_ALUMNO"].value == "3er Año" || this.studentForm.controls["GRADO_ALUMNO"].value == "4to Año" || this.studentForm.controls["GRADO_ALUMNO"].value == "5to Año"){
      this.studentForm.controls["NIVEL_ALUMNO"].setValue("Bachillerato");
    }

  }
}
