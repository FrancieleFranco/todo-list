import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { CommonModule, NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoSignalsService } from 'src/app/service/todo-signals.service';
import { TodoKeyLocalStorage } from 'src/app/model/enum/todoKeyLocalstorage';
import { Todo } from 'src/app/model/models/todo.module';
@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgComponentOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: [],
})
export class TodoCardComponent implements OnInit {
  private todosSignalService = inject(TodoSignalsService);
  private todosSignal = this.todosSignalService.todoState;

  public todosList = computed(() => this.todosSignal());

  constructor() {
    effect(() => {
      console.log('Signal foi atualizado', this.todosSignalService.todoState());
    });
  }

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage() {
    const todosDatas = localStorage.getItem(
      TodoKeyLocalStorage.TODO_LIST
    ) as string;
    todosDatas && this.todosSignal.set(JSON.parse(todosDatas));
  }

  private saveTodosInLocalStorage(): void {
    this.todosSignalService.saveTodosInlocalStorage();
  }

  handleDoneTodos(todoId: number): void {
    if (todoId) {
      this.todosSignal.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
        todoSelected && (todoSelected.done = true);
        this.saveTodosInLocalStorage();
      });
    }
  }

  handleDeleteTodos(todo: Todo): void {
    if (todo) {
      const index = this.todosList().indexOf(todo);
      if (index !== -1) {
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          //salvar dados atuais
          this.saveTodosInLocalStorage();
        });
      }
    }
  }
}
