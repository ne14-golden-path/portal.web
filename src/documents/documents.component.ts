import { CommonModule, DecimalPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { PdfService } from "./services/pdf.service";
import { Observable, of } from "rxjs";
import { BlobListing } from "./models/blob-listing.model";

@Component({
    selector: 'app-documents',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
    ],
    templateUrl: './documents.component.html',
    styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

  blobs$: Observable<BlobListing[]> = of([]);
  fileUploadRef?: Observable<string>;
  file?: File;

  constructor(private pdfService: PdfService) {
    this.blobs$ = pdfService.listBlobs();
  }

  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files || [];
    this.file = files.length > 0 ? files[0] : undefined;
  }

  submit() {
    if (this.file) {
      this.fileUploadRef = this.pdfService.beginPdfConversion(this.file!);
    }
  }

  download(blobReference: string) {
    this.pdfService.download(blobReference).subscribe(response => {
      //console.log(response.headers.get('content-disposition'));
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(response.body!);
      link.download = 'myfile.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }
}