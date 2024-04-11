
import { AppComponent } from './app/app.component'
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserAnimationsModule, BrowserAnimationsModule)]
})