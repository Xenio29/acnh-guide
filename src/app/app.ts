import { Component, signal } from '@angular/core';
import { IslandCreate } from "./island-create/island-create";
import { SupabaseService } from './supabase.service';

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

  constructor() {
    (async () => {
      try {
        const device = SupabaseService.getOrCreateDeviceFootprint();
        const accounts = await SupabaseService.getAccountByDevice(device);
        if (accounts && accounts.length > 0) {
          const account = accounts[0];
          const data = await SupabaseService.getDataById(account.id);
          console.log('Loaded account:', account);
          console.log('Loaded data:', data);
          this.landingPageHidden.set(true);
        } else {
          // show landing page (allow user to create island)
          this.landingPageHidden.set(false);
        }
      } catch (err) {
        console.error('Error checking supabase for device footprint', err);
        this.landingPageHidden.set(false);
      }
    })();
  }
}