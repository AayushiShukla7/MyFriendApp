import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { PresenceService } from '../../_services/presence.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    AsyncPipe
],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {

  @Input() member: Member;

  constructor(private memberService: MembersService, private toastr: ToastrService, public presenceService : PresenceService) {}

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs, '', { positionClass: 'toast-bottom-right' });
    })
  }
}
