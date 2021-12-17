import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public isUserAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null ? true : false;
  }

  public logout(): void {
    localStorage.removeItem('access_token');
  }
}
