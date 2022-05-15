import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireApiService {

  constructor(
    private db:AngularFirestore
  ) { }

  postDb(data:any):Observable<any>{
    return from(this.db.collection('task').doc('id').set(data))
  }
}
