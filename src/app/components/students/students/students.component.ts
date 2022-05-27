import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentService } from 'src/app/services/student-service/student-service';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { MatSort } from '@angular/material/sort';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ComponentTitleService } from 'src/app/services/component-title/component-title.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['../../css-files/global-one.css'],
})
export class StudentsComponent implements OnInit {
  students!: any;
  customers!: any;
  displayedColumns: string[] = [
    'grado_alumno',
    'nombres_alumno',
    'apellidos_alumno',
    'cedula_representante',
    'nombres_representante',
    "ESTATUS",
    'actions',
  ];
  dataSource = new MatTableDataSource(this.students);
  searchKey!: any;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _studentService: StudentService,
    private _customerService: CustomerService,
    private dialog: MatDialog,
    private _titleService: ComponentTitleService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    setTimeout(() => {
      this._titleService.titleName = "Alumnos";
    });
  }

  getStudents() {
    this._studentService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.getCustomers();
      },
      error: (err) => {
        console.log(<any>err);
      },
    });
  }

  getCustomers() {
    this._customerService.getCustomers().subscribe({
      next: (res) => {
        this.customers = res;
        this.addCustomerData();
      },
      error: (err) => {
        console.log(<any>err);
      },
    });
  }

  addCustomerData() {
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
    }
    this.addDataTable();
  }

  addDataTable() {
    this.dataSource = new MatTableDataSource(this.students);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  }
  //ACTUALIZAR REPRESENTANTE
  updateStudent(row: any) {
    this.dialog
      .open(StudentDialogComponent, {
        width: '600px',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getStudents();
        }
      });
  }

  //ELIMINAR REPRESENTANTE
  deleteStudent(id: any) {
    this._studentService.deleteStudent(id).subscribe({
      next: (res) => {
        alert('Alumno eliminado exitosamente.'), this.getStudents();
      },
      error: (err) => {
        console.log(err),
          alert('Ocurrió un error que impidió eliminar al alumno.');
      },
    });
  }

  //ABRIR MODAL PARA CREAR REPRESENTANTE
  openDialog() {
    this.dialog
      .open(StudentDialogComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getStudents();
        }
      });
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleanFilter() {
    this.searchKey = '';
    this.applyFilter();
  }
}
