import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { EnvService } from '../../shared/env.service';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  private readonly baseUrl: string = this.env.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private env: EnvService) {}
  
  public scan(file: File) {
    const endpoint = `${this.baseUrl}/pdf`;
    const formData = new FormData(); 
    formData.append('file', file, file.name);

    return this.httpClient.post<{}>(endpoint, formData).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public urlToPdf(url: string): Observable<Blob> {
    const endpoint = `${this.baseUrl}/pdf/fromUrl`;
    return this.httpClient.post(endpoint, null, { params: { url }, responseType: 'blob' });
  }
}