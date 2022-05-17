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

    
    // this.update()
    // this.storage.getDb().subscribe( res => {
    //   console.log(res)
    // })
    
  }

  tasksArr:any = []
  getAllUsers() {
    let dataId
    this.storage.getDb().subscribe( res => {
      this.tasksArr = res
      // res.map((i:any) => this.tasksArr.push(i))
      // let arr:any = []
      // res.map((i:any) => arr.push(i.text))
      // dataId = res
      console.log( this.tasksArr)
    })

  }


  saveTask(){
    const newGuid = Guid.newGuid().toString();
    this.sendData.Guid = newGuid
    console.log(this.sendData)

    this.storage.postDb(this.sendData).subscribe( res => {
      console.log(res.id)
    })
  }

  // update(){
  //   this.storage.updateDb()
  // }

}
