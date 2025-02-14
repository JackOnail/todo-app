import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CharacterComponent, Character } from './components/character/character.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgFor, NgClass, CharacterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // Initialize an empty array to hold the list of characters
  characterList: Character[] = [];
  // Initialize a string to hold the new character input
  newCharacterName: string = '';

  // Load characters from localStorage when the component initializes
  ngOnInit() {
    this.loadCharacters();
  }

  // Add a new character to the character list
  addCharacter() {
    // Check if the new character name is not empty
    if(this.newCharacterName.trim() !== '') {
      // Create a new character
      const newCharacter: Character = {
        id: Date.now(), // Use the current timestamp as the id
        name: this.newCharacterName,
        hp: 100, // Default HP
        status: 'Healthy', // Default status
        completed: false // Set the completed status to false
      }

      // Add the new character to the list
      this.characterList.push(newCharacter);
      // Clear the new character input
      this.newCharacterName = '';
      // Save the updated list to localStorage
      this.saveCharacters();
    }
  }

  // Toggle the status of a character
  toggleCharacterStatus(index: number): void {
    // Toggle the status
    this.characterList[index].completed = !this.characterList[index].completed;
    // Save the updated list to localStorage
    this.saveCharacters();
  }

  // Remove a character from the character list
  removeCharacter(id: number): void {
    // Filter out the character with the given id
    this.characterList = this.characterList.filter(character => character.id !== id);
    // Save the updated list to localStorage
    this.saveCharacters();
  }

  // Save the character list to localStorage
  saveCharacters(): void {
    localStorage.setItem('characterList', JSON.stringify(this.characterList));
  }

  // Load the character list from localStorage
  loadCharacters(): void {
    const savedCharacters = localStorage.getItem('characterList');
    if (savedCharacters) {
      this.characterList = JSON.parse(savedCharacters);
    }
  }
}
