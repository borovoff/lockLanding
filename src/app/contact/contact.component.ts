import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['../app.component.scss']
})
export class ContactComponent {
    socials = [
        {name: 'lock.tzar', href: 'https://instagram.com/lock.tzar', svgIcon: 'instagram'},
        {name: 'lock.tzar', href: 'https://vk.com/lock.tzar', svgIcon: 'vk'},
        {name: 'locktzar', href: 'https://t.me/locktzar', svgIcon: 'telegram'},
    ];

    contacts = [
        {name: '+7(952)273-44-96', href: 'tel:79522734496', svgIcon: 'phone'},
        {name: 'andrshab', href: 'https://t.me/andrshab', svgIcon: 'telegram'},
        {name: 'tzarsharing@gmail.com', href: 'mailto:tzarsharing@gmail.com', svgIcon: 'mail'},
    ];

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        const path = 'assets/images/';

        for (const social of this.socials) {
            this.matIconRegistry.addSvgIcon(
                social.svgIcon,
                this.domSanitizer.bypassSecurityTrustResourceUrl(path + social.svgIcon + '.svg')
            );
        }
    }
}
