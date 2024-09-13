import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment.development';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { finalize, Subscription, take } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {

  @Input() member: Member;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  
  // fileName = '';
  // uploadProgress:number;
  // uploadSub: Subscription;
  // @Input()
  //   requiredFileType:string;

  constructor(private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  // onFileSelected(event) {
  //   debugger;

  //   const file:File = event.target.files[0];
  
  //   if (file) {
  //       this.fileName = file.name;
  //       const formData = new FormData();
  //       formData.append("thumbnail", file);

  //       const upload$ = this.http.post("/api/thumbnail-upload", formData, {
  //           reportProgress: true,
  //           observe: 'events'
  //       })
  //       .pipe(
  //           finalize(() => this.reset())
  //       );
      
  //       this.uploadSub = upload$.subscribe(event => {
  //         if (event.type == HttpEventType.UploadProgress) {
  //           this.uploadProgress = Math.round(100 * (event.loaded / event.total));
  //         }
  //       })
  //     }
  //   }

  //   cancelUpload() {
  //     this.uploadSub.unsubscribe();
  //     this.reset();
  //   }

  //   reset() {
  //     this.uploadProgress = null;
  //     this.uploadSub = null;
  //   }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 *1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }

}
