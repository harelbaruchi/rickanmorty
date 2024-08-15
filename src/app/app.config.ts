import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { CharacterService } from 'src/core/services/character.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Observable } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

/**
 *
 * @param characterSrv service to retrieve data from api
 * @returns response object observable
 */
function appInit(characterSrv: CharacterService): () => Observable<any> {
  return () => characterSrv.loadCharacters();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [CharacterService],
    },
  ],
};
