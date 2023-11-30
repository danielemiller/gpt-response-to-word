import { Component, EventEmitter, Output } from '@angular/core';
import { GptService } from '../gpt.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-query-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './query-form.component.html',
})
export class QueryFormComponent {
  userQuery = '';
  isLoading = false;
  error: string | null = null;
  @Output() responseEvent = new EventEmitter<{query: string, response: string}>();  // Emit the query and response
  @Output() errorEvent = new EventEmitter<string>();     // Emit any errors

  constructor(private gptService: GptService) {}

  submitQuery() {
    this.isLoading = true;
    this.gptService.askGPT(this.userQuery).subscribe({
      next: (data) => {
        console.log(data);
        this.isLoading = false;
        this.responseEvent.emit({query: this.userQuery, response: data});  // Emit the query and response together
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