import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {

  @Input() username: string;
  messages: Message[];

  constructor(private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessageThread(this.username).subscribe(messages => {
      this.messages = messages;
    })
  }

}
