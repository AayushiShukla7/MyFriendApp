import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { loadingInterceptor } from './_interceptors/loading.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileDropDirective, FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptors([
      errorInterceptor, 
      jwtInterceptor,
      loadingInterceptor
    ]),),
    { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } },
    provideToastr(),
    provideAnimationsAsync(),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'pacman' })),
    importProvidersFrom([FileUploadModule, FileSelectDirective, FileDropDirective]),
    importProvidersFrom(PaginationModule)
  ]
};
