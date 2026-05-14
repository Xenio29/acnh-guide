import { WritableSignal } from "@angular/core";

export interface Village {
    name: string;
    iconPath: string;
    isAdded: WritableSignal<boolean>;
    isFavorite: WritableSignal<boolean>;
}
