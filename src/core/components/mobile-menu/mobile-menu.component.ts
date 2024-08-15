import { animate, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenuItem } from 'src/core/models/header.model';

export const animation = trigger('openClose', [
  transition(':enter', [
    style({ width: 0, opacity: 0 }),
    animate('.4s eas-in', style({ width: '100%', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ width: '100%', opacity: 1 }),
    animate('.4s ease-out', style({ width: '0%', opacity: 0 })),
  ]),
]);

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [animation],
})
export class MobileMenuComponent {
  readonly menuService = inject(MenuService);

  menuItems = this.menuService.menuItems;
  selectedItem = toSignal(this.menuService.selectedItem$);
  isOpen = input(false);

  navigate(item?: MenuItem) {
    this.menuService.navigate(item);
  }
}
