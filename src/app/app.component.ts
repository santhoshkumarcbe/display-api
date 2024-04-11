import { Component } from '@angular/core';
import { DisplayApiDataComponent } from './display-api-data/display-api-data.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [DisplayApiDataComponent],
    providers: [MatDialog]
})

export class AppComponent {
  title = 'display-api';
}