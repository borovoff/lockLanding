import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['../app.component.scss']
})
export class ContactComponent {
    contacts = [
        {name: 'bike.tzar', href: 'https://instagram.com/bike.tzar', svgIcon: 'instagram'},
        {name: 'bike.tzar', href: 'https://vk.com/bike.tzar', svgIcon: 'vk'},
        {name: 'tzarsharing@gmail.com', href: 'mailto:tzarsharing@gmail.com', svgIcon: 'mail'},
        {name: 'biketzar', href: 'https://t.me/biketzar', svgIcon: 'telegram'},
    ];

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        const path = 'assets/images/';

        for (const contact of this.contacts) {
            this.matIconRegistry.addSvgIcon(
                contact.svgIcon,
                this.domSanitizer.bypassSecurityTrustResourceUrl(path + contact.svgIcon + '.svg')
            );
        }
    }
}
