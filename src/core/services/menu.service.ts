import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../models/header.model';
import { AppRoutes } from '../models/routes.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  readonly router = inject(Router);

  private selectedItem = new BehaviorSubject<MenuItem | undefined>(undefined);
  readonly selectedItem$ = this.selectedItem.asObservable();

  isOpen = signal(false);

  readonly menuItems = signal<MenuItem[]>([
    { title: 'characters', route: AppRoutes.CharDetails },
  ]);

  constructor() {
    this.initSelectedMenuItem();
  }

  private initSelectedMenuItem() {
    this.menuItems().forEach((item) => {
      if (window.location.href.includes(item.route)) {
        this.setSelectedMenuItem(item);
        return;
      }
    });
  }

  private setSelectedMenuItem(item?: MenuItem) {
    this.selectedItem.next(item);
  }

  /**
   * update the menu to open or close
   * @param open indicates wether the menu is open or closed
   */
  setIsMenuOpen(open: boolean) {
    this.isOpen.set(open);
  }

  navigate(item?: MenuItem) {
    this.router.navigateByUrl(item ? item.route : '/');
    this.setSelectedMenuItem(item);
    this.setIsMenuOpen(false);
  }
}
