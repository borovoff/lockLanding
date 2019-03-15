import {Euler, Vector3} from 'three';

export class Moving {
    constructor(position: Vector3 = null, rotation: Euler = null) {
        this.position = position;
        this.rotation = rotation;
    }

    position: Vector3;
    rotation: Euler;
}
