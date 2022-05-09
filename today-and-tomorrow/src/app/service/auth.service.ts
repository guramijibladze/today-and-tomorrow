import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SignIn } from '../auth/sign-in/sign-in.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!:any;

  get isLoggedIn():boolean{
    return !!this.user
  }

  constructor(private auth: AngularFireAuth) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user
      console.log(this.user)
    })
  }

  signIn({email, password}:SignIn){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp({ email, password }: SignIn) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }
}
