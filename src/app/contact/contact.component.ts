import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['../app.component.scss']
})
export class ContactComponent {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        const path = 'assets/images/';
        this.matIconRegistry.addSvgIcon(
            'instagram',
            this.domSanitizer.bypassSecurityTrustResourceUrl(path + 'instagram.svg')
        );
        this.matIconRegistry.addSvgIcon(
            'telegram',
            this.domSanitizer.bypassSecurityTrustResourceUrl(path + 'telegram.svg')
        );
        this.matIconRegistry.addSvgIcon(
            'vk',
            this.domSanitizer.bypassSecurityTrustResourceUrl(path + 'vk.svg')
        );
    }
}
