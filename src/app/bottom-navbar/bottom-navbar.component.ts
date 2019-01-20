import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-bottom-navbar',
    templateUrl: './bottom-navbar.component.html',
    styleUrls: ['../app.component.scss']
})
export class BottomNavbarComponent {
    @Output() notify = new EventEmitter<any>();

    items = ['Видео'];
    currentItem = 'Фото';

    constructor() {
        if (!this.detectmob()) {
            this.items.push('Нутро');
        }
    }

    change(item) {
        const index = this.items.indexOf(item);

        this.items[index] = this.currentItem;
        this.currentItem = item;

        this.notify.emit(item);
    }

    detectmob() {
        if ( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false;
        }
    }
}
