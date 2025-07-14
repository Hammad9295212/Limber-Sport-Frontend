import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewTypeService {

  private viewTypeSubject = new BehaviorSubject<string>(this.getViewType());
  public viewType$ = this.viewTypeSubject.asObservable();

  constructor() {
    // Listen to window resize events
    window.addEventListener('resize', () => {
      this.viewTypeSubject.next(this.getViewType());
    });
  }

  public getViewType() {
    const width = window.innerWidth;
    if (width >= 1024) {
      return 'desktop';
    } else if (width >= 768 && width < 1024) {
      return 'middle';
    } else {
      return 'mobile';
    }
  }
}
