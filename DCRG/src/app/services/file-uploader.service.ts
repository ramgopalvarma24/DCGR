import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(private http:HttpClient) { }

  uploadFiles(fileFormData : FormData){
    
    return this.http.post<any>(' http://localhost:5100//FileUpload',fileFormData);
  }
}
