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
    textureLoader;
    urls;
    background;
    arcModel;
    arcParts;

    folders = [
             new Folder('arcAsm',new Moving(new Vector3(0, - 0.008, +0.011), new Euler(0, - Math.PI * 0.5))),//,new Vector3(0, 0.05)
             new Folder('bodyAsm',new Moving(new Vector3(0, 0, -0.030), new Euler(0, 0))),
             new Folder('ramaAsm',new Moving(new Vector3(-0.030, 0, 0), new Euler(0, 0))),
             new Folder('long', new Moving(new Vector3(0.008, 0.0075 + 0.008, 0.02), new Euler(Math.PI * 0.5, 0, Math.PI * 0.5))),
             new Folder('short', new Moving(new Vector3(- 0.008, 0.0075, 0.1-0.002), new Euler(- Math.PI * 0.5, 0, - Math.PI * 0.5))),
             new Folder('stopperAsm', new Moving(new Vector3(-0.013, 0.0075 + 0.008, 0.1-0.0182), new Euler( Math.PI * 0.5, 0, 0))),
             new Folder('servo', new Moving(new Vector3(0, -0.016, 0.1-0.006), new Euler( 0, Math.PI, 0))),
             new Folder('pcb', new Moving(new Vector3(- 0.014, 0, 0.073), new Euler(Math.PI * 0.5, 0, - Math.PI * 0.5))),
             new Folder('accumHolder',new Moving(new Vector3(0, 0, 0.022), new Euler( 0, 0, Math.PI ))),
             new Folder('battery',new Moving(new Vector3(0, -0.0093, 0.027), new Euler( -Math.PI*0.5, 0, Math.PI ))),
             new Folder('antennaTorez', new Moving(new Vector3(0, 0, - 0.003), new Euler(0, Math.PI, Math.PI*0.5))),
             new Folder('bluetooth', new Moving(new Vector3(0.022, 0.000, - 0.007), new Euler(0, Math.PI, -Math.PI*0.194))),
             new Folder('gsm', new Moving(new Vector3(-0.017, 0.001, - 0.006), new Euler(0, Math.PI, -Math.PI*0.194))),
             new Folder('capAsm', new Moving(new Vector3(0, 0.000, -0.0165), new Euler(0, Math.PI, 0))),
             new Folder('buttonTorez', new Moving(new Vector3(0, 0, 0.1595+0.001), new Euler(0, Math.PI, 0))),
            
            
            
    ];

    constructor() {
        this.urls = [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ];
        this.textureLoader = new THREE.CubeTextureLoader().setPath( 'assets/textures/cube/Bridge2/' );
        this.background = this.textureLoader.load( this.urls );
        this.scene = new THREE.Scene();
        //this.scene.background = this.background;
        var axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
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


        const bc = this.textureLoader.load( this.urls ); 
        //add ARC
        if (this.i===0){
            this.arcModel = gltf.scene.children[ 0 ];
            
            
             
            this.arcModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
            this.arcParts = {
                cover: [],
                arc: [],
                arcMother1: [],
                arcMother2: [],
            };
            
            this.arcParts.cover.push( this.arcModel.getObjectByName( 'arcPlasticCover' ) );
            this.arcParts.arc.push( this.arcModel.getObjectByName( 'Body2' ) );// TODO - change arc name to 'arc' in fusion
            this.arcParts.arcMother1.push( this.arcModel.getObjectByName( 'arcMother1' ) );
            this.arcParts.arcMother2.push( this.arcModel.getObjectByName( 'arcMother2' ) );

            this.arcParts.cover.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.5, envMap: bc, name: 'mirror' } ) } );
            this.arcParts.arc.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'mirror' } ) } );
            this.arcParts.arcMother1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: bc, name: 'mirror' } ) } );
            this.arcParts.arcMother2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: bc, name: 'mirror' } ) } );
            
        }
        
        if(this.i===14){
            const buttonTorezModel = gltf.scene; 
            buttonTorezModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    child.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'mirror' } );
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
        }
        

        
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
        const fullPath = this.path + folder + '.glb';
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
        const delta = 0.003;
        for (let j = 0; j < this.scenes.length; j++) {
            const sceneAnimation = this.scenes[j];
            const anima = sceneAnimation.animation;
            const scene = sceneAnimation.scene;

            //if (anima !== null) {
            //    if (anima.x !== 0) {
            //        this.scenes[j].scene.position.x += delta;
            //        window.requestAnimationFrame(() => this.expand());
            //    }

            //    if (anima.y !== 0 && this.scenes[j].scene.position.y < anima.y) {
            //        this.scenes[j].scene.position.y += delta;
            //        window.requestAnimationFrame(() => this.expand());
            //    }

            //    if (anima.z !== 0) {
            //        this.scenes[j].scene.position.z += delta;
            //        window.requestAnimationFrame(() => this.expand());
            //    }
            //}

        }
        if (this.scenes[0].scene.position.y <= 0.05) {
            this.scenes[0].scene.position.y += delta;
            //window.requestAnimationFrame(() => this.expand());
        } 
        if(this.scenes[0].scene.position.y > 0.04 && this.scenes[1].scene.position.z <= 0.200){
            this.scenes[1].scene.position.z += 2*delta;
            this.scenes[14].scene.position.z += 2*delta;
            //window.requestAnimationFrame(() => this.expand());
        }
        if(this.scenes[1].scene.position.z > 0.190 && this.scenes[9].scene.position.y >= -0.1){
            this.scenes[8].scene.position.y -= delta;
            this.scenes[9].scene.position.y -= delta;
            //window.requestAnimationFrame(() => this.expand());           
        }
        
        if(this.scenes[9].scene.position.y <= -0.08 && this.scenes[7].scene.position.y >= -0.05 ){
            this.scenes[7].scene.position.y -= delta;
            //window.requestAnimationFrame(() => this.expand());
        }
        window.requestAnimationFrame(() => this.expand());
    }

    animate() {
        
        window.requestAnimationFrame(() => this.animate());
        //requestAnimationFrame( animate );

        
        
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

