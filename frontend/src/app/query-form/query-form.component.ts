import { Component, EventEmitter, Output } from '@angular/core';
import { GptService } from '../gpt.service';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrl: './query-form.component.css'
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
}