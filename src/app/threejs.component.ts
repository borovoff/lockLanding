import {Component, ViewChild, ElementRef, AfterViewInit, HostListener, AfterViewChecked, AfterContentInit} from '@angular/core';
import * as THREE from 'three';
import 'three/examples/js/loaders/ColladaLoader';

@Component({
    selector: 'app-threejs',
    templateUrl: './threejs.component.html',
    styleUrls: ['./app.component.scss']
})
export class ThreejsComponent implements AfterViewInit {
    @ViewChild('rendererContainer')
    rendererContainer: ElementRef;

    renderer = new THREE.WebGLRenderer();
    scene = null;
    camera = null;
    mesh = null;
    height;
    width;
    modelScene;

    constructor() {
        this.scene = new THREE.Scene();
        const light = new THREE.PointLight(0xffffff, 1, 1000);
        light.position.set(0, 0, 100);
        this.scene.add(light);

        this.camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;

        const geometry = new THREE.BoxGeometry(200, 200, 200);
        const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        this.mesh = new THREE.Mesh(geometry, material);

        // this.scene.add(this.mesh);
        this.loadingCompleted = this.loadingCompleted.bind(this);

        const loader = new THREE.ColladaLoader();
        loader.load('assets/model/rama.dae', this.loadingCompleted);
    }

    loadingCompleted(collada) {
        this.modelScene = collada.scene;
        this.scene.add(this.modelScene);
        this.renderer.render(this.scene, this.camera);
    }

    mouseDown($event) {
        console.log('mouseDown');
    }

    private get canvas(): HTMLCanvasElement {
        return this.rendererContainer.nativeElement;
    }

    ngAfterViewInit() {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        // this.renderer.setClearColor(0xfffff0, 1);

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();
    }

    // @HostListener('window:resize', ['$event'])
    // onWindowResize(event) {
    //     this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
    // }

    // @HostListener('')

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event) {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }

    animate() {
        window.requestAnimationFrame(() => this.animate());
        this.modelScene.position.x += 0.005;
        // this.modelScene.rotation.x += 0.005;
        // this.modelScene.rotation.y += 0.005;
        this.renderer.render(this.scene, this.camera);
    }
}
