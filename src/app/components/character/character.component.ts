import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../models/character.model';

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
  @Output() update = new EventEmitter<void>();

  toggleStatus() {
    this.toggle.emit();
  }

  deleteCharacter() {
    this.delete.emit();
  }

  increaseHp() {
    this.character.hp += 1;
    this.update.emit();
  }

  decreaseHp() {
    if (this.character.hp > 0) {
      this.character.hp -= 1;
      this.update.emit();
    }
  }
}
