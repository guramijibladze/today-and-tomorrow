import { Component, OnInit } from '@angular/core';
import { FireApiService } from 'src/app/service/fire-api.service';

@Component({
  selector: 'app-today-page',
  templateUrl: './today-page.component.html',
  styleUrls: ['./today-page.component.scss']
})
export class TodayPageComponent implements OnInit {
  sendData = {
    text:'',
    status: ''
  }

  constructor(
    private storage: FireApiService
  ) { }

  ngOnInit(): void {
  }

  saveTask(){
    console.log('add', this.sendData)
    this.storage.postDb(this.sendData).subscribe( res => {
      console.log(res)
    })
  }

  addTask(){
    console.log('add')
  }
}
