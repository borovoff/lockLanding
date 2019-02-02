import {Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

@Directive({
    selector: '[appPixelSize]'
})
export class PixelSizeDirective implements OnInit {
    @Output() size = new EventEmitter<any>();

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        const height = this.el.nativeElement.clientHeight;
        const width = this.el.nativeElement.clientWidth;

        this.size.emit({height: height, width: width});
    }
}
