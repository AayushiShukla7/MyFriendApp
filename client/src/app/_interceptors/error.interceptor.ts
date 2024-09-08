import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      if(error) {
        switch (error.status) {
          case 400:
            // If multiple validation errors happen (array of errors)
            if(error.error.errors) {
              const modelStateErrors = [];
              
              for(const key in error.error.errors) {
                if(error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key])
                }
              }
              throw modelStateErrors.flat();
            }
            else if (typeof(error.error) === 'object') {
              toastr.error(error.statusText, error.status, { positionClass: 'toast-bottom-right' });
            } else {
              toastr.error(error.error, error.status, { positionClass: 'toast-bottom-right' });
            }
            break;
          case 401:
            toastr.error(error.statusText, error.status, { positionClass: 'toast-bottom-right' });
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {state: {error: error.error}};
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('Something unexpected went wrong', '', { positionClass: 'toast-bottom-right' });
            console.log(error);
            break;
        }
      }
      return throwError(error);
    })
  );
};
