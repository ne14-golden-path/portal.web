import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SpaConfig } from '../../config/spa-config.model';

@Injectable({ providedIn: 'root' })
export class PdfService {

  private readonly url: string;

  constructor(private httpClient: HttpClient, env: SpaConfig) {
    this.url = `${env.apiUrl}/pdf`;
  }

  public beginPdfConversion(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<string>(this.url, formData);
  }
}