import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.html',
  styleUrls: ['./daily-task.css'],
  // lightweight standalone-style component pattern; parent will import it
})
export class DailyTask {
  @Input() icon = '';
  @Input() label = '';
  @Input() href = '';
  @Output() open = new EventEmitter<string>();

  openApp(): void {
    this.open.emit(this.href || this.label);
  }
}
