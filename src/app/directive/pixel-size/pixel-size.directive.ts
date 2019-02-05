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

        el.style.marginLeft = - el.clientWidth / 2 + 'px';
        el.style.marginTop = - el.clientHeight / 2 + 'px';
    }
}
