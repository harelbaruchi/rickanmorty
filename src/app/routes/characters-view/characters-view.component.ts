import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CharacterService } from '../../../core/services/character.service';
import { Character } from 'src/shared/models/character.model';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from 'src/shared/components/character/character.component';

@Component({
  selector: 'app-characters-view',
  standalone: true,
  imports: [CommonModule, CharacterComponent],
  templateUrl: './characters-view.component.html',
  styleUrl: './characters-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersViewComponent {
  readonly characterSrv = inject(CharacterService);
  characters = this.characterSrv.characters$;

  openEditor(character?: Character) {
    this.characterSrv.openCharacterEditor(character);
  }
}
