import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadFileComponent } from './features/files/components/upload-file/upload-file.component';
import { EnvService } from './features/shared/env.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadFileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portal web';

  constructor(public env: EnvService) {
  }
}
