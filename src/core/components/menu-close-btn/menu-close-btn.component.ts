import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-menu-close-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-close-btn.component.html',
  styleUrl: './menu-close-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCloseBtnComponent {
  isOpen = input(false);
  visibilityChanged = output<boolean>();

  changeVisibility() {
    this.visibilityChanged.emit(this.isOpen());
  }
}
