import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FireApiService } from 'src/app/service/fire-api.service';
import { Guid } from 'guid-ts';


@Component({
  selector: 'app-today-page',
  templateUrl: './today-page.component.html',
  styleUrls: ['./today-page.component.scss']
})
export class TodayPageComponent implements OnInit {
  tasksArr:any = []
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

 
  getAllUsers() {
    this.storage.getDb().subscribe( res => {
      this.tasksArr = res
      this.status = res.status
      this.taskLenth = this.tasksArr.length
      console.log('status', this.taskLenth)
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


}
