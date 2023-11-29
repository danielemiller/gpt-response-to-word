import { Component, Input } from '@angular/core';;

@Component({
  selector: 'app-response-display',
  templateUrl: './response-display.component.html',
  styleUrl: './response-display.component.css'
})
export class ResponseDisplayComponent {
  @Input() response: string;
  
  constructor(){
    this.response = '';
  }
}
