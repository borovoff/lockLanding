import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-bottom-navbar',
    templateUrl: './bottom-navbar.component.html',
    styleUrls: ['../app.component.scss']
})
export class BottomNavbarComponent {
    @Output() notify = new EventEmitter<any>();

    items = ['Видео', 'Нутро'];
    currentItem = 'Фото';

    change(item) {
        const index = this.items.indexOf(item);

        this.items[index] = this.currentItem;
        this.currentItem = item;

        this.notify.emit(item);
    }
}
