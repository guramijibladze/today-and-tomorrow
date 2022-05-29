import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FireApiService } from 'src/app/service/fire-api.service';
import { Guid } from 'guid-ts';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { delay, findIndex, from, of, tap } from 'rxjs';


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
    id: ''
  }

  constructor(
    private storage: FireApiService
  ) { }

  ngOnInit(): void {
    this.getTaskArr()
    this.getprogresArr()
  }

  drop(event: CdkDragDrop<string[]>) {
    // console.log(this.tasksArr, this.todoArr, this.progresArr, this.doneArr)
    // console.log(event.previousIndex, 'line', event.currentIndex)
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      let arrmove = event.container
      console.log( event.previousIndex,)
      console.log( arrmove)
    }
  }


 
  getTaskArr() {
    this.storage.getDbJosonTaskArr().subscribe( res => {
      this.tasksArr = res
      // console.log(res)
    })
  }

  getprogresArr() {
    this.storage.getDbJsonProgresArr().subscribe( res => {
      this.progresArr = res
      // console.log(res)
    })
  }

  saveTask(){
    const newGuid = Guid.newGuid().toString();
    this.sendData.id = newGuid
    // console.log(this.sendData)

    this.storage.postTask(this.sendData).subscribe( res => {
      // console.log(res)
      this.getTaskArr()
    });

  }

  delete(item:any){
    this.storage.deleteTask(item.id, item).subscribe()
    // console.log(item)
  }

}
