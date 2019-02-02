import { Component } from '@angular/core';

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
            case 'Видео':
                this.frameHidden = false;
                this.imgHidden = true;
                this.modelHidden = true;
                break;
            case 'Фото':
                this.imgHidden = false;
                this.frameHidden = true;
                this.modelHidden = true;
                break;
            case 'Нутро':
                this.imgHidden = true;
                this.frameHidden = true;
                this.modelHidden = false;
                break;
            default:
                break;
        }
    }
}
