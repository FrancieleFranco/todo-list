import { Observable, of } from 'rxjs';
import { TodoSignalsService } from './todo-signals.service';
import { Injectable } from '@angular/core';
import { Todo } from '../model/models/todo.module';

@Injectable({
  providedIn: 'root',
})
export class ExampleTestService {
  testNameNameList: Array<{ id: number; name: string }> = [
    {
      id: 1,
      name: 'Test 1',
    },
    {
      id: 2,
      name: 'Test 2',
    },
  ];

  constructor(private todoSignalsService: TodoSignalsService) {}

  public getTestNameList(): Observable<Array<{ id: number; name: string }>> {
    return of(this.testNameNameList);
  }

  handleCreateTodo(todo: Todo): Observable<Array<Todo>> {
    if (todo) {
      this.todoSignalsService.updateTodos(todo);
    }
    return of(this.todoSignalsService.todoState());
  }
}
