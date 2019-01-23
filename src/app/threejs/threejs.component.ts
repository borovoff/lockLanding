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
    loader;
    i;
    textureLoader;
    urls;
    background;
    lightHolder;
    fontLoader;
    textMesh;
    requestFlag;
    folders = [
         new Folder('arcAsm',
             new Moving(new Vector3(0, - 0.008, +0.011), new Euler(0, - Math.PI * 0.5)), [
                 new Visual('arcPlasticCover', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0.2, roughness: 0.5, envMap: null, name: 'cover'})),
                 new Visual('Body2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
                 new Visual('arcMother1', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                 new Visual('arcMother2', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                 new Visual('arcMotherHolder1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                 new Visual('arcMotherHolder2', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                 new Visual('arcGask1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                 new Visual('arcGask2', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
             ]
         ),
         new Folder('bodyAsm',
            new Moving(new Vector3(0, 0, -0.030), new Euler(0, 0)), [
                new Visual('bodyPlasticCover', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0.2, roughness: 0.5, envMap: null, name: 'cover'})),
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
                new Visual('rama', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.35, envMap: null, name: 'aluminium'})),
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
                new Visual('servo', new THREE.MeshStandardMaterial({color: 0x1919ff, metalness: 0, roughness: 0.7, envMap: null, name: 'blue abs'})),
                new Visual('servoShaft', new THREE.MeshStandardMaterial({color: 0xFFFFFF, metalness: 0, roughness: 0.7, envMap: null, name: 'white abs'})),
            ]
        ),
         new Folder('pcb',
            new Moving(new Vector3(- 0.014, 0, 0.073), new Euler(Math.PI * 0.5, 0, - Math.PI * 0.5)), [
                new Visual('pcb', new THREE.MeshStandardMaterial({color: 0x980002, metalness: 0.5, roughness: 0.5, envMap: null, name: 'pcb'})),
                new Visual('sim7000e', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                new Visual('simCardHolder', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.6, envMap: null, name: 'steel'})),
                new Visual('usb', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.6, envMap: null, name: 'steel'})),
                new Visual('cc2640r2f', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
                new Visual('mpu-6500', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
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
                new Visual('Body1', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                new Visual('Body2', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                new Visual('Body3', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                new Visual('Body4', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
            ]
        ),
         new Folder('gsm',
            new Moving(new Vector3(-0.017, 0.001, - 0.006), new Euler(0, Math.PI, -Math.PI * 0.194)), [
                new Visual('Body1', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                new Visual('Body2', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                new Visual('Body3', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
                new Visual('Body4', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
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

        this.scene.background = new THREE.Color( 0x000000 );

        const light = new THREE.PointLight(0xffffff, 2, 1000);
        light.position.set(100, 30, 100); // 100,10,0
        const light1 = new THREE.PointLight(0xffffff, 3, 1000);
        light1.position.set(-100, 10, 0); // -100,10,0
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
        console.log(this.camera.position);

        this.loadingCompleted = this.loadingCompleted.bind(this);
        this.fontloadingCompleted = this.fontloadingCompleted.bind(this);
        this.i = 0;
        this.load();
        //this.loadFont();

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.center.z = 0.07;
        this.controls.center.y = 0.08;
        this.controls.update();

        this.makeTextSprite = this.makeTextSprite.bind(this);
        const spritey1 = this.makeTextSprite( ' ENTER - разобрать ',
        { fontsize: 35, fontface: 'Helvetica', borderColor: {r: 255, g: 255, b: 255, a: 1.0} } );
        spritey1.position.set(0.25, 0.22, 0.1);
        // this.scene.add( spritey1 );
        const spritey2 = this.makeTextSprite( ' ESC - собрать ',
        { fontsize: 35, fontface: 'Helvetica', borderColor: {r: 255, g: 255, b: 255, a: 1.0} } );
        spritey2.position.set(0.25, 0.2, 0.1);
        // this.scene.add( spritey2 );

        const textureLoader = new THREE.TextureLoader();
        const mapB = textureLoader.load( 'assets/textures/info.png' );
        const materialB = new THREE.SpriteMaterial( { map: mapB, color: 0xffffff, fog: true } );
        const sprite1 = new THREE.Sprite( materialB );
        sprite1.position.set( 0.28, 0.27, 0.15 ); // 0.3, 0.375, 0.55
        sprite1.scale.set(0.07, 0.07, 0.07);
        // this.scene.add( sprite1 );


        // const mapC = textureLoader.load( 'assets/textures/Esc.png' );
        // const materialC = new THREE.SpriteMaterial( { map: mapC, color: 0xffffff, fog: true } );
        // const sprite2 = new THREE.Sprite( materialC );
        // sprite2.position.set( 0.25, 0.15, 0.15 );
        // sprite2.scale.set(0.1, 0.05, 0.1);
        // this.scene.add( sprite2 );

    }


    makeTextSprite( message, parameters ) {
        if ( parameters === undefined ) {
            parameters = {};
        }

        const fontface = parameters.hasOwnProperty('fontface') ?
            parameters['fontface'] : 'Arial';

        const fontsize = parameters.hasOwnProperty('fontsize') ?
            parameters['fontsize'] : 18;

        const borderThickness = parameters.hasOwnProperty('borderThickness') ?
            parameters['borderThickness'] : 4;

        const borderColor = parameters.hasOwnProperty('borderColor') ?
            parameters['borderColor'] : { r: 0, g: 0, b: 0, a: 1.0 };

        const backgroundColor = parameters.hasOwnProperty('backgroundColor') ?
            parameters['backgroundColor'] : { r: 255, g: 255, b: 255, a: 0.0 };

        const canvas = document.createElement('canvas');
        canvas.height = 256;
        canvas.width = 512;
        const context = canvas.getContext('2d');
        context.font =  fontsize + 'px ' + fontface;

        // get size data (height depends only on font size)
        const metrics = context.measureText( message );
        const textWidth = metrics.width;

        // background color
        context.fillStyle   = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ','
                                    + backgroundColor.b + ',' + backgroundColor.a + ')';
        // border color
        context.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ','
                                    + borderColor.b + ',' + borderColor.a + ')';
        context.lineWidth = borderThickness;
        this.roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
        // 1.4 is extra height factor for text below baseline: g,j,p,q.

        // text color
        context.fillStyle = 'rgba(255, 255, 255, 1.0)';
        context.fillText( message, borderThickness, fontsize + borderThickness);

        // canvas contents will be used for a texture
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        const spriteMaterial = new THREE.SpriteMaterial(
            { map: texture, color: 0xffffff, fog: false } );
        const sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(0.1, 0.07, 0.1);
        return sprite;
    }

    // function for drawing rounded rectangles
    roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x+r, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-r);
        ctx.lineTo(x, y+r);
        ctx.quadraticCurveTo(x, y, x+r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
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

    fontloadingCompleted(font) {

            const textGeo = new THREE.TextGeometry( 'Enter — disassemble, Esc - assemble', {
                font: font,
                size: 0.005,
                height: 0.000,
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: false
            } );
            const textMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness: 0, roughness: 0.5, envMap: null, name: 'white abs'} );
            this.textMesh = new THREE.Mesh( textGeo, textMaterial );

            
            this.textMesh.rotation.y = Math.PI / 4;
            this.textMesh.position.set(0.1, 0.0, 0.1);
            

            this.scene.add( this.textMesh );
    }

    load() {
        this.loader = new THREE.GLTFLoader();
        const folder = this.folders[this.i].name;
        const fullPath = this.path + folder + '.glb';
        this.loader.load(fullPath, this.loadingCompleted);

        

        
    }
    loadFont() {
        this.fontLoader = new THREE.FontLoader();
        this.textMesh = new THREE.Mesh();
        this.fontLoader.load( 'assets/fonts/helvetiker_bold.typeface.json', this.fontloadingCompleted);
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
        // console.log('destroy');
        // Following to RAM measuremebts in Chrome ram is released by deleting scenes. But on forums they say that it's neccecary to remove
        // all objects
        // TO DO remove all info of objects via function from forum disposeHierarchy (3dobject, disposeNode)
        this.requestFlag = 0;
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

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event) {
        this.setView();
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event) {
        if (event.key === 'Enter') {
            this.expand();
            document.getElementById('info').innerHTML = '<br> Esc — собрать';
        }
        if (event.key === 'Escape') {
            this.assemble();
            document.getElementById('info').innerHTML = '<br> Enter — разобрать';
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
        //console.log('asm');
        if (this.scenes[0].scene.position.y <= 0.05) {
            this.scenes[0].scene.position.y += delta;
            window.requestAnimationFrame(() => this.expand());
        }else if (this.scenes[0].scene.position.y > 0.04 && this.scenes[1].scene.position.z <= 0.200) {
            this.scenes[1].scene.position.z += 2 * delta;
            this.scenes[14].scene.position.z += 2.1 * delta;
            window.requestAnimationFrame(() => this.expand());

        }else if (this.scenes[1].scene.position.z > 0.190 && this.scenes[9].scene.position.y >= -0.1) {
            this.scenes[8].scene.position.y -= delta;
            this.scenes[9].scene.position.y -= delta;
            this.scenes[6].scene.position.y -= 0.5 * delta;
            this.scenes[7].scene.position.y -= 0.4 * delta;
            this.scenes[13].scene.position.z -= delta;
            window.requestAnimationFrame(() => this.expand());
        }



        if (this.scenes[9].scene.position.y <= -0.08 && this.scenes[7].scene.position.y >= -0.05 ) {
            // this.scenes[6].scene.position.y -= delta;
            // this.scenes[7].scene.position.y -= delta;
            // this.scenes[13].scene.position.z -= delta;
        }
        
    }
    
    assemble(){
        //console.log('asm');
        const delta = 0.003;
        
        if (this.scenes[13].scene.position.z <= -0.0165-delta) {
            this.scenes[8].scene.position.y += delta;
            this.scenes[9].scene.position.y += delta;
            this.scenes[6].scene.position.y += 0.5 * delta;
            this.scenes[7].scene.position.y += 0.4 * delta;
            this.scenes[13].scene.position.z += delta;
            window.requestAnimationFrame(() => this.assemble());
        }else if (this.scenes[13].scene.position.z >= -0.02 && this.scenes[1].scene.position.z>=-0.03) {
            this.scenes[1].scene.position.z -= 2 * delta;
            this.scenes[14].scene.position.z -= 2.1 * delta;
            window.requestAnimationFrame(() => this.assemble());

        }else if (this.scenes[1].scene.position.z < -0.02 && this.scenes[0].scene.position.y>-0.008+delta) {
            this.scenes[0].scene.position.y -= delta;
            window.requestAnimationFrame(() => this.assemble());

        }
        
    }

    animate() {
        if (this.requestFlag === 1) {
            window.requestAnimationFrame(() => this.animate());
        }
        
        // requestAnimationFrame( animate );
        // this.modelScene.position.x += 0.0005;
        this.renderer.render(this.scene, this.camera);
        this.lightHolder.quaternion.copy(this.camera.quaternion);
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
