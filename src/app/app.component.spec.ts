import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CharacterComponent } from './components/character/character.component';

describe('AppComponent', () => {
  // Set up the testing module before each test.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CharacterComponent],
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

  // Test if a character is added and saved to localStorage
  it('should add a character and save to localStorage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.newCharacterName = 'Test Character';
    app.addCharacter();
    expect(app.characterList.length).toBe(1);
    expect(JSON.parse(localStorage.getItem('characterList') || '[]').length).toBe(1);
  });

  // Test if characters are loaded from localStorage
  it('should load characters from localStorage', () => {
    localStorage.setItem('characterList', JSON.stringify([{ id: 1, name: 'Test Character', hp: 100, status: 'Healthy', completed: false }]));
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.characterList.length).toBe(1);
  });
});
