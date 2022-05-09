import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

interface SignUp {
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
    private serviceService: ServiceService,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn({email, password}:SignUp){
 
    this.auth.signInWithEmailAndPassword(email,password).then((res) => {
      this.router.navigate(['catalogue']);
      this.serviceService.logIn();
      console.log('sigIn', res)
    })
  }
}
