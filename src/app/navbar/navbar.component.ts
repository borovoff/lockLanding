import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    items = [
        {name: 'navbar.blog', link: 'https://medium.com/tzar', target: '_blank'},
        {name: 'navbar.contact', link: '/contact', target: '_self'},
        {name: 'navbar.lock', link: '/lock', target: '_self'},
        {name: 'navbar.downloads', link: '/downloads', target: '_self'},
        {name: 'navbar.order', link: '/order', target: '_self'}
    ];

    mainItem = {name: 'navbar.home', link: '', target: '_self'};
    Languages = Languages;

    constructor(private router: Router,
                private translate: TranslateService) {
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

    switchLanguge(language: string) {
        this.translate.use(language);
        localStorage.setItem('lang', language);
    }
}

export enum Languages {
    English = 'en',
    Russian = 'ru'
}
