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
        DownloadsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
