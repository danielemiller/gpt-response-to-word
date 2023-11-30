import { Component, Input } from '@angular/core';;
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-response-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-display.component.html',
  styleUrls: ['./response-display.component.css']
})
export class ResponseDisplayComponent {
  @Input() response: string | null;
  
  constructor(){
    this.response = null;
  }
}
