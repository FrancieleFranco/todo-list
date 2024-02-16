import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData } from './model/models/schoolData.module';
import { Observable, zip } from 'rxjs';
import { SchoolService } from './service/school.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
})
export class AppComponent implements OnInit {
  title = 'todo-list-16';
  students: SchoolData[] = [];
  teachers: SchoolData[] = [];
  private zipSchoolResponse$ = zip(this.getStudentsDatas(), this.getTeachers());

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.getSchoolDatas();
  }

  public getSchoolDatas(): void {
    this.zipSchoolResponse$.subscribe({
      next: (response) => {
        console.log('students', response[0]);
        console.log('teachers', response[1]);
      },
    });
  }
  private getStudentsDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  private getTeachers(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }
}
