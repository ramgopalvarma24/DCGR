import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { FormData } from '../Interfaces/formData.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {
  formData:FormData | undefined
 

  constructor(private http: HttpClient) { }

   // sending the report data to backend through API
  PassReportData(formData: any): Observable<any>{
    return this.http.post<any>(' http://localhost:5100//ReportGenerate',formData)
  }
}
