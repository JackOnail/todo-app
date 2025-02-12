import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // Set up the testing module before each test.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  // Test if the app component is created successfully
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Test if the app component has the correct title
  it(`should have the 'todo-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('todo-app');
  });

  // Test if the title is rendered correctly in the template
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, todo-app');
  });

  // Test if a task is added and saved to localStorage
  it('should add a task and save to localStorage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.newTask = 'Test Task';
    app.addTask();
    expect(app.todoList.length).toBe(1);
    expect(JSON.parse(localStorage.getItem('todoList') || '[]').length).toBe(1);
  });

  // Test if tasks are loaded from localStorage
  it('should load tasks from localStorage', () => {
    localStorage.setItem('todoList', JSON.stringify([{ id: 1, task: 'Test Task', completed: false }]));
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.todoList.length).toBe(1);
  });
});
