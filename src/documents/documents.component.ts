import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { PdfService } from "./services/pdf.service";
import { Observable } from "rxjs";

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

  fileUploadRef?: Observable<string>;
  file?: File;

  constructor(private pdfService: PdfService) {}

  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files || [];
    this.file = files.length > 0 ? files[0] : undefined;
  }

  submit() {
    if (this.file) {
      this.fileUploadRef = this.pdfService.beginPdfConversion(this.file!);
    }
  }
}