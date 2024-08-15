import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { CharacterService } from 'src/core/services/character.service';
import { Character } from 'src/shared/models/character.model';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {
  readonly characterService = inject(CharacterService);
  character = input.required<Character>();

  openEditor() {
    this.characterService.openCharacterEditor(this.character());
  }

  deleteCharacter() {
    let userPreference = '';
    if (
      confirm('Are you sure you want to delete ' + this.character().name + '?')
    ) {
      this.characterService.deleteCharacter(this.character().id);
      userPreference = this.character().name + 'was deleted successfully';
    } else {
      userPreference = 'you changed your mind!';
    }
    alert(userPreference);
  }
}
