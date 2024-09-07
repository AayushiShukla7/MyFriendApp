import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    NavComponent, 
    FormsModule, 
    BsDropdownModule,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'My Friend App';
  users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.SetCurrentUser();
  }

  SetCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.SetCurrentUser(user);
  }
  
}
