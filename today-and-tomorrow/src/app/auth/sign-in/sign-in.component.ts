import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

export interface SignIn {
  email:string;
  password:string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn({email, password}:SignIn){
    this.auth.signIn({email, password}).then(() => {
      this.router.navigate(['catalogue']);
    })
  }
}
