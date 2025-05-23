import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-base-button',
  imports: [MatButtonModule],
  templateUrl: './base-button.component.html',
  styleUrl: './base-button.component.scss'
})
export class BaseButtonComponent {
  text = input<string>();
  disabled = input<boolean>(false);
  type = input();
}
