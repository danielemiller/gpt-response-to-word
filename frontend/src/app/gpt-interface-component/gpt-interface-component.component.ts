import { Component } from '@angular/core';
import { GptService } from '../gpt.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QueryFormComponent } from '../query-form/query-form.component';
import { ResponseDisplayComponent } from '../response-display/response-display.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-gpt-interface',
  standalone: true,
  imports: [CommonModule, QueryFormComponent, ResponseDisplayComponent, NavBarComponent, HttpClientModule, FooterComponent, LoadingSpinnerComponent],
  template: `
    <app-nav-bar></app-nav-bar>
    <app-loading-spinner *ngIf="isLoading"></app-loading-spinner>
    <app-query-form (loadingStart)="onLoadingStart()" (responseEvent)="handleResponse($event)" (errorEvent)="handleError($event)" (loadingStart)="startLoading()" (loadingEnd)="stopLoading()"></app-query-form>
    <app-response-display [requestMade]="requestMade" [responseData]="responseObj"></app-response-display>
    <div class="button-container">  
      <button *ngIf="responseObj?.response" (click)="downloadResponse()" class="global-button">Download as Word Document</button>
    </div>
    <p *ngIf="error" class="error">{{ error }}</p>
    <app-footer></app-footer>
  `,
  styleUrls: ['./gpt-interface-component.component.css']
})
export class GptInterfaceComponent {
  isLoading: boolean = false;
  requestMade: boolean = false;

  responseObj: { query: string; response: string } | null = null;
  error: string | null = null;

  constructor(private gptService: GptService) {}

  handleResponse(data: { query: string; response: string }) {
    this.responseObj = data;
  }

  handleError(error: string) {
    this.error = error;
  }

  startLoading() {
    this.isLoading = true;
  }

  onLoadingStart() {
    this.requestMade = true;
  }

  stopLoading() {
    this.isLoading = false;
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