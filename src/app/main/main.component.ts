import { Component } from '@angular/core';
import {BottomNavbar} from '../bottom-navbar/bottom-navbar.component';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['../app.component.scss']
})
export class MainComponent {
    imgHidden = false;
    frameHidden = true;
    modelHidden = true;
    link: string;

    constructor(private translate: TranslateService,
                private sanitizer: DomSanitizer) {
        this.link = 'https://www.youtube.com/embed/9gXVjCm82pM?rel=0&modestbranding=1';
    }

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
