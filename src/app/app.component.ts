import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../core/components/header/header.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { CharacterService } from '../core/services/character.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharacterEditorComponent } from 'src/shared/components/character-editor/character-editor.component';

export const popupAnimation = trigger('openClose', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.4s ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('.4s ease-out', style({ opacity: 0 })),
  ]),
]);

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf, CharacterEditorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rickanmorty';
  readonly characterService = inject(CharacterService);

  isEditorOpen = toSignal(this.characterService.isEditorOpen$);
}
