import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CharacterService } from 'src/core/services/character.service';
import { Character } from 'src/shared/models/character.model';

@Component({
  selector: 'app-character-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './character-editor.component.html',
  styleUrl: './character-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterEditorComponent implements OnInit {
  readonly characterService = inject(CharacterService);

  character = toSignal(this.characterService.characterToEdit$);
  isNewCharacter = signal(true);

  characterForm = new FormGroup({
    name: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(2)])
    ),
    gender: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(2)])
    ),
    species: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(2)])
    ),
    status: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(2)])
    ),
    type: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(2)])
    ),
    image: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(10)])
    ),
  });

  // you'd be surprised to learn that i forgot to initialize the form at least ,
  //it didnt work properly do to onpush change detection strategy ...
  ngOnInit(): void {
    this.initCharacterForm();
  }

  initCharacterForm() {
    const characterDetails = this.character();
    if (characterDetails !== null) {
      this.characterForm.patchValue({ ...characterDetails });
      this.isNewCharacter.set(false);
    } else {
      this.isNewCharacter.set(true);
    }
  }

  closeEditor() {
    this.characterService.closeCharacterEditor();
  }

  submitCharacter() {
    console.log(this.isNewCharacter());

    if (this.isNewCharacter()) {
      const characterDetails = { ...this.characterForm.value } as Character;
      this.characterService.createCharacter(characterDetails);
    } else {
      const characterDetails = {
        ...this.character(),
        ...this.characterForm.value,
      } as Character;
      this.characterService.editCharacter(characterDetails);
    }
    this.closeEditor();
  }
}
