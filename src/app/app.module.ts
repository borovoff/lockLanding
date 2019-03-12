import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {BottomNavbarComponent} from './bottom-navbar/bottom-navbar.component';
import {ThreejsComponent} from './threejs/threejs.component';
import {LockComponent} from './lock/lock.component';
import {MainComponent} from './main/main.component';
import {ContactComponent} from './contact/contact.component';
import {OrderComponent} from './order/order.component';
import {DownloadsComponent} from './downloads/downloads.component';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { PixelSizeDirective } from './directive/pixel-size/pixel-size.directive';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        BottomNavbarComponent,
        ThreejsComponent,
        LockComponent,
        MainComponent,
        ContactComponent,
        OrderComponent,
        DownloadsComponent,
        PixelSizeDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatIconModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressBarModule
    ],
    providers: [{
        provide: 'externalUrlRedirectResolver',
        useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            window.location.href = (route.data as any).externalUrl;
        }
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
