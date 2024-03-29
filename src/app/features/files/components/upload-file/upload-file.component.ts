import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FileManagerService } from '../../services/file-manager.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  standalone: true,
  imports: [AsyncPipe]
})
export class UploadFileComponent {
  
  public fileUploadRef?: Observable<string>;
  
  private file?: File;

  constructor(private fileManagerService: FileManagerService)
  { }

  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files || [];
    this.file = files.length > 0 ? files[0] : undefined;
  }

  submit() {
    if (this.file) {
      this.fileUploadRef = this.fileManagerService.beginPdfConversion(this.file!);
    }
  }
}
