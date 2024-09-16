import { CommonModule, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { Observable } from 'rxjs';
// import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    BsDropdownModule,
    RouterOutlet,
    RouterLink,
    TitleCasePipe,
    LowerCasePipe
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  data: any = {};

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
  }
 
  login() {
    this.accountService.login(this.data).subscribe(response => {
      this.router.navigateByUrl('/members');
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.data = {};
  }
}
