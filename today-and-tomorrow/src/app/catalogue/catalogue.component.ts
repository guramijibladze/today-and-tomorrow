import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  menuBox = ['Plan your day...', 'Plan your week...', 'Plan your month...', 
  'Plan your year...', 'Three-year goals...']

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigate(index:number){
    let ind = String(index)
    // console.log(typeof ind)
    // this.router.navigate(['/ind'])
  }
}