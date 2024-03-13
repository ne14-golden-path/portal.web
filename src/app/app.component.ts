import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadFileComponent } from './features/files/components/upload-file/upload-file.component';
import { ConvertPdfComponent } from './features/files/components/convert-pdf/convert-pdf.component';
import { EnvService } from './features/shared/env.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadFileComponent, ConvertPdfComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portal web';

  constructor(public env: EnvService) {
  }
}
