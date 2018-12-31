import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['../app.component.scss']
})
export class NavbarComponent {
    items = ['Блог', 'Связь', 'Об аренде', 'Предзаказ'];
}
