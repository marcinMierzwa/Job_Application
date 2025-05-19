import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    displayAlert(message: string): void {
        alert(message);
    }
}