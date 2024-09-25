import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

export const AdminGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map(user => {
      console.log(user);

      if(user === null || user === undefined) return;

      if(user.roles?.includes('Admin') || user.roles?.includes('Moderator')) {
        return true;
      }

      toastr.error("You cannot enter this area", "", { positionClass: 'toast-bottom-right' });
    })
  );
  
};
