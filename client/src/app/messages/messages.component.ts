import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { ConfirmService } from '../_services/confirm.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    ButtonsModule,
    RouterLink,
    TitleCasePipe,
    TimeagoModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService, private confirmService: ConfirmService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;

    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container)
    .subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }

  deleteMessage(id: number) {
    this.confirmService.confirm('Confirm delete message', 'This cannot be undone!', 'Delete').subscribe(result => {
      if(result) {
        this.messageService.deleteMessage(id).subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id == id), 1);
        })
      }
    });
  }

  pageChanged(event: any) {
    // Prevents infinite loading (if loads of messages)
    if(this.pageNumber != event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }

}
