import { StudentListComponent } from '../statement-report/student-list/student-list.component';
import { BillingNoticeComponent } from '../statement-report/billing-notice/billing-notice.component';
import { SolvencyReportComponent } from '../statement-report/solvency-report/solvency-report.component';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-print-report-button',
  templateUrl: './print-report-button.component.html',
  styleUrls: ['./print-report-button.component.scss']
})
export class PrintReportButtonComponent implements OnInit {

  constructor(private studentList: StudentListComponent, private billingNotice: BillingNoticeComponent, private solvencyReport: SolvencyReportComponent) { }

  ngOnInit(): void {
  }

  triggerPrint() {
    if (this.studentList.currentSection == 0) {
      this.studentList.triggerPrint();
    } else if (this.studentList.currentSection == 1) {
      this.billingNotice.triggerPrint();
    } else if (this.studentList.currentSection == 2) {
      this.studentList.triggerPrint();
    }
  }

}
