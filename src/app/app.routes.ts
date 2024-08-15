import { Route } from '@angular/router';
import { AppRoutes } from 'src/core/models/routes.model';
import { HomeComponent } from './routes/home/home.component';
import { CharactersViewComponent } from './routes/characters-view/characters-view.component';

export const appRoutes: Route[] = [
  { path: AppRoutes.CharDetails, loadComponent: () => CharactersViewComponent },
  { path: AppRoutes.Home, loadComponent: () => HomeComponent },
  { path: '**', loadComponent: () => HomeComponent },
];
