import { Component } from '@angular/core';
import { GptService } from '../gpt.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QueryFormComponent } from '../query-form/query-form.component';
import { ResponseDisplayComponent } from '../response-display/response-display.component';

@Component({
  selector: 'app-gpt-interface',
  standalone: true,
  imports: [CommonModule, QueryFormComponent, ResponseDisplayComponent, HttpClientModule],
  template: `
    <app-query-form (responseEvent)="handleResponse($event)" (errorEvent)="handleError($event)"></app-query-form>
    <app-response-display [responseData]="responseObj"></app-response-display>
    <button *ngIf="responseObj?.response" (click)="downloadResponse()">Download as Word Document</button>
    <p *ngIf="error" class="error">{{ error }}</p>
  `
})
export class GptInterfaceComponent {
  responseObj: { query: string; response: string } | null = null;
  error: string | null = null;

  constructor(private gptService: GptService) {}

  handleResponse(data: { query: string; response: string }) {
    this.responseObj = data;
  }

  handleError(error: string) {
    this.error = error;
  }

  downloadResponse() {
    if (this.responseObj?.query) {
      this.gptService.downloadDocument(this.responseObj?.query).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'response.docx';
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
}