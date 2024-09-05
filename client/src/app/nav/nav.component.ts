import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  data: any = {};

  constructor() {}

  ngOnInit(): void {
    console.log("OnInit called");
  }
 
  login() {
    console.log(this.data);
  }
}
