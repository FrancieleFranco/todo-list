import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TodoSignalsService } from 'src/app/service/todo-signals.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: [],
})
export class TodoFormComponent {
  private todosSignalService = inject(TodoSignalsService);

  public allTodos = this.todosSignalService.todoState();

  public todosForm = new FormGroup({
    title: new FormGroup('', [Validators.required, Validators.minLength(3)]),
    description: new FormGroup('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  public handleCreateNewTodo(): void {
    if (this.todosForm.value && this.todosForm.valid) {
      const title = String(this.todosForm.controls['title'].value);
      const description = String(this.todosForm.controls['description'].value);
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const done = false;

      this.todosSignalService.updateTodos({ id, title, description, done });
    }
  }
}
