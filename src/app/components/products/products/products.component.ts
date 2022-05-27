import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog } from '@angular/material/dialog';
import { ComponentTitleService } from 'src/app/services/component-title/component-title.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../../css-files/global-one.css']
})
export class ProductsComponent implements OnInit {

  products!: any;
  displayedColumns: string[] = [
    'concepto_producto', 
    'precio_preescolar', 
    'precio_basica', 
    "tipo_producto", 
    "escenario_producto", 
    "pronto_pago_preescolar", 
    "pago_vencido_preescolar", 
    "pronto_pago_basica", 
    "pago_vencido_basica", 
    "actions"];
  dataSource = new MatTableDataSource(this.products); 
  searchKey!: any;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  constructor(private _productService: ProductService, private dialog : MatDialog,
    private _titleService: ComponentTitleService) { }

  ngOnInit(): void {
    this.getProducts(); 
    setTimeout(() => {
      this._titleService.titleName = "Productos";
    });
  }

  //CREAR TABLA CON DATA DE PRODUCTOS
  getProducts(){
    this._productService.getProducts()
      .subscribe(
      { next: (res) => {
        this.products = res;
        this.products.sort(
          (a: any, b: any) =>
            parseInt(a.ESCENARIO_PRODUCTO) - parseInt(b.ESCENARIO_PRODUCTO)
        );
        this.dataSource = new MatTableDataSource(this.products); 
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
   updateProduct(row: any){
    this.dialog.open(ProductDialogComponent, {
      width: "600px",
      data: row,
    }).afterClosed().subscribe(val => {
      if(val === "update"){
        this.getProducts();
      }
    })
  }

   //ELIMINAR REPRESENTANTE
   deleteProduct(id: any){
    this._productService.deleteProduct(id)
      .subscribe({
        next: (res) => {
          alert("Producto eliminado exitosamente."),
          this.getProducts()
        },
        error: (err) => {
          console.log(err),
          alert("Ocurrió un error que impidió eliminar al producto.")
        }
      })
  }

  //ABRIR MODAL PARA CREAR REPRESENTANTE
  openDialog() {
    this.dialog.open(ProductDialogComponent, {
      width: "600px"
    }).afterClosed().subscribe(val => {
      if(val === "save"){
        this.getProducts();
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
