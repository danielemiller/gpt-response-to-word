import { Component } from '@angular/core';
import { GptService } from '../gpt.service';

@Component({
  selector: 'app-gpt-interface',
  template: `
    <app-query-form (responseEvent)="handleResponse($event)" (errorEvent)="handleError($event)"></app-query-form>
    <app-response-display [response]="response"></app-response-display>
    <button *ngIf="response" (click)="downloadResponse()">Download as Word Document</button>
    <p *ngIf="error" class="error">{{ error }}</p>
  `
})
export class GptInterfaceComponent {
  response: string | null = null;
  error: string | null = null;

  constructor(private gptService: GptService) {}

  handleResponse(data: string) {
    this.response = data;
  }

  handleError(error: string) {
    this.error = error;
  }

  downloadResponse() {
    if (this.response) {
      this.gptService.downloadDocument(this.response).subscribe(blob => {
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