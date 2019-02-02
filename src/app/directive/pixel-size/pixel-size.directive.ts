import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
    selector: '[appPixelSize]'
})
export class PixelSizeDirective implements OnInit {

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        const height = this.el.nativeElement.clientHeight;
        const width = this.el.nativeElement.clientWidth;

        this.el.nativeElement.style.height = height;
        this.el.nativeElement.style.width = width;
    }
}
