import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  registerMode = false;
  
  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

}
