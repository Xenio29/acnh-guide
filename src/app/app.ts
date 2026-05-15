import { Component, signal } from '@angular/core';
import { IslandCreate } from "./island-create/island-create";
import { SupabaseService } from './supabase.service';
import { HomePage } from './home-page/home-page';
import { Villagers } from './villagers/villagers';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [IslandCreate, HomePage, Villagers]
})
export class App {
  readonly currentView = signal<'landing' | 'create' | 'home' | 'villagers'>('landing');
  private userOpenedIslandCreate = false;

  hideLandingPage(): void {
    this.userOpenedIslandCreate = true;
    this.currentView.set('create');
  }

  showHomePage(): void {
    this.currentView.set('home');
  }

  openApp(target: string): void {
    const key = (target || '').toString();
    if (key === 'villagers' || key === 'Villageois' || key === 'app-villagers') {
      this.currentView.set('villagers');
    }
  }

  constructor() {
    (async () => {
      try {
        const device = SupabaseService.getOrCreateDeviceFootprint();
        const accounts = await SupabaseService.getAccountByDevice(device);
        if (this.userOpenedIslandCreate) {
          return;
        }

        if (accounts && accounts.length > 0) {
          const account = accounts[0];
          const data = await SupabaseService.getDataById(account.id);
          console.log('Loaded account:', account);
          console.log('Loaded data:', data);
          this.currentView.set('home');
        } else {
          this.currentView.set('landing');
        }
      } catch (err) {
        console.error('Error checking supabase for device footprint', err);
        if (!this.userOpenedIslandCreate) {
          this.currentView.set('landing');
        }
      }
    })();
  }
}