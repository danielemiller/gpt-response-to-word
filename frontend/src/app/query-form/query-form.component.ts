import { Component, EventEmitter, Output } from '@angular/core';
import { GptService } from '../gpt.service';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css']
})
export class QueryFormComponent {
  userQuery = '';
  isLoading = false;
  @Output() responseEvent = new EventEmitter<string>();  // Emit the response
  @Output() errorEvent = new EventEmitter<string>();     // Emit any errors

  constructor(private gptService: GptService) {}

  submitQuery() {
    this.isLoading = true;
    this.gptService.askGPT(this.userQuery).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.responseEvent.emit(data.response);  // Emit the response
      },
      error: (err) => {
        this.isLoading = false;
        this.errorEvent.emit(err.message || 'An error occurred');
      }
    });
  }

  downloadResponse() {
    this.gptService.downloadDocument(this.userQuery).subscribe(blob => {
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
  
      // Create an anchor element and set the href to the blob URL
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'response.docx';  // Set a filename for the downloaded document
  
      // Append the anchor to the body, click it to initiate download, and then remove it
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
  
      // Release the blob URL
      window.URL.revokeObjectURL(url);
    });
  }
}