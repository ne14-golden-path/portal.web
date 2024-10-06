import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SpaConfig } from '../../config/spa-config.model';
import { BlobMetaData, LazyPageResult } from '../models/blob-listing.model';

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

  public listBlobs() {
    return this.httpClient.get<LazyPageResult<BlobMetaData>>(this.url);
  }

  public download(blobReference: string) {
    return this.httpClient.get(`${this.url}/${blobReference}`, { observe: 'response', responseType: 'blob' })
  }

  public delete(blobReference: string) {
    return this.httpClient.delete(`${this.url}/${blobReference}`);
  }
}