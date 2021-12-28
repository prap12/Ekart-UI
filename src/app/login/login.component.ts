import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { User } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  invalidSignIn: boolean = false;
  invalidSignUp: boolean = false;

  constructor(private activeModal: NgbActiveModal,
    private authService: AuthService,
    private loginService: LoginService) { }

  onSignIn(data: NgForm) {
    const credentials: Partial<User> = {
      email: data.form.value.email,
      password: data.form.value.password,
    };

    this.loginService.login(credentials).pipe(
      tap((response: Partial<User>) => {
        this.invalidSignIn = false;
        this.loginService.setUserName(response.name);
        this.authService.setToken(response.token);
        this.closeModal();
      }),
      catchError(() => {
        this.invalidSignIn = true;
        return of();
      })
    ).subscribe();
  }

  onSignUp(data: NgForm) {
    const user: Partial<User> = {
      name: data.form.value.name,
      password: data.form.value.password,
      email: data.form.value.email,
      mobileNumber: data.form.value.mobileNumber,
    };

    this.loginService.addUser(user).pipe(
      tap(() => {
        this.invalidSignUp = false;
        this.closeModal();
      }),
      catchError(() => {
        this.invalidSignUp = true;
        return of();
      })
    ).subscribe();
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
