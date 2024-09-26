import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './_modules/shared.module';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { HasRoleDirective } from './_directives/has-role.directive';
import { PresenceService } from './_services/presence.service';

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
    NgxSpinnerComponent,
    FileUploadModule,
    HasRoleDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'My Social App';
  users: any;

  constructor(private accountService: AccountService, private presence: PresenceService) {}

  ngOnInit() {
    this.SetCurrentUser();
  }

  SetCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if(user) {
      this.accountService.SetCurrentUser(user);
      this.presence.createHubConnection(user);
    }    
  }
  
}
