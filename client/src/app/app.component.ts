import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    NavComponent, 
    FormsModule, 
    BsDropdownModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'My Friend App';
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    // // http
    // this.http.get("http://localhost:5066/api/users")
    // .subscribe((res:any) => {
    //   this.users = res;
    // }, error => {
    //   console.log(error);
    // });

    // https
    this.http.get("https://localhost:7118/api/users")
    .subscribe((res:any) => {
      this.users = res;
    }, error => {
      console.log(error);
    });
  }
  
}
