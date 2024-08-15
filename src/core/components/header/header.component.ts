import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointService } from '../../services/breakpoint.service';
import { MenuService } from '../../services/menu.service';
import { tap } from 'rxjs';
import { MenuItem } from '../../models/header.model';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { MenuCloseBtnComponent } from '../menu-close-btn/menu-close-btn.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgFor, MobileMenuComponent, MenuCloseBtnComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly breakpointSrv = inject(BreakpointService);
  readonly menuService = inject(MenuService);

  title = 'RickanMorty';
  isScrolled = signal(false);
  isOpen = this.menuService.isOpen;
  menuItems = this.menuService.menuItems;
  selectedItem = toSignal(this.menuService.selectedItem$);
  isMobile = toSignal(
    this.breakpointSrv
      .isMobile()
      .pipe(tap(() => this.menuService.setIsMenuOpen(false)))
  );

  @HostListener('window:scroll', ['$event'])
  onScroll = () => {
    let verticalOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled.set(verticalOffset > 0);
  };

  openSubMenu() {
    this.menuService.setIsMenuOpen(!this.isOpen());
  }

  navigate(item?: MenuItem) {
    this.menuService.navigate(item);
  }
}
