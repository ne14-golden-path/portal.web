import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Observable, of } from "rxjs";

import { PdfService } from "./services/pdf.service";
import { BlobMetaData, LazyPageResult, PageRequest } from "./models/blob-listing.model";
import { UploadComponent } from "../controls/uploader/upload.component";

@Component({
    selector: 'app-documents',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      UploadComponent,
    ],
    templateUrl: './documents.component.html',
    styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

  blobsPage$: Observable<LazyPageResult<BlobMetaData>> = of();
  paging: PageRequest = { pageNumber: 1, pageSize: 50 };

  constructor(private pdfService: PdfService) {
    this.blobsPage$ = pdfService.listBlobs(this.paging);
  }

  download(blobReference: string) {
    this.pdfService.download(blobReference).subscribe(response => {
      const rawDisposition = response.headers.get('Content-Disposition') || '';
      const fileName = (rawDisposition.match(/\bfilename="?([^";]*)"?;/) || ['','']) [1];
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(response.body!);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }

  deleteBlob(blobReference: string) {
    this.pdfService.delete(blobReference).subscribe(_ => {
      this.blobsPage$ = this.pdfService.listBlobs(this.paging);
    });
  }

  onUploadSelected(files: File[]) {
    files.forEach(f => {
      this.pdfService.beginPdfConversion(f).subscribe(r => {
        console.log('upload confirmed:', r);
      });
    });
  }
}