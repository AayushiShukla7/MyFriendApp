import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './_modules/shared.module';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [     
    NavComponent, 
    FormsModule,     
    HomeComponent,    
    SharedModule,
    RouterOutlet, 
    RouterLink,
    NgxSpinnerModule,
    NgxSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'My Social App';
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
