import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    main = true;

    constructor(private router: Router,
                private translate: TranslateService) {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.main = val.url !== '/';
            }
        });

        translate.addLangs(['en', 'ru']);
        translate.setDefaultLang('en');

        let lang = localStorage.getItem('lang');
        if (!lang) {
            const browserLang = translate.getBrowserLang();
            lang = browserLang.match(/en|ru/) ? browserLang : 'en';
            localStorage.setItem('lang', lang);
        }
        translate.use(lang);
    }
}
