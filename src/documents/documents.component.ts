import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Observable, of } from "rxjs";

import { PdfService } from "./services/pdf.service";
import { BlobMetaData, LazyPageResult } from "./models/blob-listing.model";
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

  constructor(private pdfService: PdfService) {
    this.blobsPage$ = pdfService.listBlobs();
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
      this.blobsPage$ = this.pdfService.listBlobs();
    });
  }

  onUploadSelected(files: FileList) {
    for (var s = 0; s < files.length; s++) {
      this.pdfService.beginPdfConversion(files[s]).subscribe(r => {
        console.log('upload confirmed:', r);
      });
    }
  }
}