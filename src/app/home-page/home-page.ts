import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DailyTask } from './daily-task/daily-task';

@Component({
  selector: 'app-home-page',
  imports: [DailyTask],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnDestroy {
  @Output() openApp = new EventEmitter<string>();
  currentDate = '';
  currentTime = '';
  // tiles shown in the app grid: icon path (public/) and label
  readonly items = [
    { icon: 'daily-task-icon.png', label: 'Tâches' },
    { icon: 'bebetopia-icon.jpg', label: 'Bébetopia' },
    { icon: 'museum-icon.jpg', label: 'Musée' },
    { icon: 'inventory-icon.jpg', label: 'Objets' },
    { icon: 'turnip-tracker-icon', label: 'Navets' },
    { icon: 'progress.jpg', label: 'Progression' },
    { icon: 'visitors-icon.jpg', label: 'Visiteurs' },
    { icon: 'villagers-icon.jpg', label: 'Villageois', href: 'app-villagers' },
    { icon: 'settings-icon.jpg', label: 'Options' },
  ];
  private readonly timerId: ReturnType<typeof setInterval>;

  constructor() {
    this.updateDateTime();
    this.timerId = setInterval(() => this.updateDateTime(), 60_000);
  }

  onOpen(href: string): void {
    this.openApp.emit(href);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  private updateDateTime(): void {
    const now = new Date();
    this.currentDate = new Intl.DateTimeFormat(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(now);

    this.currentTime = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(now);
  }
}
