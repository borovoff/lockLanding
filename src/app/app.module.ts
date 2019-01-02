import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {BottomNavbarComponent} from './bottom-navbar/bottom-navbar.component';
import {SceneComponent} from './scene/scene.component';
import {ThreejsComponent} from './threejs.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        BottomNavbarComponent,
        SceneComponent,
        ThreejsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
