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
    ramaModel;
    ramaParts;
    bodyModel;
    bodyParts;
    stopperModel;
    stopperParts;
    capModel;
    capParts;

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
        //var axesHelper = new THREE.AxesHelper( 5 );
        //this.scene.add( axesHelper );
        const light = new THREE.PointLight(0xffffff, 3, 1000);
        light.position.set(100, 100, 100);
        this.scene.add(light);
        this.scene.add( new THREE.AmbientLight( 0x404040 ) );

        this.camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 1, 10000);
        
        this.camera.position.z = 10;
        this.camera.position.x = 10;
        this.camera.position.y = 5;
        this.camera.lookAt(100,100,10);
        
        
        
        
        
        
        
        
        
        console.log(this.camera.position);
        this.loadingCompleted = this.loadingCompleted.bind(this);
        


        

        this.i = 0;
        this.load();

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.center.z = 0.07;
        this.controls.center.y = 0.08;
        this.controls.update();
        
        
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
                arcMotherHolder1: [],
                arcMotherHolder2: [],
            };
            
            this.arcParts.cover.push( this.arcModel.getObjectByName( 'arcPlasticCover' ) );
            this.arcParts.arc.push( this.arcModel.getObjectByName( 'Body2' ) );// TODO - change arc name to 'arc' in fusion
            this.arcParts.arcMother1.push( this.arcModel.getObjectByName( 'arcMother1' ) );
            this.arcParts.arcMother2.push( this.arcModel.getObjectByName( 'arcMother2' ) );
            this.arcParts.arcMotherHolder1.push( this.arcModel.getObjectByName( 'arcMotherHolder1' ) );
            this.arcParts.arcMotherHolder2.push( this.arcModel.getObjectByName( 'arcMotherHolder2' ) );

            this.arcParts.cover.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.5, envMap: bc, name: 'cover' } ) } );
            this.arcParts.arc.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.arcParts.arcMother1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: bc, name: 'brass' } ) } );
            this.arcParts.arcMother2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: bc, name: 'brass' } ) } );
            this.arcParts.arcMotherHolder1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
            this.arcParts.arcMotherHolder2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
            
            
        }
        //add BODY
        if(this.i === 1){
            this.bodyModel = gltf.scene.children[ 0 ];
            
            
             
            this.bodyModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
            this.bodyParts = {
                bodyMother1: [],
                bodyMother2: [],
                body: [],
                bodyPlasticCover: [],
                bodyMotherHolder1: [],
                bodyMotherHolder2: [],
            };
            
            this.bodyParts.bodyPlasticCover.push( this.bodyModel.getObjectByName( 'bodyPlasticCover' ) );
            this.bodyParts.body.push( this.bodyModel.getObjectByName( 'body' ) );
            this.bodyParts.bodyMother1.push( this.bodyModel.getObjectByName( 'bodyMother1' ) );
            this.bodyParts.bodyMother2.push( this.bodyModel.getObjectByName( 'bodyMother2' ) );
            this.bodyParts.bodyMotherHolder1.push( this.bodyModel.getObjectByName( 'bodyMotherHolder1' ) );
            this.bodyParts.bodyMotherHolder2.push( this.bodyModel.getObjectByName( 'bodyMotherHolder2' ) );

            this.bodyParts.bodyPlasticCover.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.5, envMap: bc, name: 'cover' } ) } );
            this.bodyParts.body.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.bodyParts.bodyMother1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: bc, name: 'brass' } ) } );
            this.bodyParts.bodyMother2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: bc, name: 'brass' } ) } );
            this.bodyParts.bodyMotherHolder1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
            this.bodyParts.bodyMotherHolder2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
        }
        
        //add RAMA
        
        if(this.i===2){
            this.ramaModel = gltf.scene.children[ 0 ];
            
            
             
            this.ramaModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
            this.ramaParts = {
                buttonOuterMetal: [],
                buttonLed: [],
                buttonInnerMetal: [],
                buttonRing: [],
                rama: [],
                double1: [],
                double2: [],
                single1: [],
                single2: [],
                arcFatherBody1: [],
                arcFatherBall1: [],
                arcFatherBody2: [],
                arcFatherBall2: [],
                arcFatherBody3: [],
                arcFatherBall3: [],
                arcFatherBody4: [],
                arcFatherBall4: [],
                bodyFatherBody1: [],
                bodyFatherBall1: [],
                bodyFatherBody2: [],
                bodyFatherBall2: [],                
            };
            
            this.ramaParts.buttonOuterMetal.push( this.ramaModel.getObjectByName( 'buttonOuterMetal' ) );
            this.ramaParts.buttonLed.push( this.ramaModel.getObjectByName( 'buttonLed' ) );
            this.ramaParts.buttonInnerMetal.push( this.ramaModel.getObjectByName( 'buttonInnerMetal' ) );
            this.ramaParts.buttonRing.push( this.ramaModel.getObjectByName( 'buttonRing' ) );
            this.ramaParts.rama.push( this.ramaModel.getObjectByName( 'rama' ) );
            this.ramaParts.double1.push( this.ramaModel.getObjectByName( 'double1' ) );
            this.ramaParts.double2.push( this.ramaModel.getObjectByName( 'double2' ) );
            this.ramaParts.single1.push( this.ramaModel.getObjectByName( 'single1' ) );
            this.ramaParts.single2.push( this.ramaModel.getObjectByName( 'single2' ) );
            this.ramaParts.arcFatherBody1.push( this.ramaModel.getObjectByName( 'arcFatherBody1' ) );
            this.ramaParts.arcFatherBall1.push( this.ramaModel.getObjectByName( 'arcFatherBall1' ) );
            this.ramaParts.arcFatherBody2.push( this.ramaModel.getObjectByName( 'arcFatherBody2' ) );
            this.ramaParts.arcFatherBall2.push( this.ramaModel.getObjectByName( 'arcFatherBall2' ) );
            this.ramaParts.arcFatherBody3.push( this.ramaModel.getObjectByName( 'arcFatherBody3' ) );
            this.ramaParts.arcFatherBall3.push( this.ramaModel.getObjectByName( 'arcFatherBall3' ) );
            this.ramaParts.arcFatherBody4.push( this.ramaModel.getObjectByName( 'arcFatherBody4' ) );
            this.ramaParts.arcFatherBall4.push( this.ramaModel.getObjectByName( 'arcFatherBall4' ) );
            this.ramaParts.bodyFatherBody1.push( this.ramaModel.getObjectByName( 'bodyFatherBody1' ) );
            this.ramaParts.bodyFatherBall1.push( this.ramaModel.getObjectByName( 'bodyFatherBall1' ) );
            this.ramaParts.bodyFatherBody2.push( this.ramaModel.getObjectByName( 'bodyFatherBody2' ) );
            this.ramaParts.bodyFatherBall2.push( this.ramaModel.getObjectByName( 'bodyFatherBall2' ) );


            this.ramaParts.buttonOuterMetal.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.buttonLed.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 0, roughness: 0.2, envMap: bc, name: 'white abs' } ) } );
            this.ramaParts.buttonInnerMetal.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.buttonRing.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
            this.ramaParts.rama.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.5, envMap: bc, name: 'aluminium' } ) } );
            this.ramaParts.double1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
            this.ramaParts.double2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
            this.ramaParts.single1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
            this.ramaParts.single2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
            this.ramaParts.arcFatherBody1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.arcFatherBall1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.arcFatherBody2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.arcFatherBall2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.arcFatherBody3.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.arcFatherBall3.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.arcFatherBody4.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.arcFatherBall4.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.bodyFatherBody1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.bodyFatherBall1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.bodyFatherBody2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.ramaParts.bodyFatherBall2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );


        }
        
        // add LONG
        if(this.i===3){
            const longModel = gltf.scene; 
            longModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    child.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } );
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
        }  
        
        // add SHORT
        if(this.i===4){
            const longModel = gltf.scene; 
            longModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    child.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } );
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
        } 
        // add STOPPER  
        if(this.i===5){
            this.stopperModel = gltf.scene.children[ 0 ];
            
            
             
            this.stopperModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
            this.stopperParts = {
                stopper: [],
                shaftSleeve: [],
            };
            
            this.stopperParts.stopper.push( this.stopperModel.getObjectByName( 'stopper' ) );
            this.stopperParts.shaftSleeve.push( this.stopperModel.getObjectByName( 'shaftSleeve' ) );


            this.stopperParts.stopper.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 1, roughness: 0.2, envMap: bc, name: 'steel' } ) } );
            this.stopperParts.shaftSleeve.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
        }              
        // add ACCUMHOLDER
        if(this.i===8){
            const accumHolderModel = gltf.scene; 
            accumHolderModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    child.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } );
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
        }
                if(this.i===8){
            const accumHolderModel = gltf.scene; 
            accumHolderModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    child.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } );
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
        }          
        if(this.i===10){
            const antennaTorezModel = gltf.scene; 
            antennaTorezModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    child.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } );
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
        }
        
        if(this.i===13){
            this.capModel = gltf.scene.children[ 0 ];
            
            
             
            this.capModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    //child.material.envMap = this.background;// -- this syntax not work!
                }

            } );
            this.capParts = {
                cap: [],
                QR0: [],
                QR1: [],
                QR2: [],
                QR3: [],
                QR4: [],
            };
            
            this.capParts.cap.push( this.capModel.getObjectByName( 'cap' ) );
            this.capParts.QR0.push( this.capModel.getObjectByName( 'QR0' ) );
            this.capParts.QR1.push( this.capModel.getObjectByName( 'QR1' ) );
            this.capParts.QR2.push( this.capModel.getObjectByName( 'QR2' ) );
            this.capParts.QR3.push( this.capModel.getObjectByName( 'QR3' ) );
            this.capParts.QR4.push( this.capModel.getObjectByName( 'QR4' ) );


            this.capParts.cap.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
            this.capParts.QR0.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } ) } );
            this.capParts.QR1.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 0, roughness: 0.2, envMap: bc, name: 'white abs' } ) } );
            this.capParts.QR2.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 0, roughness: 0.2, envMap: bc, name: 'white abs' } ) } );
            this.capParts.QR3.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 0, roughness: 0.2, envMap: bc, name: 'white abs' } ) } );
            this.capParts.QR4.forEach( function ( part ) { part.material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 0, roughness: 0.2, envMap: bc, name: 'white abs' } ) } );
        }              
        
        if(this.i===14){
            const antennaTorezModel = gltf.scene; 
            antennaTorezModel.traverse( function ( child ) {

                if ( child.isMesh ) {
                    child.material.envMap = bc;
                    child.material = new THREE.MeshStandardMaterial( { color: 0x000000, metalness: 0, roughness: 0.2, envMap: bc, name: 'black abs' } );
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
            this.scenes[6].scene.position.y -= delta;
            this.scenes[7].scene.position.y -= delta;
            this.scenes[13].scene.position.z -= delta;
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

