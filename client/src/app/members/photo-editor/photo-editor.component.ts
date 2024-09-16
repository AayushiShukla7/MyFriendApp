import { Component, Input, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment.development';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { finalize, map, Subscription, take } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [
    CommonModule,
    
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

  constructor(private accountService: AccountService, private toastr: ToastrService, private http: HttpClient) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    //this.initializeUploader();
  }

  // Idea #1
  // fileOverBase(e: any) {
  //   this.hasBaseDropZoneOver = e;
  // }

  // initializeUploader() {
  //   this.uploader = new FileUploader({
  //     url: this.baseUrl + 'users/add-photo',
  //     authToken: 'Bearer ' + this.user.token,
  //     isHTML5: true,
  //     allowedFileType: ['image'],
  //     removeAfterUpload: true,
  //     autoUpload: false,
  //     maxFileSize: 10 * 1024 *1024
  //   });

  //   this.uploader.onAfterAddingFile = (file) => {
  //     file.withCredentials = false;
  //   }

  //   this.uploader.onSuccessItem = (item, response, status, headers) => {
  //     if(response) {
  //       const photo = JSON.parse(response);
  //       this.member.photos.push(photo);
  //     }
  //   }
  // }

  // Idea #2
  imageName = signal('');
  fileSize = signal(0);
  uploadProgress = signal(0);
  imagePreview = signal('');
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;

  // Handler for file input change
  onFileChange(event: any): void {
    const file = event.target.files[0] as File | null;
    this.uploadFile(file);
  }

  // Handler for file drop
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0] as File | null;
    this.uploadFile(file);
  }

  // Prevent default dragover behavior
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // Method to handle file upload
  uploadFile(file: File | null): void {
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.fileSize.set(Math.round(file.size / 1024)); // Set file size in KB

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview.set(e.target?.result as string); // Set image preview URL
      };
      reader.readAsDataURL(file);

      this.uploadSuccess = true;
      this.uploadError = false;
      this.imageName.set(file.name); // Set image name

      // Upload file via API
      const formData = new FormData();
      formData.append("file", file);

      this.http.post(this.baseUrl + 'users/add-photo', formData).subscribe((res:any) => {
        //console.log(res);
        this.member.photos.push(res);
        this.removeImage();
      },
      error => {
        console.log(error);
      });
    } 
    else {
      this.uploadSuccess = false;
      this.uploadError = true;
      this.toastr.error('Only image files are supported!', '', { positionClass: 'toast-bottom-right' });
    }
  }

  // Method to remove the uploaded image
  removeImage(): void {
    this.selectedFile = null;
    this.imageName.set('');
    this.fileSize.set(0);
    this.imagePreview.set('');
    this.uploadSuccess = false;
    this.uploadError = false;
    this.uploadProgress.set(0);
  }

}
