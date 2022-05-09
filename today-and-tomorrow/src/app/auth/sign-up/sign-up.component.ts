import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


interface SignUp {
  email:string;
  password:string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  show: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  password() {
    this.show = !this.show;
  }

  signUp({email, password}:SignUp){
    this.auth.signUp({email, password}).then(() => {
      this.router.navigate(['catalogue']);
    })
  }
}
