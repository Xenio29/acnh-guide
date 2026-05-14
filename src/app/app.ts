import { Component, signal } from '@angular/core';
import { IslandCreate } from "./island-create/island-create";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [IslandCreate]
})
export class App {
  readonly landingPageHidden = signal(false);

  hideLandingPage(): void {
    this.landingPageHidden.set(true);
  }
}