import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent {
    path = {google: '', apple: ''};

    constructor(private translate: TranslateService) {
        const current = translate.currentLang;
        this.path = {google: current, apple: current};

        translate.onLangChange.subscribe(result =>
            this.path = {google: result.lang, apple: result.lang}
        );
    }
}
