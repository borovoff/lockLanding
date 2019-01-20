import {Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy} from '@angular/core';
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
    ramaModel;
    ramaParts;
    bodyModel;
    bodyParts;
    stopperModel;
    stopperParts;
    capModel;
    capParts;
    GLTFobjects = [];

    folders = [
         new Folder('arcAsm',
             new Moving(new Vector3(0, - 0.008, +0.011), new Euler(0, - Math.PI * 0.5)), [
                 new Visual('arcPlasticCover', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.5, envMap: null, name: 'cover'})),
                 new Visual('Body2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                 new Visual('arcMother1', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                 new Visual('arcMother2', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                 new Visual('arcMotherHolder1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                 new Visual('arcMotherHolder2', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
             ]
         ),
         new Folder('bodyAsm', 
            new Moving(new Vector3(0, 0, -0.030), new Euler(0, 0)), [
                new Visual('bodyPlasticCover', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.5, envMap: null, name: 'cover'})),
                new Visual('body', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('bodyMother1', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                new Visual('bodyMother2', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                new Visual('bodyMotherHolder1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                new Visual('bodyMotherHolder2', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            ]
        ),
         new Folder('ramaAsm', 
            new Moving(new Vector3(-0.030, 0, 0), new Euler(0, 0)), [
                new Visual('buttonOuterMetal', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('buttonLed', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.2, envMap: null, name: 'white abs'})),
                new Visual('buttonInnerMetal', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('buttonRing', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                new Visual('rama', new THREE.MeshStandardMaterial({color: 0xC0C0C0, metalness: 1, roughness: 0.5, envMap: null, name: 'aluminium'})),
                new Visual('double1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                new Visual('double2', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                new Visual('single1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                new Visual('single2', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                new Visual('arcFatherBody1', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('arcFatherBody2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('arcFatherBody3', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('arcFatherBody4', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('arcFatherBall1', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('arcFatherBall2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('arcFatherBall3', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('arcFatherBall4', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('bodyFatherBody1', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('bodyFatherBody2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('bodyFatherBall1', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('bodyFatherBall2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})), 
            ]
        ),
         new Folder('long', 
            new Moving(new Vector3(0.008, 0.0075 + 0.008, 0.02), new Euler(Math.PI * 0.5, 0, Math.PI * 0.5)), [
                new Visual('long', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            ]
        ),
         new Folder('short', 
            new Moving(new Vector3(- 0.008, 0.0075, 0.1 - 0.002), new Euler(- Math.PI * 0.5, 0, - Math.PI * 0.5)), [
                new Visual('short', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            ]
        ),
         new Folder('stopperAsm', 
            new Moving(new Vector3(-0.013, 0.0075 + 0.008, 0.1 - 0.0182), new Euler( Math.PI * 0.5, 0, 0)), [
                new Visual('stopper', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                new Visual('shaftSleeve', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            ]
        ),
         new Folder('servo', 
            new Moving(new Vector3(0, -0.016, 0.1 - 0.006), new Euler( 0, Math.PI, 0)), [
                
            ]
        ),
         new Folder('pcb', 
            new Moving(new Vector3(- 0.014, 0, 0.073), new Euler(Math.PI * 0.5, 0, - Math.PI * 0.5)), [
                
            ]
        ),
         new Folder('accumHolder',
            new Moving(new Vector3(0, 0, 0.022), new Euler( 0, 0, Math.PI )), [
                new Visual('Body1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            ]
        ),
         new Folder('battery',
            new Moving(new Vector3(0, -0.0093, 0.027), new Euler( -Math.PI * 0.5, 0, Math.PI )), [
                
            ]
        ),
         new Folder('antennaTorez', 
            new Moving(new Vector3(0, 0, - 0.003), new Euler(0, Math.PI, Math.PI * 0.5)), [
                new Visual('Body1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            ]
        ),
         new Folder('bluetooth', 
            new Moving(new Vector3(0.022, 0.000, - 0.007), new Euler(0, Math.PI, -Math.PI * 0.194)), [
                
            ]
        ),
         new Folder('gsm', 
            new Moving(new Vector3(-0.017, 0.001, - 0.006), new Euler(0, Math.PI, -Math.PI * 0.194)), [
                
            ]
        ),
         new Folder('capAsm', 
            new Moving(new Vector3(0, 0.000, -0.0165), new Euler(0, Math.PI, 0)), [
                new Visual('cap', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                new Visual('QR0', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                new Visual('QR1', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.2, envMap: null, name: 'white abs'})),
                new Visual('QR2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.2, envMap: null, name: 'white abs'})),
                new Visual('QR3', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.2, envMap: null, name: 'white abs'})),
                new Visual('QR4', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.2, envMap: null, name: 'white abs'})),
            ]
        ),
         new Folder('buttonTorez', 
            new Moving(new Vector3(0, 0, 0.1595 + 0.001), new Euler(0, Math.PI, 0)), [
                new Visual('Body1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            ]
        ),
    ];

    constructor() {
        this.urls = [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ];
        this.textureLoader = new THREE.CubeTextureLoader().setPath( 'assets/textures/cube/Bridge2/' );
        this.background = this.textureLoader.load( this.urls );
        this.scene = new THREE.Scene();

        //this.scene.background = new THREE.Color( 0xffffff ); 
         var axesHelper = new THREE.AxesHelper( 5 );
         this.scene.add( axesHelper );
         

        const light = new THREE.PointLight(0xffffff, 3, 1000);
        light.position.set(100, 20, 0);
        this.scene.add(light);
        
        this.scene.add( new THREE.AmbientLight( 0xffffff ) );

        this.camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 1, 10000);
        
        

        this.camera.position.z = 10;
        this.camera.position.x = 10;
        this.camera.position.y = 5;

        console.log(this.camera.position);

        this.loadingCompleted = this.loadingCompleted.bind(this);
        this.i = 0;
        this.load();

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.center.z = 0.07;
        this.controls.center.y = 0.08;
        this.controls.update();
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

        console.log(gltf);
        const bc = this.textureLoader.load( this.urls );
        
        for (let i = 0; i < folder.visuals.length; i++) {
            const material = folder.visuals[i].material;
            material.envMap = this.background;
            gltf.scene.children[0].getObjectByName(folder.visuals[i].name).material = material;
            
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

    ngOnDestroy() {
        //console.log('destroy');
        // Following to RAM measuremebts in Chrome ram is released by deleting scenes. But on forums they say that it's neccecary to remove
        // all objects
        // TO DO remove all info of objects via function from forum disposeHierarchy (3dobject, disposeNode)
        
        for (let j = 0; j < this.scenes.length; j++) {
            
                //this.disposeHierarchy(this.scenes[j].scene.getObjectByName(this.folders[j].visuals[i].name), this.disposeNode);
                //this.disposeNode(this.folders[j].visuals[i].name);
                //this.scenes[j].scene.getObjectByName(this.folders[j].visuals[i].name).traverse( function(node) {
                this.scenes[j].scene.children[0].traverse( function(node) {
                    
                    if (node instanceof THREE.Mesh) {
                        
                        if (node.geometry) {
                            
                            node.geometry.dispose ();


                        }

                        if (node.material) {
                            if (node.material instanceof THREE.MeshStandardMaterial) {

                                if (node.material.map) {          node.material.map.dispose (); }
                                if (node.material.lightMap) {     node.material.lightMap.dispose (); }
                                if (node.material.bumpMap) {      node.material.bumpMap.dispose (); }
                                if (node.material.normalMap) {    node.material.normalMap.dispose (); }
                                // if (node.material.specularMap)  node.material.specularMap.dispose ();
                                if (node.material.envMap) {       node.material.envMap.dispose (); }

                                node.material.dispose ();   // disposes any programs associated with the material
                                //console.log('destroy');



                            }


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

    disposeNode (node) {
        
        //console.log('destroy');
        if (node instanceof THREE.Mesh) {
            if (node.geometry) {
                node.geometry.dispose ();
                

            }
            
            if (node.material) {
                if (node.material instanceof THREE.MeshStandardMaterial) {

                    if (node.material.map) {          node.material.map.dispose (); }
                    if (node.material.lightMap) {     node.material.lightMap.dispose (); }
                    if (node.material.bumpMap) {      node.material.bumpMap.dispose (); }
                    if (node.material.normalMap) {    node.material.normalMap.dispose (); }
                    // if (node.material.specularMap)  node.material.specularMap.dispose ();
                    if (node.material.envMap) {       node.material.envMap.dispose (); }

                    node.material.dispose ();   // disposes any programs associated with the material

                    

                }


            }
        }
    }   // disposeNode

    disposeHierarchy (node, callback) {
        console.log(node.children.length);
        for (let i = node.children.length-1; i >= 0; i--) {
            
            let child = node.children[i];
            this.disposeHierarchy (child, callback);
            callback (child);

        }
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

        if (this.scenes[0].scene.position.y <= 0.05) {
            this.scenes[0].scene.position.y += delta;
        }
        if (this.scenes[0].scene.position.y > 0.04 && this.scenes[1].scene.position.z <= 0.200) {
            this.scenes[1].scene.position.z += 2 * delta;
            this.scenes[14].scene.position.z += 2.1 * delta;

        }
        if (this.scenes[1].scene.position.z > 0.190 && this.scenes[9].scene.position.y >= -0.1) {
            this.scenes[8].scene.position.y -= delta;
            this.scenes[9].scene.position.y -= delta;
            this.scenes[6].scene.position.y -= 0.5 * delta;
            this.scenes[7].scene.position.y -= 0.4 * delta;
            this.scenes[13].scene.position.z -= delta;
        }

        if (this.scenes[9].scene.position.y <= -0.08 && this.scenes[7].scene.position.y >= -0.05 ) {
            // this.scenes[6].scene.position.y -= delta;
            // this.scenes[7].scene.position.y -= delta;
            // this.scenes[13].scene.position.z -= delta;
        }
        window.requestAnimationFrame(() => this.expand());
    }

    animate() {
        window.requestAnimationFrame(() => this.animate());
        // requestAnimationFrame( animate );
        // this.modelScene.position.x += 0.0005;
        this.renderer.render(this.scene, this.camera);
    }
}

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

export class Visual {
    constructor(name: string, material: THREE.MeshStandardMaterial) {
        this.name = name;
        this.material = material;
    }

    name: string;
    material: THREE.MeshStandardMaterial;
}
