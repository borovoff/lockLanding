import * as THREE from 'three';
import {Vector3} from 'three';

export class SceneAnimation {
    constructor(scene: THREE.Scene, animation: Vector3) {
        this.scene = scene;
        this.animation = animation;
    }

    scene: THREE.Scene;
    animation: Vector3;
}
