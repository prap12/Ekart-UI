import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginService } from 'src/app/login/login.service';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName: string;

  constructor(private modalService: NgbModal,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getUserName().subscribe((name) => {
      this.userName = name;
    });
  }

  login() {
    this.modalService.open(LoginComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static',
    });
  }

}
