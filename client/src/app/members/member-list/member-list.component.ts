import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Pagination } from '../../_models/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MemberCardComponent,
    PaginationModule
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberService: MembersService){}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMembers();
  }

}
