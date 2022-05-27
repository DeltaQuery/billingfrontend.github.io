import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { MatSort } from '@angular/material/sort';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import {MatDialog } from '@angular/material/dialog';
import { ComponentTitleService } from 'src/app/services/component-title/component-title.service';

@Component({
  selector: 'app-customers', 
  templateUrl: './customers.component.html',
  styleUrls: ['../../css-files/global-one.css']
})
export class CustomersComponent implements OnInit {

  customers!: any;
  displayedColumns: string[] = ['cedula_representante', 'nombres_representante', 'direccion_representante', "telefono_representante", "correo_representante", "actions"];
  dataSource = new MatTableDataSource(this.customers); 
  searchKey!: any;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _customerService: CustomerService, private dialog : MatDialog,
    private _titleService: ComponentTitleService) { }

  ngOnInit() {
    this.getCustomers();  
    setTimeout(() => {
      this._titleService.titleName = "Representantes";
    });
  }

  //CREAR TABLA CON DATA DE REPRESENTANTES
  getCustomers(){
    this._customerService.getCustomers()
      .subscribe(
      { next: (res) => {
        this.customers = res;
        this.dataSource = new MatTableDataSource(this.customers); 
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

  //ACTUALIZAR REPRESENTANTE
  updateCustomer(row: any){
    this.dialog.open(CustomerDialogComponent, {
      width: "600px",
      data: row
    }).afterClosed().subscribe(val => {
      if(val === "update"){
        this.getCustomers();
      }
    })
  }

  //ELIMINAR REPRESENTANTE
  deleteCustomer(id: any){
    this._customerService.deleteCustomer(id)
      .subscribe({
        next: (res) => {
          alert("Representante eliminado exitosamente."),
          this.getCustomers()
        },
        error: (err) => {
          console.log(err),
          alert("Ocurrió un error que impidió eliminar al represenante.")
        }
      })
  }

  //ABRIR MODAL PARA CREAR REPRESENTANTE
  openDialog() {
    this.dialog.open(CustomerDialogComponent, {
      width: "600px"
    }).afterClosed().subscribe(val => {
      if(val === "save"){
        this.getCustomers();
      }
    })
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleanFilter(){
    this.searchKey = "";
    this.applyFilter();
  }
}
