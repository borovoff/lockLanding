import {Component, ViewChild, ElementRef, AfterViewInit, HostListener} from '@angular/core';
import * as THREE from 'three';
import './js/EnableThreeExamples';
import 'three/examples/js/loaders/ColladaLoader';
import 'three/examples/js/loaders/GLTFLoader';
import 'three/examples/js/controls/OrbitControls';
import {GLTF} from 'three';

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

    constructor() {
        this.scene = new THREE.Scene();
        const light = new THREE.PointLight(0xffffff, 1, 1000);
        light.position.set(100, 100, 100);
        this.scene.add(light);
        this.scene.add( new THREE.AmbientLight( 0x404040 ) );

        this.camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 10;
        this.loadingCompleted = this.loadingCompleted.bind(this);
        this.arcLoadingCompleted = this.arcLoadingCompleted.bind(this);

        const loader = new THREE.GLTFLoader();
        loader.load('assets/model/rama/rama.gltf', this.loadingCompleted);
        loader.load('assets/model/arc/arc.gltf', this.arcLoadingCompleted);
        loader.load('assets/model/body/body.gltf', this.loadingCompleted);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    loadingCompleted(gltf: GLTF) {
        this.scenes.push(gltf.scene);
        this.scene.add(gltf.scene);
        this.renderer.render(this.scene, this.camera);
    }

    arcLoadingCompleted(gltf: GLTF) {
        gltf.scene.position.z += 0.01;
        gltf.scene.position.y -= 0.008;
        gltf.scene.rotation.y -= Math.PI * 0.5;
        this.scenes.push(gltf.scene);
        this.scene.add(gltf.scene);
        this.renderer.render(this.scene, this.camera);
    }

    mouseDown($event) {
        console.log('mouseDown');
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
        if (this.scenes[1].position.y < 0.05) {
            this.scenes[1].position.y += 0.0005;
            window.requestAnimationFrame(() => this.expand());
        } else if (this.scenes[2].position.z > -0.1) {
            this.scenes[2].position.z -= 0.0005;
            this.scenes[0].position.z += 0.0005;
            window.requestAnimationFrame(() => this.expand());
        }
    }

    animate() {
        window.requestAnimationFrame(() => this.animate());
        // this.modelScene.position.x += 0.0005;
        this.renderer.render(this.scene, this.camera);
    }
}
