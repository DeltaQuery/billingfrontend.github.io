import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingNoticeComponent } from './statement-report/billing-notice/billing-notice.component';
import { StudentListComponent } from './statement-report/student-list/student-list.component';

const routes: Routes = [
  { path: "", 
  children: [
      { path: "", component: StudentListComponent },
      { path: "registro-alumnos", component: StudentListComponent },
      { path: "constancias", component: BillingNoticeComponent },
      { path: "**", redirectTo: "reportes" }
  ] }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { } 
