import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['../app.component.scss']
})
export class NavbarComponent {

    items = [
        {name: 'Блог', link: 'https://medium.com/tzar', target: '_blank'},
        {name: 'Связь', link: '/contact', target: '_self'},
        {name: 'Замок', link: '/lock', target: '_self'},
        {name: 'Загрузки', link: '/downloads', target: '_self'},
        {name: 'Предзаказ', link: '/order', target: '_self'}
    ];

    mainItem = {name: 'Главная', link: '', target: '_self'};

    constructor(private router: Router) {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                if (val.url !== '/') {
                    if (!this.items.includes(this.mainItem)) {
                        this.items.unshift(this.mainItem);
                    }
                } else {
                    if (this.items.includes(this.mainItem)) {
                        this.items.shift();
                    }
                }
                document.getElementById('mySidenav').style.width = '0';
            }
        });
    }

    onClickMe() {
        document.getElementById('mySidenav').style.width = '250px';
    }
    onClose() {
        document.getElementById('mySidenav').style.width = '0';
    }
}
