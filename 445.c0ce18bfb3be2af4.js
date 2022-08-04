"use strict";(self.webpackChunkschool_billing=self.webpackChunkschool_billing||[]).push([[445],{5445:(E,h,n)=>{n.r(h),n.d(h,{ProductsModule:()=>nt});var m=n(9808),P=n(520),l=n(4999),p=n(7322),s=n(7531),C=n(4847),u=n(9062),O=n(5245),i=n(3075),A=n(7423),_=n(8966),T=n(4107),I=n(9270),Z=n(6696),t=n(5e3),f=n(3639),D=n(1423),U=n(508);let R=(()=>{class e{constructor(o,r,c,d,g){this.formBuilder=o,this._productService=r,this._loginService=c,this.dialogRef=d,this.updateData=g,this.actionBtn="Guardar",this.id_for=1,this.dialogTitle="Formulario de Registro"}ngOnInit(){this.buildProductForm(),this.updateData&&(this.dialogTitle="Formulario de Actualizaci\xf3n",this.actionBtn="Actualizar",this.productForm.controls.CONCEPTO_PRODUCTO.setValue(this.updateData.CONCEPTO_PRODUCTO),this.productForm.controls.PRECIO_PREESCOLAR.setValue(this.updateData.PRECIO_PREESCOLAR),this.productForm.controls.PRECIO_BASICA.setValue(this.updateData.PRECIO_BASICA),this.productForm.controls.ESCENARIO_PRODUCTO.setValue(String(this.updateData.ESCENARIO_PRODUCTO)),this.productForm.controls.TIPO_PRODUCTO.setValue(this.updateData.TIPO_PRODUCTO),this.productForm.controls.DESCRIPCION_PRODUCTO.setValue(this.updateData.DESCRIPCION_PRODUCTO),this.productForm.controls.IVA_PRODUCTO.setValue(0==this.updateData.IVA_PRODUCTO?"0":"1"),this.productForm.controls.ALICUOTA_IVA.setValue(this.updateData.ALICUOTA_IVA),this.productForm.controls.PRONTO_PAGO_PREESCOLAR.setValue(this.updateData.PRONTO_PAGO_PREESCOLAR),this.productForm.controls.PAGO_VENCIDO_PREESCOLAR.setValue(this.updateData.PAGO_VENCIDO_PREESCOLAR),this.productForm.controls.PRONTO_PAGO_BASICA.setValue(this.updateData.PRONTO_PAGO_BASICA),this.productForm.controls.PAGO_VENCIDO_BASICA.setValue(this.updateData.PAGO_VENCIDO_BASICA),this.productForm.controls.FECHA_REGISTRO.setValue(this.updateData.FECHA_REGISTRO),this.productForm.controls.REGISTRADO_POR.setValue(this.updateData.REGISTRADO_POR))}buildProductForm(){this.productForm=this.formBuilder.group({CONCEPTO_PRODUCTO:["",i.kI.required],PRECIO_PREESCOLAR:[0,[i.kI.pattern("^[0-9]+$")]],PRECIO_BASICA:[0,[i.kI.pattern("^[0-9]+$")]],ESCENARIO_PRODUCTO:[i.kI.required],TIPO_PRODUCTO:["Full",[i.kI.required]],DESCRIPCION_PRODUCTO:[""],IVA_PRODUCTO:["0",i.kI.required],ALICUOTA_IVA:[""],PRONTO_PAGO_PREESCOLAR:[0,i.kI.required],PAGO_VENCIDO_PREESCOLAR:[0,i.kI.required],PRONTO_PAGO_BASICA:[0,i.kI.required],PAGO_VENCIDO_BASICA:[0,i.kI.required],FECHA_REGISTRO:[new Date],REGISTRADO_POR:[this._loginService.getUsername()]})}addProduct(){this.updateData?this.editProduct():this.productForm.valid&&this._productService.saveProduct(this.productForm.value).subscribe({next:o=>{alert("Producto creado correctamente."),this.productForm.reset(),this.dialogRef.close("save")},error:o=>{console.log(o),alert("Error encontrado al crear producto.")}})}editProduct(){this.productForm.valid&&this._productService.updateProduct(this.updateData._id,this.productForm.value).subscribe({next:o=>{alert("Producto actualizado exitosamente."),this.productForm.reset(),this.dialogRef.close("update")},error:o=>{console.log(o),alert("Error encontrado al actualizar producto.")}})}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(i.qu),t.Y36(f.M),t.Y36(D.N),t.Y36(_.so),t.Y36(_.WI))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-product-dialog"]],decls:105,vars:7,consts:[["mat-dialog-title",""],[3,"formGroup"],["mat-dialog-content",""],[1,"d-flex"],["appearance","outline"],["formControlName","CONCEPTO_PRODUCTO","matInput","","placeholder","Concepto del producto"],["formControlName","PRECIO_PREESCOLAR","matInput","","placeholder","Precio de Preescolar"],["formControlName","PRECIO_BASICA","matInput","","placeholder","Precio de B\xe1sica"],["formControlName","PRONTO_PAGO_PREESCOLAR","matInput","","placeholder","Introduce el monto de la mensualidad a pagar en caso de pronto pago."],["formControlName","PAGO_VENCIDO_PREESCOLAR","matInput","","placeholder","Introduce el monto de la mensualidad a pagar en caso de penalizaci\xf3n por retraso."],["formControlName","PRONTO_PAGO_BASICA","matInput","","placeholder","Introduce el monto de la mensualidad a pagar en caso de pronto pago."],["formControlName","PAGO_VENCIDO_BASICA","matInput","","placeholder","Introduce el monto de la mensualidad a pagar en caso de penalizaci\xf3n por retraso."],["formControlName","ESCENARIO_PRODUCTO",3,"value","valueChange"],["value","0"],["value","1"],["value","2"],["value","3"],["value","4"],["value","5"],["value","6"],["value","7"],["value","8"],["value","9"],["value","10"],["value","11"],["value","12"],["formControlName","TIPO_PRODUCTO",3,"value","valueChange"],["value","Full"],["value","Abono"],["value","Complemento"],["value","No-aplica"],["formControlName","DESCRIPCION_PRODUCTO","matInput","","placeholder","Descripci\xf3n del producto"],["formControlName","IVA_PRODUCTO"],["formControlName","ALICUOTA_IVA","matInput","","placeholder","Al\xedcuota de IVA"],["mat-dialog-action","",1,"mt-2",3,"align"],["mat-raised-button","","color","warn","mat-dialog-close","",1,"me-2"],["mat-raised-button","","color","primary",1,"",3,"disabled","click"]],template:function(o,r){1&o&&(t.TgZ(0,"h1",0),t._uU(1),t.qZA(),t._UZ(2,"hr"),t.TgZ(3,"form",1),t.TgZ(4,"div",2),t.TgZ(5,"h2"),t._uU(6,"Informaci\xf3n del Producto"),t.qZA(),t.TgZ(7,"div",3),t.TgZ(8,"mat-form-field",4),t.TgZ(9,"mat-label"),t._uU(10,"Concepto"),t.qZA(),t._UZ(11,"input",5),t.qZA(),t.qZA(),t.TgZ(12,"mat-form-field",4),t.TgZ(13,"mat-label"),t._uU(14,"Precio - Preescolar"),t.qZA(),t._UZ(15,"input",6),t.qZA(),t.TgZ(16,"mat-form-field",4),t.TgZ(17,"mat-label"),t._uU(18,"Precio - B\xe1sica"),t.qZA(),t._UZ(19,"input",7),t.qZA(),t.TgZ(20,"div",3),t.TgZ(21,"mat-form-field",4),t.TgZ(22,"mat-label"),t._uU(23,"Prontopago Preescolar"),t.qZA(),t._UZ(24,"input",8),t.qZA(),t.TgZ(25,"mat-form-field",4),t.TgZ(26,"mat-label"),t._uU(27,"Pago vencido Preescolar"),t.qZA(),t._UZ(28,"input",9),t.qZA(),t.qZA(),t.TgZ(29,"div",3),t.TgZ(30,"mat-form-field",4),t.TgZ(31,"mat-label"),t._uU(32,"Prontopago B\xe1sica"),t.qZA(),t._UZ(33,"input",10),t.qZA(),t.TgZ(34,"mat-form-field",4),t.TgZ(35,"mat-label"),t._uU(36,"Pago vencido B\xe1sica"),t.qZA(),t._UZ(37,"input",11),t.qZA(),t.qZA(),t.TgZ(38,"mat-form-field",4),t.TgZ(39,"mat-label"),t._uU(40,"Escenario"),t.qZA(),t.TgZ(41,"mat-select",12),t.NdJ("valueChange",function(d){return r.productScenario=d}),t.TgZ(42,"mat-option",13),t._uU(43,"0"),t.qZA(),t.TgZ(44,"mat-option",14),t._uU(45,"1"),t.qZA(),t.TgZ(46,"mat-option",15),t._uU(47,"2"),t.qZA(),t.TgZ(48,"mat-option",16),t._uU(49,"3"),t.qZA(),t.TgZ(50,"mat-option",17),t._uU(51,"4"),t.qZA(),t.TgZ(52,"mat-option",18),t._uU(53,"5"),t.qZA(),t.TgZ(54,"mat-option",19),t._uU(55,"6"),t.qZA(),t.TgZ(56,"mat-option",20),t._uU(57,"7"),t.qZA(),t.TgZ(58,"mat-option",21),t._uU(59,"8"),t.qZA(),t.TgZ(60,"mat-option",22),t._uU(61,"9"),t.qZA(),t.TgZ(62,"mat-option",23),t._uU(63,"10"),t.qZA(),t.TgZ(64,"mat-option",24),t._uU(65,"11"),t.qZA(),t.TgZ(66,"mat-option",25),t._uU(67,"12"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(68,"mat-form-field",4),t.TgZ(69,"mat-label"),t._uU(70,"Tipo"),t.qZA(),t.TgZ(71,"mat-select",26),t.NdJ("valueChange",function(d){return r.productType=d}),t.TgZ(72,"mat-option",27),t._uU(73,"Full"),t.qZA(),t.TgZ(74,"mat-option",28),t._uU(75,"Abono"),t.qZA(),t.TgZ(76,"mat-option",29),t._uU(77,"Complemento"),t.qZA(),t.TgZ(78,"mat-option",30),t._uU(79,"No aplica"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(80,"mat-form-field",4),t.TgZ(81,"mat-label"),t._uU(82,"Descripci\xf3n"),t.qZA(),t._UZ(83,"input",31),t.qZA(),t.TgZ(84,"mat-form-field",4),t.TgZ(85,"mat-label"),t._uU(86,"IVA"),t.qZA(),t.TgZ(87,"mat-select",32),t.TgZ(88,"mat-option",13),t._uU(89,"No aplica"),t.qZA(),t.TgZ(90,"mat-option",14),t._uU(91,"Aplica"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(92,"mat-form-field",4),t.TgZ(93,"mat-label"),t._uU(94,"Al\xedcuota de IVA"),t.qZA(),t._UZ(95,"input",33),t.qZA(),t.qZA(),t.qZA(),t.TgZ(96,"div",34),t.TgZ(97,"button",35),t.TgZ(98,"mat-icon"),t._uU(99,"close"),t.qZA(),t._uU(100," Cerrar"),t.qZA(),t.TgZ(101,"button",36),t.NdJ("click",function(){return r.addProduct()}),t.TgZ(102,"mat-icon"),t._uU(103,"save"),t.qZA(),t._uU(104),t.qZA(),t.qZA()),2&o&&(t.xp6(1),t.hij(" ",r.dialogTitle," "),t.xp6(2),t.Q6J("formGroup",r.productForm),t.xp6(38),t.Q6J("value",r.productScenario),t.xp6(30),t.Q6J("value",r.productType),t.xp6(25),t.Q6J("align","end"),t.xp6(5),t.Q6J("disabled",!r.productForm.valid),t.xp6(3),t.hij(" ",r.actionBtn," "))},directives:[_.uh,i._Y,i.JL,i.sg,_.xY,p.KE,p.hX,i.Fj,s.Nt,i.JJ,i.u,T.gD,U.ey,A.lW,_.ZT,O.Hw],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}.typeField[_ngcontent-%COMP%]{width:20%}.idField[_ngcontent-%COMP%]{width:80%}button[_ngcontent-%COMP%]{height:50px}"]}),e})();var v=n(7125),N=n(4973);function S(e,a){if(1&e){const o=t.EpF();t.TgZ(0,"button",34),t.NdJ("click",function(){return t.CHM(o),t.oxw().cleanFilter()}),t.TgZ(1,"mat-icon"),t._uU(2,"close"),t.qZA(),t.qZA()}}function q(e,a){1&e&&(t.TgZ(0,"th",35),t._uU(1," Concepto "),t.qZA())}function x(e,a){if(1&e&&(t.TgZ(0,"td",36),t._uU(1),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.hij(" ",o.CONCEPTO_PRODUCTO," ")}}function b(e,a){1&e&&(t.TgZ(0,"th",37),t._uU(1," Precio - Preescolar "),t.qZA())}function F(e,a){if(1&e&&(t.TgZ(0,"td",36),t._uU(1),t.ALo(2,"currency"),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,o.PRECIO_PREESCOLAR)," ")}}function B(e,a){1&e&&(t.TgZ(0,"th",38),t._uU(1," Precio - B\xe1sica "),t.qZA())}function y(e,a){if(1&e&&(t.TgZ(0,"td",36),t._uU(1),t.ALo(2,"currency"),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,o.PRECIO_BASICA)," ")}}function G(e,a){1&e&&(t.TgZ(0,"th",39),t._uU(1," Tipo de Producto "),t.qZA())}function V(e,a){if(1&e&&(t.TgZ(0,"td",36),t._uU(1),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.hij(" ",o.TIPO_PRODUCTO," ")}}function L(e,a){1&e&&(t.TgZ(0,"th",40),t._uU(1," Escenario "),t.qZA())}function M(e,a){if(1&e&&(t.TgZ(0,"td",36),t._uU(1),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.hij(" ",o.ESCENARIO_PRODUCTO," ")}}function Y(e,a){1&e&&(t.TgZ(0,"th",41),t._uU(1,"PP Prees."),t.qZA())}function J(e,a){if(1&e&&(t.TgZ(0,"td",36),t._uU(1),t.ALo(2,"currency"),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,o.PRONTO_PAGO_PREESCOLAR)," ")}}function H(e,a){1&e&&(t.TgZ(0,"th",42),t._uU(1," Vencido Prees."),t.qZA())}function Q(e,a){if(1&e&&(t.TgZ(0,"td",36),t._uU(1),t.ALo(2,"currency"),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,o.PAGO_VENCIDO_PREESCOLAR)," ")}}function k(e,a){1&e&&(t.TgZ(0,"th",43),t._uU(1,"PP B\xe1sica"),t.qZA())}function $(e,a){if(1&e&&(t.TgZ(0,"td",36),t._uU(1),t.ALo(2,"currency"),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,o.PRONTO_PAGO_BASICA)," ")}}function j(e,a){1&e&&(t.TgZ(0,"th",44),t._uU(1," Vencido B\xe1sica"),t.qZA())}function w(e,a){if(1&e&&(t.TgZ(0,"td",36),t._uU(1),t.ALo(2,"currency"),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,o.PAGO_VENCIDO_BASICA)," ")}}function z(e,a){1&e&&(t.TgZ(0,"th",45),t._uU(1," Acciones "),t.qZA())}function K(e,a){1&e&&t._UZ(0,"mat-header-cell")}function W(e,a){if(1&e){const o=t.EpF();t.TgZ(0,"td",36),t.TgZ(1,"button",46),t.NdJ("click",function(){const d=t.CHM(o).$implicit;return t.oxw().updateProduct(d)}),t.TgZ(2,"mat-icon"),t._uU(3,"launch"),t.qZA(),t.qZA(),t.TgZ(4,"button",47),t.NdJ("click",function(){const d=t.CHM(o).$implicit;return t.oxw().deleteProduct(d._id)}),t.TgZ(5,"mat-icon"),t._uU(6,"delete_outline"),t.qZA(),t.qZA(),t.qZA()}}function X(e,a){1&e&&t._UZ(0,"tr",48)}function tt(e,a){1&e&&t._UZ(0,"tr",49)}const et=function(){return[8,16,24,32,1e4]},ot=[{path:"",children:[{path:"",component:(()=>{class e{constructor(o,r,c){this._productService=o,this.dialog=r,this._titleService=c,this.displayedColumns=["concepto_producto","precio_preescolar","precio_basica","tipo_producto","escenario_producto","pronto_pago_preescolar","pago_vencido_preescolar","pronto_pago_basica","pago_vencido_basica","actions"],this.dataSource=new l.by(this.products)}ngOnInit(){this.getProducts(),setTimeout(()=>{this._titleService.titleName="Productos"})}getProducts(){this._productService.getProducts().subscribe({next:o=>{this.products=o,this.products.sort((r,c)=>parseInt(r.ESCENARIO_PRODUCTO)-parseInt(c.ESCENARIO_PRODUCTO)),this.dataSource=new l.by(this.products),setTimeout(()=>{this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort})},error:o=>{console.log(o)}})}updateProduct(o){this.dialog.open(R,{width:"600px",data:o}).afterClosed().subscribe(r=>{"update"===r&&this.getProducts()})}deleteProduct(o){this._productService.deleteProduct(o).subscribe({next:r=>{alert("Producto eliminado exitosamente."),this.getProducts()},error:r=>{console.log(r),alert("Ocurri\xf3 un error que impidi\xf3 eliminar al producto.")}})}openDialog(){this.dialog.open(R,{width:"600px"}).afterClosed().subscribe(o=>{"save"===o&&this.getProducts()})}applyFilter(){this.dataSource.filter=this.searchKey.trim().toLowerCase()}cleanFilter(){this.searchKey="",this.applyFilter()}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(f.M),t.Y36(_.uw),t.Y36(v.Z))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-products"]],viewQuery:function(o,r){if(1&o&&(t.Gf(C.YE,5),t.Gf(u.NW,5)),2&o){let c;t.iGM(c=t.CRH())&&(r.sort=c.first),t.iGM(c=t.CRH())&&(r.paginator=c.first)}},decls:48,vars:8,consts:[["id","principalBar",1,"container-fluid","d-flex","justify-content-between"],[1,"d-flex"],["mat-raised-button","",1,"create-btn",3,"click"],["appearance","fill","floatLabel","never",1,"search-form-field","me-4"],["matInput","","type","text",3,"ngModel","keyup","ngModelChange"],["matSuffix","","mat-icon-button","","aria-label","Limpiar",3,"click",4,"ngIf"],["id","action-buttons"],[1,"action-button"],["mat-table","","matSort","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","concepto_producto"],["mat-header-cell","","mat-sort-header","CONCEPTO_PRODUCTO",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","precio_preescolar"],["mat-header-cell","","mat-sort-header","PRECIO_PREESCOLAR",4,"matHeaderCellDef"],["matColumnDef","precio_basica"],["mat-header-cell","","mat-sort-header","PRECIO_BASICA",4,"matHeaderCellDef"],["matColumnDef","tipo_producto"],["mat-header-cell","","mat-sort-header","TIPO_PRODUCTO",4,"matHeaderCellDef"],["matColumnDef","escenario_producto"],["mat-header-cell","","mat-sort-header","ESCENARIO_PRODUCTO",4,"matHeaderCellDef"],["matColumnDef","pronto_pago_preescolar"],["mat-header-cell","","mat-sort-header","PRONTO_PAGO_PREESCOLAR",4,"matHeaderCellDef"],["matColumnDef","pago_vencido_preescolar"],["mat-header-cell","","mat-sort-header","PAGO_VENCIDO_PREESCOLAR",4,"matHeaderCellDef"],["matColumnDef","pronto_pago_basica"],["mat-header-cell","","mat-sort-header","PRONTO_PAGO_BASICA",4,"matHeaderCellDef"],["matColumnDef","pago_vencido_basica"],["mat-header-cell","","mat-sort-header","PAGO_VENCIDO_BASICA",4,"matHeaderCellDef"],["matColumnDef","actions"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],[4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",3,"pageSizeOptions","pageSize"],["matSuffix","","mat-icon-button","","aria-label","Limpiar",3,"click"],["mat-header-cell","","mat-sort-header","CONCEPTO_PRODUCTO"],["mat-cell",""],["mat-header-cell","","mat-sort-header","PRECIO_PREESCOLAR"],["mat-header-cell","","mat-sort-header","PRECIO_BASICA"],["mat-header-cell","","mat-sort-header","TIPO_PRODUCTO"],["mat-header-cell","","mat-sort-header","ESCENARIO_PRODUCTO"],["mat-header-cell","","mat-sort-header","PRONTO_PAGO_PREESCOLAR"],["mat-header-cell","","mat-sort-header","PAGO_VENCIDO_PREESCOLAR"],["mat-header-cell","","mat-sort-header","PRONTO_PAGO_BASICA"],["mat-header-cell","","mat-sort-header","PAGO_VENCIDO_BASICA"],["mat-header-cell","","mat-sort-header",""],["mat-icon-button","",3,"click"],["mat-icon-button","","color","warn",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(o,r){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"button",2),t.NdJ("click",function(){return r.openDialog()}),t.TgZ(3,"mat-icon"),t._uU(4,"add"),t.qZA(),t._uU(5,"Nuevo "),t.qZA(),t.TgZ(6,"mat-form-field",3),t.TgZ(7,"mat-label"),t._uU(8,"Filtrar"),t.qZA(),t.TgZ(9,"input",4),t.NdJ("keyup",function(){return r.applyFilter()})("ngModelChange",function(d){return r.searchKey=d}),t.qZA(),t.YNc(10,S,3,0,"button",5),t.qZA(),t.qZA(),t.TgZ(11,"div",6),t._UZ(12,"app-return-button",7),t.qZA(),t.qZA(),t.TgZ(13,"table",8),t.ynx(14,9),t.YNc(15,q,2,0,"th",10),t.YNc(16,x,2,1,"td",11),t.BQk(),t.ynx(17,12),t.YNc(18,b,2,0,"th",13),t.YNc(19,F,3,3,"td",11),t.BQk(),t.ynx(20,14),t.YNc(21,B,2,0,"th",15),t.YNc(22,y,3,3,"td",11),t.BQk(),t.ynx(23,16),t.YNc(24,G,2,0,"th",17),t.YNc(25,V,2,1,"td",11),t.BQk(),t.ynx(26,18),t.YNc(27,L,2,0,"th",19),t.YNc(28,M,2,1,"td",11),t.BQk(),t.ynx(29,20),t.YNc(30,Y,2,0,"th",21),t.YNc(31,J,3,3,"td",11),t.BQk(),t.ynx(32,22),t.YNc(33,H,2,0,"th",23),t.YNc(34,Q,3,3,"td",11),t.BQk(),t.ynx(35,24),t.YNc(36,k,2,0,"th",25),t.YNc(37,$,3,3,"td",11),t.BQk(),t.ynx(38,26),t.YNc(39,j,2,0,"th",27),t.YNc(40,w,3,3,"td",11),t.BQk(),t.ynx(41,28),t.YNc(42,z,2,0,"th",29),t.YNc(43,K,1,0,"mat-header-cell",30),t.YNc(44,W,7,0,"td",11),t.BQk(),t.YNc(45,X,1,0,"tr",31),t.YNc(46,tt,1,0,"tr",32),t.qZA(),t._UZ(47,"mat-paginator",33)),2&o&&(t.xp6(9),t.Q6J("ngModel",r.searchKey),t.xp6(1),t.Q6J("ngIf",r.searchKey),t.xp6(3),t.Q6J("dataSource",r.dataSource),t.xp6(32),t.Q6J("matHeaderRowDef",r.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",r.displayedColumns),t.xp6(1),t.Q6J("pageSizeOptions",t.DdM(7,et))("pageSize",8))},directives:[A.lW,O.Hw,p.KE,p.hX,s.Nt,i.Fj,i.JJ,i.On,m.O5,p.R9,N.c,l.BZ,C.YE,l.w1,l.fO,l.ge,C.nU,l.Dz,l.ev,l.as,l.XQ,l.nj,l.Gk,u.NW],pipes:[m.H9],styles:["#principalBar[_ngcontent-%COMP%]{margin-top:2px;margin-bottom:1px}button[_ngcontent-%COMP%]{height:50px;margin-top:.3em!important}mat-form-field[_ngcontent-%COMP%]{width:200px;margin-top:.3em!important}#action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .action-button[_ngcontent-%COMP%]{margin-top:.3em!important;height:50px;margin-left:20px}#action-buttons[_ngcontent-%COMP%]{margin-top:4px}table[_ngcontent-%COMP%]{width:100%}"]}),e})()},{path:"**",redirectTo:"productos"}]}];let at=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[Z.Bz.forChild(ot)],Z.Bz]}),e})();var rt=n(8413);let nt=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[{provide:P.TP,useClass:rt.W,multi:!0}],imports:[[m.ez,at,l.p0,p.lN,s.c,C.JX,u.TU,O.Ps,i.u5,A.ot,P.JF,_.Is,T.LD,i.UX,I.I]]}),e})()},3639:(E,h,n)=>{n.d(h,{M:()=>p});var m=n(7886),P=n(5e3),l=n(520);let p=(()=>{class s{constructor(u){this.http=u}getProducts(){return this.http.get(`${m.G}/products`)}getProduct(u){return this.http.get(`${m.G}/products/${u}`)}saveProduct(u){return this.http.post(`${m.G}/products`,u)}deleteProduct(u){return this.http.delete(`${m.G}/products/${u}`)}updateProduct(u,O){return this.http.patch(`${m.G}/products/${u}`,O)}}return s.\u0275fac=function(u){return new(u||s)(P.LFG(l.eN))},s.\u0275prov=P.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()}}]);