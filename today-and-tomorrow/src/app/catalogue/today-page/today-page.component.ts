import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FireApiService } from 'src/app/service/fire-api.service';
import { Guid } from 'guid-ts';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


interface Task {
  text: string
  status: string,
  level: string,
  id: string
}

@Component({
  selector: 'app-today-page',
  templateUrl: './today-page.component.html',
  styleUrls: ['./today-page.component.scss']
})
export class TodayPageComponent implements OnInit {
  todoArr:Task[] = [];
  progresArr:Task[] = [];
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
  }

  dropObject:Object[] = []
  drop(event: CdkDragDrop<Task[]>) {    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.dropObject = []

      let arrName = event.container.id
      let guId = event.previousContainer.data[event.previousIndex].id

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.dropObject = event.container.data
      this.moveItemInArray(arrName, guId)

    }
  }

  moveItemInArray(arrName:string, guId:string){
    // console.log('done' == arrName)
    switch(arrName){
      case 'todo':
        this.putObj('todo',guId)
        break;
      case 'progress':
        this.putObj('progress',guId)
        break;
      case 'done':
        this.putObj('done',guId)
        break;
    }
  }

  putObj(status:string,guId:string){
    let putObj = this.dropObject[0];
    console.log(typeof putObj)
    // this.storage.putObj(status,guId).subscribe()
  }
 
  getTaskArr() {
    this.storage.getDbJosonTaskArr().subscribe( res => {
      this.todoArr = res.filter((item:Task) => item.status == 'todo')
      this.progresArr = res.filter((item:Task) => item.status == 'progres')
      // this.todoArr = res.filter((item:Task) => item.status == 'todo')
      
      // console.log(this.todoArr)
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
