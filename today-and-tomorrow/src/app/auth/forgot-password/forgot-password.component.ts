import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email:string = ''

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    
  }

  resetEmail(){
    this.authService.resetEmail(this.email).then(
     (res) => { console.log(res)}
    )
  }
}
