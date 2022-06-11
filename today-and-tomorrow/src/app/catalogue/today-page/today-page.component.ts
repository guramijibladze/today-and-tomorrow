import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FireApiService } from 'src/app/service/fire-api.service';
import { Guid } from 'guid-ts';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Status, Task } from '../catalogue.model';
import { interval, of, timeInterval, timeout } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-today-page',
  templateUrl: './today-page.component.html',
  styleUrls: ['./today-page.component.scss']
})
export class TodayPageComponent implements OnInit {
  @ViewChild('f') signupForm!: NgForm;

  todoArr: Task[] = [];
  progresArr: Task[] = [];
  doneArr: Task[] = [];

  status: string = '';
  taskLenth: number = 0;

  sendData: any = {
    text: '',
    status: '',
    level: '',
    id: ''
  }

  constructor(
    private storage: FireApiService
  ) { }

  ngOnInit(): void {
    this.getTaskArr()
  }


  dropObject: Object[] = []
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.dropObject = []

      let arrName = event.container.id
      let guId = event.previousContainer.data[event.previousIndex].id
      let currentObj = event.previousContainer.data[event.previousIndex]

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.dropObject = event.container.data
      this.moveItemInArray(arrName, guId, currentObj)

    }
  }

  moveItemInArray(arrName: string, guId: string, currentObj: any) {
    // console.log('done' == arrName)
    switch (arrName) {
      case Status.Todo:
        this.putObj(guId, currentObj, 'todo')
        break;
      case Status.Progress:
        this.putObj(guId, currentObj, 'progress')
        break;
      case Status.Done:
        this.putObj(guId, currentObj, 'done')
        break;
    }
  }

  putObj(guId: string, currentObj: Task, status?: string) {
    status ? currentObj.status = status : ''

    this.storage.putObj(guId, currentObj).subscribe(res => {
      console.log(res)
    })
  }



  getTaskArr() {
    this.storage.getDbJosonTaskArr().subscribe(res => {
      this.todoArr = res.filter((item: Task) => item.status == Status.Todo)
      this.progresArr = res.filter((item: Task) => item.status == Status.Progress)
      this.doneArr = res.filter((item: Task) => item.status == Status.Done)

      // console.log(this.todoArr)
    })

  }


  saveTask() {
    const newGuid = Guid.newGuid().toString();
    this.sendData.id = newGuid
    this.sendData.status = 'todo'

    this.storage.postTask(this.sendData).subscribe(res => {
      // console.log(res)
      this.getTaskArr();
      this.signupForm.reset();
    });

  }

  delete(item: any) {
    this.storage.deleteTask(item.id, item).subscribe(res => {
      this.getTaskArr();
    })

  }


  saveText(event: Event, currentObj: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    let guId = currentObj.id
    currentObj.text = filterValue

    this.putObj(guId, currentObj)
  }

}
