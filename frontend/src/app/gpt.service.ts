import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GptService {
  private apiUrl = 'http://localhost:5050/api';
  
  constructor(private http: HttpClient) {}

  askGPT(query: string) {
    return this.http.post<any>(`${this.apiUrl}/ask`, { query });
  }

  downloadDocument(query: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/generate-document`, { query }, { responseType: 'blob' as 'json' });
  }
}
