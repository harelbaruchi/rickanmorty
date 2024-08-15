import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SessionService } from './session.service';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Character, ResponseModel } from '../../shared/models/character.model';
import { SessionKeys } from '../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  readonly #charactersUrl = environment.serverUrl + 'character';
  readonly http = inject(HttpClient);
  readonly sessionService = inject(SessionService);
  readonly characters = new BehaviorSubject<Character[]>([]);
  readonly characters$ = this.characters.asObservable();

  readonly isEditorOpen = new BehaviorSubject<boolean>(false);
  readonly isEditorOpen$ = this.isEditorOpen.asObservable();

  readonly characterToEdit = new BehaviorSubject<Character | undefined>(
    undefined
  );
  readonly characterToEdit$ = this.characterToEdit.asObservable();

  loadCharacters(): Observable<Character[]> {
    const characterList = this.getCurrentCharacterList();
    return characterList && characterList.length > 0
      ? of(this.getCurrentCharacterList()).pipe(
          tap(() => this.onCharacterListUpdate(characterList))
        )
      : this.getCharacters();
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<ResponseModel>(this.#charactersUrl).pipe(
      map((data) => data.results),
      tap((characters: Character[]) => this.onCharacterListUpdate(characters))
    );
  }

  onCharacterListUpdate(characterList: Character[]) {
    const updatedCharacters = characterList ?? [];
    this.characters.next(updatedCharacters);
    this.sessionService.setSession(SessionKeys.Characters, updatedCharacters);
  }

  getCurrentCharacterList(): Character[] {
    return this.sessionService.getSession(
      SessionKeys.Characters
    ) as Character[];
  }

  editCharacter(character: Partial<Character>) {
    const characterList = this.getCurrentCharacterList();
    const currentCharacterindex = characterList.findIndex(
      (u) => u.id === character.id
    );
    if (currentCharacterindex !== -1) {
      const updatedCharacter = {
        ...characterList[currentCharacterindex],
        ...character,
      };
      characterList[currentCharacterindex] = updatedCharacter;
      this.onCharacterListUpdate(characterList);
    }
  }

  createCharacter(character: Character) {
    const characterList = this.getCurrentCharacterList();
    character.id = this.generateUuid();
    characterList.push(character);
    this.onCharacterListUpdate(characterList);
  }

  deleteCharacter(characterId: number) {
    const characterList = this.getCurrentCharacterList();
    const currentCharacterindex = characterList.findIndex(
      (u) => u.id === characterId
    );
    if (currentCharacterindex !== -1) {
      characterList.splice(currentCharacterindex, 1);
      this.onCharacterListUpdate(characterList);
    }
  }

  openCharacterEditor(character?: Character) {
    console.log(character);
    this.characterToEdit.next(character);
    this.isEditorOpen.next(true);
  }

  closeCharacterEditor() {
    this.isEditorOpen.next(false);
    this.characterToEdit.next(undefined);
  }

  generateUuid(): number {
    return Math.floor(Math.random() * 900) + 100;
  }
}
