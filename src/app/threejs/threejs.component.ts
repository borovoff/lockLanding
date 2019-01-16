import {Component, ViewChild, ElementRef, AfterViewInit, HostListener} from '@angular/core';
import * as THREE from 'three';
import './js/EnableThreeExamples';
import 'three/examples/js/loaders/ColladaLoader';
import 'three/examples/js/loaders/GLTFLoader';
import 'three/examples/js/controls/OrbitControls';
import {Euler, GLTF, Vector3} from 'three';

@Component({
    selector: 'app-threejs',
    templateUrl: './threejs.component.html',
    styleUrls: ['../app.component.scss']
})
export class ThreejsComponent implements AfterViewInit {
    @ViewChild('rendererContainer')
    rendererContainer: ElementRef;

    renderer = new THREE.WebGLRenderer();
    scene = null;
    camera: THREE.PerspectiveCamera;
    controls: THREE.OrbitControls;
    height;
    width;
    scenes = [];
    path = 'assets/model/';
    currentPath: string;
    currentFolder;
    currentSubFolder;
    loader;
    i;

    folders = [
            // new Folder('arc',
            //     new Moving(new Vector3(0, - 0.008, 0.01), new Euler(0, - Math.PI * 0.5)),
            //     new Vector3(0, 0.05)),
            // new Folder('body'),
            // new Folder('rama'),
            // new Folder('motherBody'),
        // new Folder('long', new Moving(new Vector3(0.008, 0.0075 + 0.008, 0.02), new Euler(Math.PI * 0.5, 0, Math.PI * 0.5))),
        // new Folder('short', new Moving(new Vector3(- 0.008, 0.0075, 0.1), new Euler(- Math.PI * 0.5, 0, - Math.PI * 0.5))),
            // new Folder('stopper'),
            // new Folder('battery'),
            // new Folder('bluetooth'),
            // new Folder('button'),
            // new Folder('capWithQR'),
            new Folder('GBA_LE.gltf', new Moving(new Vector3(- 0.014, 0, 0.073), new Euler(Math.PI * 0.5, 0, - Math.PI * 0.5))),
            // new Folder('gsm'),
            // new Folder('servo'),
            // new Folder('accumHolder'),
            // new Folder('antennaCap'),
            // new Folder('antennaTorez', new Moving(new Vector3(0, 0, - 0.003), new Euler(0, Math.PI, 0))),
            // new Folder('buttonRing'),
            // new Folder('buttonTorez', new Moving(new Vector3(0, 0, 0.1595), new Euler(0, Math.PI, 0))),
            // new Folder('doubleGask'),
            // new Folder('motherBodyHolder'),
            // new Folder('singleGask'),
    ];

    constructor() {
        this.scene = new THREE.Scene();
        const light = new THREE.PointLight(0xffffff, 3, 1000);
        light.position.set(100, 100, 100);
        this.scene.add(light);
        this.scene.add( new THREE.AmbientLight( 0x404040 ) );

        this.camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 10;
        console.log(this.camera.position);
        this.loadingCompleted = this.loadingCompleted.bind(this);

        this.i = 0;
        this.load();

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.center.z = 0.08;
        this.controls.center.y = 0.08;
    }

    loadingCompleted(gltf: GLTF) {

        const folder = this.folders[this.i];
        const moving = this.folders[this.i].moving;
        if (moving !== null) {
            gltf.scene.position.x = moving.position.x;
            gltf.scene.position.y = moving.position.y;
            gltf.scene.position.z = moving.position.z;
            gltf.scene.setRotationFromEuler(moving.rotation);
        }

        console.log(gltf);

        this.scenes.push(new SceneAnimation(gltf.scene, folder.animation === null ? null : folder.animation));
        this.scene.add(gltf.scene);
        this.renderer.render(this.scene, this.camera);

        this.i++;
        if (this.i < this.folders.length) {
            this.load();
        }
    }

    load() {
        this.loader = new THREE.GLTFLoader();
        const folder = this.folders[this.i].name;
        const fullPath = this.path + folder + '_out/' + folder + '.gltf';
        this.loader.load(fullPath, this.loadingCompleted);
    }

    private get canvas(): HTMLCanvasElement {
        return this.rendererContainer.nativeElement;
    }

    ngAfterViewInit() {
        this.setView();
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event) {
        this.setView();
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event) {
        if (event.key === 'Enter') {
            this.expand();
        }
    }

    setView() {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }

    expand() {
        for (let j = 0; j < this.scenes.length; j++) {
            const sceneAnimation = this.scenes[j];
            const anima = sceneAnimation.animation;
            const scene = sceneAnimation.scene;

            if (anima !== null) {
                if (anima.x !== 0) {
                    this.scenes[j].scene.position.x += 0.0005;
                    window.requestAnimationFrame(() => this.expand());
                }

                if (anima.y !== 0 && this.scenes[j].scene.position.y < anima.y) {
                    this.scenes[j].scene.position.y += 0.0005;
                    window.requestAnimationFrame(() => this.expand());
                }

                if (anima.z !== 0) {
                    this.scenes[j].scene.position.z += 0.0005;
                    window.requestAnimationFrame(() => this.expand());
                }
            }

        }
        // if (this.scenes[1].position.y < 0.05) {
        //     this.scenes[1].position.y += 0.0005;
        //     window.requestAnimationFrame(() => this.expand());
        // } else if (this.scenes[2].position.z > -0.1) {
        //     this.scenes[2].position.z -= 0.0005;
        //     this.scenes[0].position.z += 0.0005;
        //     window.requestAnimationFrame(() => this.expand());
        // }
    }

    animate() {
        window.requestAnimationFrame(() => this.animate());
        // this.modelScene.position.x += 0.0005;
        this.renderer.render(this.scene, this.camera);
    }
}

export class Folder {
    constructor(name: string, moving: Moving = null, animation: Vector3 = null) {
        this.name = name;
        this.moving = moving;
        this.animation = animation;
    }

    name: string;
    moving: Moving;
    animation: Vector3;
}

export class SceneAnimation {
    constructor(scene: THREE.Scene, animation: Vector3) {
        this.scene = scene;
        this.animation = animation;
    }

    scene: THREE.Scene;
    animation: Vector3;
}

export class Moving {
    constructor(position: Vector3 = null, rotation: Euler = null) {
        this.position = position;
        this.rotation = rotation;
    }

    position: Vector3;
    rotation: Euler;
}

