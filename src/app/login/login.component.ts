import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  invalidLogin: boolean = false;

  constructor(private activeModal: NgbActiveModal,
              private loginService: LoginService) { }

  onSignIn(data: NgForm) {
    const credentials: Partial<User> = {
      email: data.form.value.email,
      password: data.form.value.password,
    };

    this.loginService.login(credentials).pipe(
      tap(() => {
        this.invalidLogin = false;
        this.activeModal.close();
      }),
      catchError(() => {
        this.invalidLogin = true;
        return of();
      })
    ).subscribe();
  }

  onSignUp(data: NgForm) {
    const user: User = {
      name: data.form.value.name,
      password: data.form.value.password,
      email: data.form.value.email,
      mobileNumber: data.form.value.mobileNumber,
    };

    this.loginService.addUser(user).pipe(
      tap(() => {
        this.activeModal.close();
      }),
      catchError(() => {
        return of();
      })
    ).subscribe();
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
