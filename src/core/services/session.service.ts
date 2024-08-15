import { Injectable } from '@angular/core';
import { SessionKeys } from '../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  getSession(key: SessionKeys): any {
    const keyData = localStorage.getItem(key);
    const data = keyData ? JSON.parse(keyData) : {};
    return data;
  }

  setSession(key: SessionKeys, data: any) {
    const item = JSON.stringify(data);
    localStorage.setItem(key, item);
  }

  deleteSession(key: SessionKeys) {
    localStorage.removeItem(key);
  }
}
