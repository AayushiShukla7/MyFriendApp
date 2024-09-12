import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabsModule
  ],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {

  member: Member;
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService) {
    // Fetch current user from Account Service
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => this.member = member);
  }

}
