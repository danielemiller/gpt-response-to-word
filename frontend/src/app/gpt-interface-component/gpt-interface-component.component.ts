import { Component } from '@angular/core';

@Component({
  selector: 'app-gpt-interface',
  template: `
    <app-query-form (responseEvent)="handleResponse($event)" (errorEvent)="handleError($event)"></app-query-form>
    <app-response-display [response]="response"></app-response-display>
    <p *ngIf="error" class="error">{{ error }}</p>
  `
})
export class GptInterfaceComponent {
  response: string | null = null;
  error: string | null = null;

  handleResponse(data: string) {
    this.response = data;
  }

  handleError(error: string) {
    this.error = error;
  }
}
