import { Injectable } from '@angular/core';
import { SchoolData } from '../model/models/schoolData.module';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor() {}
  //simulando uma api
  private students: SchoolData[] = [
    {
      name: 'Fran',
      id: '1',
    },
    {
      name: 'Vera',
      id: '2',
    },
    {
      name: 'João',
      id: '3',
    },
  ];

  private teachers: SchoolData[] = [
    {
      name: 'Jose',
      id: '1',
    },
    {
      name: 'Maria',
      id: '2',
    },
    {
      name: 'JJ',
      id: '3',
    },
  ];

  public getStudents(): Observable<SchoolData[]> {
    return of(this.students);
  }
  public getTeachers(): Observable<SchoolData[]> {
    return of(this.teachers);
  }
}
