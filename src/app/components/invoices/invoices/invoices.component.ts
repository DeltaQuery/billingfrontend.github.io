import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice-service/invoice-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewInvoiceComponent } from '../../../shared-module/view-invoice/view-invoice.component';
import { ComponentTitleService } from 'src/app/services/component-title/component-title.service';
declare var $: any;

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class InvoicesComponent implements OnInit {

  @ViewChild("print") print!: ElementRef;
  invoices!: any;
  filteredInvoices!: any;
  displayedColumns: string[] = [
    'CODIGO_FACTURA',
    'FECHA_REGISTRO',
    'ID_CLIENTE',
    "NOMBRES_CLIENTE",
    "TELEFONO_CLIENTE",
    "GRADO_ALUMNO",
    "NOMBRES_ALUMNO",
    "CONCEPTO_TOTAL",
    "CREDITO_CONTADO",
    "TIPO_TRANSACCION",
    "NO_TRANSACCION",
    "BANCO",
    "EFECTIVO",
    "TOTAL_BS",
    "TOTAL_USD",
    "ESTATUS",
    "actions"];
  dataSource = new MatTableDataSource(this.invoices);
  searchKey!: any;
  expandedElement!: Invoice | null;
  currentSection: number = 0;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _invoiceService: InvoiceService, private dialog: MatDialog,
    private _titleService: ComponentTitleService) { }

  ngOnInit(): void {
    this.getInvoices();
    setTimeout(() => {
      this._titleService.titleName = "Facturación";
    });
  }

  //CREAR TABLA CON DATA DE PRODUCTOS
  getInvoices() {
    this._invoiceService.getInvoices()
      .subscribe(
        {
          next: (res) => {
            this.invoices = res;
            this.dataSource = new MatTableDataSource(this.invoices);  
            setTimeout(() => {
              this.hideOnInit();
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
          },
          error: (err: any) => {
            console.log(<any>err),
            alert("Error encontrado al cargar facturas.")
          }
        }
      );
  }

  getDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    setTimeout(() => {
      if (this.currentSection === 1) {
        this.individualColumns();
      } else if (this.currentSection === 2) {
        this.filterColumns();
      } else if (this.currentSection === 3) {
        this.hideOnInit();
      } 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  //ANULA FACTURA
  removeInvoice(row: any) {
    let updatedInvoice: Invoice = row;
    updatedInvoice.ESTATUS = !updatedInvoice.ESTATUS;

    this._invoiceService.updateInvoice(row._id, updatedInvoice)
      .subscribe({
        next: (res) => {
          alert("Factura anulada exitosamente.");
          this.getInvoices();
        },
        error: (err: any) => {
          console.log(err),
            alert("Error encontrado al anular factura.")
        }
      })
  }

  viewInvoice(row: any) {
    this._invoiceService.setPrintDecision(false);
    this.dialog.open(ViewInvoiceComponent, {
      width: "780px",
      data: row
    }).afterClosed().subscribe(val => {
    })
  }

  printInvoice(row: any) {
    this._invoiceService.setPrintDecision(true);
    this.dialog.open(ViewInvoiceComponent, {
      width: "780px",
      data: row
    }).afterClosed().subscribe(val => {
    })
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
    this.hideOnInit();
  }

  cleanFilter() {
    this.searchKey = "";
    this.applyFilter();
  }

  triggerPrint() {
    this.print.nativeElement.click();
  }

  individualButton() {
    this.currentSection = 1;
    let principalBar = $("#principalBar");
    let individualBar = $("#individualBar");
    principalBar.addClass("hide-section");
    individualBar.removeClass("hide-section");
    this.individualColumns();
  }

  filterButton() {
    this.currentSection = 2;
    let principalBar = $("#principalBar");
    let filterBar = $("#filterBar");
    principalBar.addClass("hide-section");
    filterBar.removeClass("hide-section");
    this.filterColumns();
  }

  rangeButton() {
    this.currentSection = 3;
    let principalBar = $("#principalBar");
    let rangeBar = $("#rangeBar");
    principalBar.addClass("hide-section");
    rangeBar.removeClass("hide-section");
  }

  individualColumns(){
    let hideIndividualColumns = $(".idClienteCol, .nombresClienteCol, .telefonoClienteCol");
    let showIndividualColumns = $(".modalidadCol, .tipoCol, .bancoCol, .efectivoCol, .noTransaccionCol");
    hideIndividualColumns.addClass("hide-section");
    showIndividualColumns.removeClass("hide-section");
  }

  filterColumns(){
    let hideFilterColumns = $(".telefonoClienteCol, .totalBsCol, .tipoCol, .bancoCol, .noTransaccionCol");
    let showFilterColumns = $(".modalidadCol, .efectivoCol");
    showFilterColumns.removeClass("hide-section");
    hideFilterColumns.addClass("hide-section");
  }
  
  hideOnInit() {
    let hideColumns = $(".modalidadCol, .tipoCol, .bancoCol, .efectivoCol, .noTransaccionCol");
    hideColumns.addClass("hide-section");
  }

  getPageDetails(event:any) {
    setTimeout(() => {
      if (this.currentSection === 1) {
        this.individualColumns();
      } else if (this.currentSection === 2) {
        this.filterColumns();
      } else if (this.currentSection === 3) {
        this.hideOnInit();
      } else {
        this.hideOnInit();
      }
    })
  }
}
