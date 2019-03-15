import {Vector3} from 'three';
import {Moving} from './moving';
import {Visual} from './visual';

export class Folder {
    constructor(name: string, moving: Moving = null, visuals: Visual[] = null, animation: Vector3 = null) {
        this.name = name;
        this.moving = moving;
        this.visuals = visuals;
        this.animation = animation;
    }

    name: string;
    moving: Moving;
    visuals: Visual[];
    animation: Vector3;
}
