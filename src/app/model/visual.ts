import * as THREE from 'three';

export class Visual {
    constructor(name: string, material: THREE.MeshStandardMaterial) {
        this.name = name;
        this.material = material;
    }

    name: string;
    material: THREE.MeshStandardMaterial;
}
