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
  tasksArr:any = []
  todoArr:any = [
    // { Guid: "c76f0a67-4727-4778-b601-e28b7d31be08",
    //   status: "Hard",
    //   text: "გერმანული"},
    //   { Guid: "12503cbf-5y1a-4cb3-9f7e-f75c7494ff32",
    //     status: "Low",
    //     text: "დილით 8 ზე ადგომა"}
  ]

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
      console.log('event'),
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('event'),
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
