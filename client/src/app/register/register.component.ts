import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  register() {
    console.log(this.model);
  }

  cancel() {
    console.log('cancelled');
  }

}
