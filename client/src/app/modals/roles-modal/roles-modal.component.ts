import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../../_models/user';

@Component({
  selector: 'app-roles-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TitleCasePipe
  ],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent implements OnInit {

  @Input() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    
  }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
