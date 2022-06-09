import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { delay, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireApiService {

  constructor(
    private db: AngularFirestore,
    private http: HttpClient
  ) { }

  getDbJosonTaskArr(): Observable<any> {
    return this.http.get('http://localhost:3000/taskArr')
  }


  postTask(object: any): Observable<any> {
    return this.http.post('http://localhost:3000/taskArr', object).pipe(
      delay(500)
    )
  }

  putObj(guId: any, object: any): Observable<any> {
    return this.http.put(`http://localhost:3000/taskArr/${guId}`, object)
  }

  deleteTask(id: number, object: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/taskArr/${id}`, object)
  }

}
