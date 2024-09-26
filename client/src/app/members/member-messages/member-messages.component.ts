import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TimeagoModule,
    AsyncPipe
  ],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {

  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[] = [];
  @Input() username: string;
  messageContent: string;

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
  } 

  sendMessage() {
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm.reset();
    });
  }

}
