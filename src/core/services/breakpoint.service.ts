import { inject, Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { distinctUntilChanged, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  readonly observer = inject(BreakpointObserver);
  private readonly mobileMaxWidth = 1023;

  isMobile() {
    return this.observer
      .observe('(max-width: ' + this.mobileMaxWidth + 'px)')
      .pipe(
        map((data) => data.matches),
        distinctUntilChanged()
      );
  }

  constructor() {}
}
