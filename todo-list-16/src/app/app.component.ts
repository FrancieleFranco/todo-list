import { TodoSignalsService } from './service/todo-signals.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData } from './model/models/schoolData.module';
import { Observable, filter, from, map, of, switchMap, zip } from 'rxjs';
import { SchoolService } from './service/school.service';
import { Todo } from './model/models/todo.module';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
})
export class AppComponent implements OnInit {
  @Input() public projectName!: string;
  @Output() public ouputEvent = new EventEmitter<string>();

  title = 'todo-list-16';
  public todoSignal!: WritableSignal<Todo[]>;
  public renderTestMessage = false;

  //utilizando opreadores
  students: SchoolData[] = [];
  teachers: SchoolData[] = [];
  private zipSchoolResponse$ = zip(this.getStudentsDatas(), this.getTeachers());
  private ages = of(20, 30, 40, 50, 60, 70);
  private peopleDatas = from([
    {
      name: 'Fran Franco',
      age: 30,
      profession: 'Desenvolvedora Front',
    },
    {
      name: 'Weliton Franco',
      age: 27,
      profession: 'QA',
    },
    {
      name: 'João Silva',
      age: 27,
      profession: 'Vendedor',
    },
    {
      name: 'Lucas Souza',
      age: 27,
      profession: 'Analista de Software',
    },
    {
      name: 'Bruno Silva',
      age: 37,
      profession: 'Analista de Software',
    },
  ]);
  private studentUserId = '2';

  constructor(
    private schoolService: SchoolService,
    private todoSignalsService: TodoSignalsService
  ) {}

  ngOnInit(): void {
    this.handleFindStudentsById();
  }

  handleFindStudentsById(): void {
    this.getStudentsDatas()
      .pipe(
        switchMap((students) =>
          this.findStudentById(students, this.studentUserId)
        )
      )
      .subscribe({
        next: (response) => {
          console.log('retorno estudante filtrado', response);
        },
      });
  }

  findStudentById(students: SchoolData[], userId: string) {
    return of([students.find((student) => student.id === userId)]);
  }

  getSoftware(): void {
    this.peopleDatas
      .pipe(
        filter((people) => people.profession === 'Analista de Software'),
        map((people) => people.name)
      )
      .subscribe({
        next: (response) => {
          console.log('nome do desenvolvedor', response);
        },
      });
  }
  getPeopleProfessions(): void {
    this.peopleDatas.pipe(map((people) => people.profession)).subscribe({
      next: (response) => {
        console.log('profissão', response);
      },
    });
  }

  getMultipliedAges(): void {
    this.ages.pipe(map((age) => age * age)).subscribe({
      next: (response) => {
        console.log('idades multiplicadas', response);
      },
    });
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

  //test

  public handleEmitEvent(): void {
    this.ouputEvent.emit(this.projectName);
  }

  handleCreateTodo(todo: Todo): void {
    if (todo) {
      this.todoSignalsService.updateTodos(todo);
      this.todoSignal = this.todoSignalsService.todoState;
    }
  }
}
