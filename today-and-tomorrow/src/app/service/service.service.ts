import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private _changestatus = new Subject<boolean>()
  get changestatus$():Observable<boolean>{
    return this._changestatus.asObservable()
  }

  constructor() { }

  logIn(){
    this._changestatus.next(true);
  }

}
