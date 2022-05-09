import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHiddenLogout: boolean = false
  isHiddenLogin:boolean = true

  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.serviceService.changestatus$.subscribe(res => {
      this.isHiddenLogout = true
      this.isHiddenLogin = false
    })
  }

  goToSignIn(){
    this.router.navigate(['sign-in']);
  }

  goToSignUp(){
    this.router.navigate(['sign-up']);
  }

  logout(){
    this.auth.signOut().then((res) => {
      console.log(res)
      this.isHiddenLogout = false
      this.isHiddenLogin = true
      this.router.navigate(['/sign-in'])
    });
  }
}
