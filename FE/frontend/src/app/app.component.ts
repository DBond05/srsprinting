import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ContactComponent } from "./components/contact/contact.component";
import { LandingComponent } from "./components/landing/landing.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavBarComponent, ContactComponent, LandingComponent]
})
export class AppComponent {
  title = 'SRS-Printing';
}
