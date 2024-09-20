import { Component } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MemberCardComponent,
    PaginationModule,
    ButtonsModule
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

  members: Partial<Member>[];
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private memberService: MembersService) {}

  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadLikes();
  }

}
