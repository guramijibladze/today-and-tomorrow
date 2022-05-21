import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FireApiService } from 'src/app/service/fire-api.service';
import { Guid } from 'guid-ts';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-today-page',
  templateUrl: './today-page.component.html',
  styleUrls: ['./today-page.component.scss']
})
export class TodayPageComponent implements OnInit {
  tasksArr:any = [];
  todoArr:any = [];
  progresArr:any = [];
  doneArr:any = [];

  status:string = '';
  taskLenth:number = 0;

  sendData:any = {
    text:'',
    status: '',
    Guid: ''
  }

  constructor(
    private storage: FireApiService
  ) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event, this.todoArr)
    
    if (event.previousContainer === event.container) {
      console.log('event1'),
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('event2'),
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

 
  getAllUsers() {
    this.storage.getDb().subscribe( res => {
      this.tasksArr = res
      this.status = res.status
      this.taskLenth = this.tasksArr.length
      console.log('status', this.tasksArr)
    })

  }


  saveTask(){
    const newGuid = Guid.newGuid().toString();
    this.sendData.Guid = newGuid
    console.log(this.sendData)

    this.storage.postDb(this.sendData).subscribe( res => {
      console.log(res.id)
    });

    this.getAllUsers();
  }

  delete(item:any){
    let id = 'zTy6n23AfGNhB8S1aenA'
    console.log(id)
    this.storage.delete(id).subscribe()
  }

}
