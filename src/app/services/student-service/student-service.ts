import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from 'src/app/models/student';
import { Observable } from 'rxjs';
import { API_URI } from '../api';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<any> {
    return this.http.get(`${API_URI}/students`);
  }

  public getStudent(id: string): Observable<any> {
    return this.http.get(`${API_URI}/students/${id}`);
  }

  public saveStudent(student : Student): Observable<any> {
    return this.http.post(`${API_URI}/students`, student);
  }

  public deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${API_URI}/students/${id}`);
  }

  public updateStudent(id: string, updatedStudent: Student): Observable<any> {
    return this.http.patch(`${API_URI}/students/${id}`, updatedStudent);
  }
}
