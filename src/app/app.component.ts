import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

// Define the structure of a TodoItem
export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // Initialize an empty array to hold the list of todo items
  todoList : TodoItem [] = [];
  // Initialize a string to hold the new task input
  newTask: string = '';

  // Load tasks from localStorage when the component initializes
  ngOnInit() {
    this.loadTasks();
  }

  // Add a new task to the todo list
  addTask() {
    // Check if the new task input is not empty
    if(this.newTask.trim() !== '') {
      // Create a new todo item
      const newTodoItem : TodoItem= {
        id: Date.now(), // Use the current timestamp as the id
        task: this.newTask,
        completed: false // Set the completed status to false
      }

      // Add the new todo item to the list
      this.todoList.push(newTodoItem);
      // Clear the new task input
      this.newTask = '';
      // Save the updated list to localStorage
      this.saveTasks();
    }
  }

  // Toggle the completed status of a task
  toggleCompleted(index: number): void{
    // Toggle the completed status
    this.todoList[index].completed = !this.todoList[index].completed;
    // Save the updated list to localStorage
    this.saveTasks();
  }

  // Delete a task from the todo list
  deleteTask(id: number): void {
    // Filter out the task with the given id
    this.todoList = this.todoList.filter(todoItem => todoItem.id !== id);
    // Save the updated list to localStorage
    this.saveTasks();
  }

  // Save the todo list to localStorage
  saveTasks(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  // Load the todo list from localStorage
  loadTasks(): void {
    const savedTasks = localStorage.getItem('todoList');
    if (savedTasks) {
      this.todoList = JSON.parse(savedTasks);
    }
  }
}
