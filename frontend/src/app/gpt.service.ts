import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GptService {
  private apiUrl = 'http://localhost:5050/api/ask';
  
  constructor(private http: HttpClient) {}

  askGPT(query: string) {
    return this.http.post<any>(this.apiUrl, { query });
  }
}
