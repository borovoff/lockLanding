import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
    selector: '[appPixelSize]'
})
export class PixelSizeDirective implements OnInit {
    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        this.set();
    }

    @HostListener('window:resize')
    public resize() {
        this.set();
    }

    set() {
        const el = this.el.nativeElement;

        const height = el.clientHeight;
        const width = el.clientWidth;

        el.style.marginLeft = - width / 2 + 'px';
        el.style.marginTop = - height / 2 + 'px';
    }
}
