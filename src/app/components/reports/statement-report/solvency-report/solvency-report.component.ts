import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentListComponent } from '../student-list/student-list.component';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-solvency-report',
  templateUrl: './solvency-report.component.html',
  styleUrls: ['./solvency-report.component.scss']
})
export class SolvencyReportComponent implements OnInit {
  filterForm!: FormGroup;
  grade!: any;
  gradeList: any[] = [
    { value: 1, grade: "Sala de 3"},
    { value: 2, grade: "Sala de 4"},
    { value: 3, grade: "Sala de 5"},
    { value: 4, grade: "1er Grado"},
    { value: 5, grade: "2do Grado"},
    { value: 6, grade: "3er Grado"},
    { value: 7, grade: "4to Grado"},
    { value: 8, grade: "5to Grado"},
    { value: 19, grade: "6to Grado"}
    ]
    @ViewChild("print") print!: ElementRef;

  constructor(private formBuilder: FormBuilder, private studentList: StudentListComponent) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.filterForm = this.formBuilder.group({
      FILTRO: ['1', []],
      GRADO: [""],
      FORMATO: [ {value: "", disabled: true } ]
    });
  }

  filterData(){
    let solvencyValue = this.filterForm.controls["FILTRO"].value;
    let filteredStudents = this.studentList.students;
    let filteredGrades: any[] = this.gradeList;
    if(solvencyValue == 1){
      if(this.grade && this.grade.length > 0){
        for(let i = 0; i < this.grade.length; i++){
          filteredGrades = filteredGrades.filter(
          (x: { grade: any; }) => x.grade != this.grade[i].grade
          );
        }
        for(let i = 0; i < filteredGrades.length; i++){
          filteredStudents = filteredStudents.filter(
          (x: { GRADO_ALUMNO: any; } ) => x.GRADO_ALUMNO !== filteredGrades[i].grade
          );
        }
      }
      this.studentList.getDataSource(filteredStudents);
    } else if(solvencyValue == 2){
      filteredStudents = filteredStudents.filter(
        (x: { DEUDA_TOTAL: any }) => x.DEUDA_TOTAL <= 0
      );
      if(this.grade && this.grade.length > 0){
        for(let i = 0; i < this.grade.length; i++){
          filteredGrades = filteredGrades.filter(
          (x: { grade: any; }) => x.grade != this.grade[i].grade
          );
        }
        for(let i = 0; i < filteredGrades.length; i++){
          filteredStudents = filteredStudents.filter(
          (x: { GRADO_ALUMNO: any; } ) => x.GRADO_ALUMNO !== filteredGrades[i].grade
          );
        }
      }
      this.studentList.getDataSource(filteredStudents);
    } else if(solvencyValue == 3){
      filteredStudents = filteredStudents.filter(
        (x: { DEUDA_TOTAL: number }) => x.DEUDA_TOTAL > 0
      );
      console.log(filteredStudents)
      if(this.grade && this.grade.length > 0){
        for(let i = 0; i < this.grade.length; i++){
          filteredGrades = filteredGrades.filter(
          (x: { grade: any; }) => x.grade != this.grade[i].grade
          );
        }
        for(let i = 0; i < filteredGrades.length; i++){
          filteredStudents = filteredStudents.filter(
          (x: { GRADO_ALUMNO: any; } ) => x.GRADO_ALUMNO !== filteredGrades[i].grade
          );
        }
      }
      this.studentList.getDataSource(filteredStudents);
    }
  }

  back() {
    this.studentList.currentSection = 0;
    let principalBar = $("#principalBar");
    let solvencyBar = $("#solvencyBar");
    principalBar.removeClass("hide-section");
    solvencyBar.addClass("hide-section");
    let showIndividualColumns = $(".secondaryCol");
    showIndividualColumns.removeClass("hide-section");
    let table = $("#table-section");
    table.width("2800px");
    this.studentList.getStudents();
    this.studentList.sticky = true;
  }
}
