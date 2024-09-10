import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const accountService = inject(AccountService);

  let currentUser: User;
  accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

  if(currentUser) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
  }

  return next(req);
};
