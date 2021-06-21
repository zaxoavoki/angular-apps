import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
  user: any = null;
  token: any = null;

  constructor(private afa: AngularFireAuth) {}

  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  async authLogin(provider: any) {
    try {
      const res = await this.afa.signInWithPopup(provider);
      this.user = of(res.user);
      this.token = of((res.credential as any).accessToken);
    } catch (error) {
      console.log(error);
    }
  }
}
