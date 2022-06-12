import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FireApiService } from 'src/app/service/fire-api.service';
import { Guid } from 'guid-ts';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Status, Task } from '../catalogue.model';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';


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
    level: 'Low',
    id: '',
    date: ''
  }

  constructor(
    private storage: FireApiService,
    public datepipe: DatePipe
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
    let date = new Date()
    let parseDate = this.datepipe.transform(date, 'dd')
    let strDate = String(parseDate)


    status ? currentObj.status = status : ''
    status == Status.Done ? currentObj.date = strDate : ''

    this.storage.putObj(guId, currentObj).subscribe(res => {
      // console.log(res)
    })


  }



  getTaskArr() {
    let date = new Date()
    let parseDate = this.datepipe.transform(date, 'dd')
    let strDate = String(parseDate)
    let done = []
    let removeDoneArr: any = []

    this.storage.getDbJosonTaskArr().subscribe(res => {
      this.todoArr = res.filter((item: Task) => item.status == Status.Todo)
      this.progresArr = res.filter((item: Task) => item.status == Status.Progress)
      done = res.filter((item: Task) => item.status == Status.Done)
      let filterArr = done.filter((item: Task) => item.date == strDate)
      removeDoneArr = done.filter((item: Task) => item.date != strDate)
      this.doneArr = filterArr
      console.log(removeDoneArr)

      if (removeDoneArr.length > 0) {

        for (let i = 0; i < removeDoneArr.length; i++) {
          this.delete(removeDoneArr[i])
        }
      }
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
      this.sendData.level = 'Low'
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
