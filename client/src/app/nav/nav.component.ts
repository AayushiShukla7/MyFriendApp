import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    BsDropdownModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  data: any = {};
  loggedIn: boolean;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    console.log("OnInit called");
  }
 
  login() {
    //console.log(this.data);
    this.accountService.login(this.data).subscribe(response => {
      console.log(response);
      this.loggedIn = true;
    }, error => {
      console.log(error);
    });
  }

  logout() {
    this.loggedIn = false;
  }
}
