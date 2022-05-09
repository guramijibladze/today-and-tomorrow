import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get isLoggedIn(){
    return this.auth.isLoggedIn
  }

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

  }

  goToSignIn(){
    this.router.navigate(['sign-in']);
  }

  goToSignUp(){
    this.router.navigate(['sign-up']);
  }

  logout(){
    this.auth.signOut().then((res) => {
      this.router.navigate(['/sign-in'])
    });
  }
}
