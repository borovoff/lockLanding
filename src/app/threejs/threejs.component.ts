import {Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy} from '@angular/core';
import * as THREE from 'three';
import './js/EnableThreeExamples';
import 'three/examples/js/loaders/ColladaLoader';
import 'three/examples/js/loaders/GLTFLoader';
import 'three/examples/js/controls/OrbitControls';
import {FOLDERS} from '../mock/folders';
import {SceneAnimation} from '../model/scene-animation';

@Component({
    selector: 'app-threejs',
    templateUrl: './threejs.component.html',
    styleUrls: ['../app.component.scss']
})
export class ThreejsComponent implements AfterViewInit, OnDestroy {
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
    loader;
    i;
    textureLoader;
    urls;
    background;
    lightHolder;
    loaded = false;
    work = false;
    command = ThreeCommand.Disassemble;
    requestFlag;
    manager;
    folders = FOLDERS;

    constructor() {
        this.urls = [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ];
        this.textureLoader = new THREE.CubeTextureLoader().setPath( 'assets/textures/cube/Bridge2/' );
        this.background = this.textureLoader.load( this.urls );
        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color( 0x171717 );

        const light = new THREE.PointLight(0xffffff, 2, 1000);
        light.position.set(100, 30, 100); // 100,10,0
        const light1 = new THREE.PointLight(0xffffff, 0.6, 1000);
        light1.position.set(0, -100, 0); // -100,10,0
        const light2 = new THREE.PointLight(0xffffff, 0.2, 1000);
        light2.position.set(50, 0, -40); // -100,10,0

        this.lightHolder = new THREE.Group();
        this.lightHolder.add(light);
        this.lightHolder.add(light1);
        this.lightHolder.add(light2);
        this.scene.add(this.lightHolder);

        this.scene.add( new THREE.AmbientLight( 0xffffff ) );

        this.camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 10;
        this.camera.position.x = 10;
        this.camera.position.y = 5;

        this.manager = new THREE.LoadingManager();
        this.manager.onLoad = this.onLoad.bind(this);
        this.loadingCompleted = this.loadingCompleted.bind(this);
        this.i = 0;
        this.load();

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.center.z = 0.07;
        this.controls.center.y = 0.08;
        this.controls.update();
    }

    onLoad() {
        this.loaded = true;
    }

    loadingCompleted(gltf) {
        const folder = this.folders[this.i];
        const moving = this.folders[this.i].moving;
        if (moving !== null) {
            gltf.scene.position.x = moving.position.x;
            gltf.scene.position.y = moving.position.y;
            gltf.scene.position.z = moving.position.z;
            gltf.scene.setRotationFromEuler(moving.rotation);
        }

        if (folder.visuals !== null) {
            for (let i = 0; i < folder.visuals.length; i++) {
                const material = folder.visuals[i].material;
                material.envMap = this.background;
                gltf.scene.children[0].getObjectByName(folder.visuals[i].name).material = material;
            }
        }

        this.scenes.push(new SceneAnimation(gltf.scene, folder.animation === null ? null : folder.animation));
        this.scene.add(gltf.scene);
        // this.renderer.render(this.scene, this.camera);

        this.i++;
        if (this.i < this.folders.length) {
            this.load();
        }
    }

    load() {
        this.loader = new THREE.GLTFLoader(this.manager);
        const folder = this.folders[this.i].name;
        const fullPath = this.path + folder + '.glb';
        this.loader.load(fullPath, this.loadingCompleted);
    }

    private get canvas(): HTMLCanvasElement {
        return this.rendererContainer.nativeElement;
    }

    ngAfterViewInit() {
        this.setView();
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.requestFlag = 1;
        this.animate();
    }

    ngOnDestroy() {
        // Following to RAM measuremebts in Chrome ram is released by deleting scenes. But on forums they say that it's neccecary to remove
        // all objects
        // TO DO remove all info of objects via function from forum disposeHierarchy (3dobject, disposeNode)
        this.requestFlag = 0;
        for (let j = 0; j < this.scenes.length; j++) {
            this.scenes[j].scene.children[0].traverse( function(node) {
                if (node instanceof THREE.Mesh) {
                    if (node.geometry) {
                        node.geometry.dispose ();
                    }
                    if (node.material && node.material instanceof THREE.MeshStandardMaterial) {
                        if (node.material.map) {          node.material.map.dispose (); }
                        if (node.material.lightMap) {     node.material.lightMap.dispose (); }
                        if (node.material.bumpMap) {      node.material.bumpMap.dispose (); }
                        if (node.material.normalMap) {    node.material.normalMap.dispose (); }
                        // if (node.material.specularMap)  node.material.specularMap.dispose ();
                        if (node.material.envMap) {       node.material.envMap.dispose (); }

                        node.material.dispose();   // disposes any programs associated with the material
                    }
                }
            });
        }

        for ( let i = 0; i < this.scenes.length; i++) {
            while (this.scenes[i].scene.children.length > 0) {
                this.scenes[i].scene.remove(this.scenes[i].scene.children[0]);
            }
        }
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event) {
        this.setView();
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event) {
        if (this.loaded && !this.work) {
            switch (event.code) {
                case 'Space':
                    this.work = true;
                    this.expand();
                    break;
                case 'Escape':
                    this.work = true;
                    this.assemble();
                    break;
                default:
                    break;
            }
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
        const delta = 0.003;
        // console.log('asm');
        if (this.scenes[0].scene.position.y <= 0.05) {
            this.scenes[0].scene.position.y += delta;
            window.requestAnimationFrame(() => this.expand());
        } else if (this.scenes[0].scene.position.y > 0.04 && this.scenes[1].scene.position.z <= 0.200) {
            this.scenes[1].scene.position.z += 2 * delta;
            this.scenes[14].scene.position.z += 2.1 * delta;
            window.requestAnimationFrame(() => this.expand());

        } else if (this.scenes[1].scene.position.z > 0.190 && this.scenes[9].scene.position.y >= -0.1) {
            this.scenes[8].scene.position.y -= delta;
            this.scenes[9].scene.position.y -= delta;
            this.scenes[6].scene.position.y -= 0.5 * delta;
            this.scenes[7].scene.position.y -= 0.4 * delta;
            this.scenes[13].scene.position.z -= delta;
            window.requestAnimationFrame(() => this.expand());
        } else {
            this.work = false;
            this.command = ThreeCommand.Assemble;
        }

        if (this.scenes[9].scene.position.y <= -0.08 && this.scenes[7].scene.position.y >= -0.05 ) {
            // this.scenes[6].scene.position.y -= delta;
            // this.scenes[7].scene.position.y -= delta;
            // this.scenes[13].scene.position.z -= delta;
        }
    }

    assemble() {
        // console.log('asm');
        const delta = 0.003;

        if (this.scenes[13].scene.position.z <= -0.0165 - delta) {
            this.scenes[8].scene.position.y += delta;
            this.scenes[9].scene.position.y += delta;
            this.scenes[6].scene.position.y += 0.5 * delta;
            this.scenes[7].scene.position.y += 0.4 * delta;
            this.scenes[13].scene.position.z += delta;
            window.requestAnimationFrame(() => this.assemble());
        } else if (this.scenes[13].scene.position.z >= -0.02 && this.scenes[1].scene.position.z >= -0.03) {
            this.scenes[1].scene.position.z -= 2 * delta;
            this.scenes[14].scene.position.z -= 2.1 * delta;
            window.requestAnimationFrame(() => this.assemble());
        } else if (this.scenes[1].scene.position.z < -0.02 && this.scenes[0].scene.position.y > -0.008 + delta) {
            this.scenes[0].scene.position.y -= delta;
            window.requestAnimationFrame(() => this.assemble());
        } else {
            this.work = false;
            this.command = ThreeCommand.Disassemble;
        }
    }

    animate() {
        if (this.requestFlag === 1) {
            window.requestAnimationFrame(() => this.animate());
        }

        this.renderer.render(this.scene, this.camera);
        this.lightHolder.quaternion.copy(this.camera.quaternion);
    }
}

export enum ThreeCommand {
    Assemble = 'three.assemble',
    Disassemble = 'three.disassemble'
}
