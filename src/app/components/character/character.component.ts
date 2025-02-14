import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Character {
  id: number;
  name: string;
  hp: number;
  status: string;
  completed: boolean;
}

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {
  @Input() character!: Character;
  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  toggleStatus() {
    this.toggle.emit();
  }

  deleteCharacter() {
    this.delete.emit();
  }
}
