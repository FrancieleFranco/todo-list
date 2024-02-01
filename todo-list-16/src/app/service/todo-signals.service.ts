import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/models/todo.module';
import { TodoKeyLocalStorage } from '../model/enum/todoKeyLocalstorage';

@Injectable({
  providedIn: 'root',
})
export class TodoSignalsService {
  public todoState = signal<Array<Todo>>([]);

  public updateTodos({ id, title, description, done }: Todo): void {
    if ((title && id && description !== null) || undefined) {
      this.todoState.mutate((todos) => {
        if (todos !== null) {
          todos.push(new Todo(id, title, description, done));
        }
      });
      //atualiza o localStorage
      this.saveTodosInlocalStorage();
    }
  }

  public saveTodosInlocalStorage(): void {
    const todos = JSON.stringify(this.todoState());

    todos && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos);
  }
}
