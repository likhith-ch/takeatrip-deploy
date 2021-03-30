import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  loggedin:any
  private storageSub= new BehaviorSubject<any>("removed"); 
  private username= new BehaviorSubject<any>("");   
  constructor() { }
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
  watchUser(): Observable<any> {
    return this.username.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub?.next('added');
    this.username?.next(localStorage.getItem("username"));
  }

  removeItem() {
    localStorage.clear();
    this.storageSub?.next('removed');
    this.username?.next("");
  }
}
