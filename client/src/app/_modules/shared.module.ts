import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    FileUploadModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    FileUploadModule,
    ReactiveFormsModule,
    PaginationModule 
  ]
})
export class SharedModule { }
