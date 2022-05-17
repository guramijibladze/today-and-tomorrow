import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireApiService {

  constructor(
    private db:AngularFirestore
  ) { }

  postDb(data:any):Observable<any>{
    return from(this.db.collection('task').add(data))
  }

  getDb():Observable<any>{
    // return this.db.collection('task').get().pipe(
    //   map(el => el.docs.map(res => res.id))
    // );
    return this.db.collection('task').get().pipe(
      map((res) => res.docs.map((d) => d.data()))
    )

  }


  // updateDb():Observable<any>{
  //   return from(this.db.collection('task').doc('updateObj').update({
  //     age:30
  //   }))
  // }
}
