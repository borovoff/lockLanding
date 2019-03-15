import { Component } from '@angular/core';
import {BottomNavbar} from '../bottom-navbar/bottom-navbar.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['../app.component.scss']
})
export class MainComponent {
    imgHidden = false;
    frameHidden = true;
    modelHidden = true;

    onNotify(item) {
        switch (item) {
            case BottomNavbar.Video:
                this.frameHidden = false;
                this.imgHidden = true;
                this.modelHidden = true;
                break;
            case BottomNavbar.Photo:
                this.imgHidden = false;
                this.frameHidden = true;
                this.modelHidden = true;
                break;
            case BottomNavbar.Inside:
                this.imgHidden = true;
                this.frameHidden = true;
                this.modelHidden = false;
                break;
            default:
                break;
        }
    }
}
