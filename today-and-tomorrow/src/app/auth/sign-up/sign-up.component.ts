import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';


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
    private auth: AngularFireAuth,
    private router: Router,
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
  }

  password() {
    this.show = !this.show;
  }

  signUp({email, password}:SignUp){
    this.auth.createUserWithEmailAndPassword(email, password).then((res) => {
      this.router.navigate(['catalogue']);
      this.serviceService.logIn()
      console.log(res)
    })
    // console.log('form:', {email, password})
  }
}
