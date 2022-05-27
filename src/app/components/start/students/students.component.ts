import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student-service/student-service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  
  students!: any;
  activeStudents: number = 0;
  retiredStudents!: number;
  scholarStudents!: number;
  semiScholarStudents!: number;

  constructor(private _studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this._studentService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
        let retiredStudents = this.students.filter((student: any) => student.ESTATUS == false);
        let activeStudents = this.students.filter((student: any) => student.ESTATUS == true);
        let scholarStudents = this.students.filter((student: any) => student.BECA_ALUMNO == true);
        let semiScholarStudents = this.students.filter((student: any) => student.DESC_ALUMNO > 0);
        this.activeStudents = activeStudents.length;
        this.retiredStudents = retiredStudents.length;
        this.scholarStudents = scholarStudents.length;
        this.semiScholarStudents = semiScholarStudents.length;

      },
      error: (err) => {
        console.log(<any>err);
      },
    });
  }
}
