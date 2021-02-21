import {Euler, Vector3} from 'three';
import * as THREE from 'three';
import {Folder} from '../model/folder';
import {Moving} from '../model/moving';
import {Visual} from '../model/visual';

export const SCOOTER_FOLDERS = [
    new Folder('assemble',
        new Moving(new Vector3(0.02, -0.05, 0), new Euler(0, - Math.PI * 0.5, 0)), [
            new Visual('cover', new THREE.MeshStandardMaterial({color: 0xadd8e6, metalness: 0.0, roughness: 0.99, envMap: null, name: 'yellow_tube', transparent: true, opacity: 0.7})),
            new Visual('rope', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            new Visual('end', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            new Visual('button_cap', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0.2, roughness: 0.5, envMap: null, name: 'black_rubber'})),
            new Visual('alum_body', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0.4, roughness: 0.3, envMap: null, name: 'aluminium'})),
            new Visual('top_connector', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            new Visual('top_pcb', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
        ]
    ),
];
export const SHARING_FOLDERS = [
    new Folder('assemble',
        new Moving(new Vector3(-0.05, -0.1, 0), new Euler(0, 0, Math.PI)), [
            new Visual('arc_cover', new THREE.MeshStandardMaterial({color: 0xd4a03d, metalness: 0.0, roughness: 0.99, envMap: null, name: 'yellow_tube'})),
            new Visual('enclosure_cover', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0.2, roughness: 0.5, envMap: null, name: 'black_rubber'})),
            new Visual('button', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            new Visual('enclosure', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            new Visual('arc', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            new Visual('rod_symm', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            new Visual('ring', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            new Visual('dashboard_symm', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            new Visual('gask', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            new Visual('QR1', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.2, envMap: null, name: 'white abs'})),
            new Visual('QR2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.2, envMap: null, name: 'white abs'})),
            new Visual('QR3', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.2, envMap: null, name: 'white abs'})),
            new Visual('QR4', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0, roughness: 0.2, envMap: null, name: 'white abs'})),
        ]
    ),
];
export const GSM_FOLDERS = [
new Folder('arcAsm',
        new Moving(new Vector3(0, - 0.008, +0.011), new Euler(0, - Math.PI * 0.5)), [
            new Visual('arcPlasticCover', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0.2, roughness: 0.5, envMap: null, name: 'cover'})),
            new Visual('Body2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),

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
            // new Visual('rama', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.35, envMap: null, name: 'aluminium'})),
            // new Visual('double1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            // new Visual('double2', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            // new Visual('single1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            // new Visual('single2', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
            // new Visual('arcFatherBody1', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('arcFatherBody2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('arcFatherBody3', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('arcFatherBody4', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('arcFatherBall1', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('arcFatherBall2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('arcFatherBall3', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('arcFatherBall4', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('bodyFatherBody1', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('bodyFatherBody2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('bodyFatherBall1', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
            // new Visual('bodyFatherBall2', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
        ]
    ),
    // new Folder('long',
    //     new Moving(new Vector3(0.008, 0.0075 + 0.008, 0.02), new Euler(Math.PI * 0.5, 0, Math.PI * 0.5)), [
    //         new Visual('long', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
    //     ]
    // ),
    // new Folder('short',
    //     new Moving(new Vector3(- 0.008, 0.0075, 0.1 - 0.002), new Euler(- Math.PI * 0.5, 0, - Math.PI * 0.5)), [
    //         new Visual('short', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
    //     ]
    // ),
    // new Folder('stopperAsm',
    //     new Moving(new Vector3(-0.013, 0.0075 + 0.008, 0.1 - 0.0182), new Euler( Math.PI * 0.5, 0, 0)), [
    //         new Visual('stopper', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.2, envMap: null, name: 'steel'})),
    //         new Visual('shaftSleeve', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
    //     ]
    // ),
    // new Folder('servo',
    //     new Moving(new Vector3(0, -0.016, 0.1 - 0.006), new Euler( 0, Math.PI, 0)), [
    //         new Visual('servo', new THREE.MeshStandardMaterial({color: 0x1919ff, metalness: 0, roughness: 0.7, envMap: null, name: 'blue abs'})),
    //         new Visual('servoShaft', new THREE.MeshStandardMaterial({color: 0xFFFFFF, metalness: 0, roughness: 0.7, envMap: null, name: 'white abs'})),
    //     ]
    // ),
    // new Folder('pcb',
    //     new Moving(new Vector3(- 0.014, 0, 0.073), new Euler(Math.PI * 0.5, 0, - Math.PI * 0.5)), [
    //         new Visual('pcb', new THREE.MeshStandardMaterial({color: 0x980002, metalness: 0.5, roughness: 0.5, envMap: null, name: 'pcb'})),
    //         new Visual('sim7000e', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
    //         new Visual('simCardHolder', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.6, envMap: null, name: 'steel'})),
    //         new Visual('usb', new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 1, roughness: 0.6, envMap: null, name: 'steel'})),
    //         new Visual('cc2640r2f', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
    //         new Visual('mpu-6500', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
    //     ]
    // ),
    // new Folder('accumHolder',
    //     new Moving(new Vector3(0, 0, 0.022), new Euler( 0, 0, Math.PI )), [
    //         new Visual('Body1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
    //     ]
    // ),
    // new Folder('battery',
    //     new Moving(new Vector3(0, -0.0093, 0.027), new Euler( -Math.PI * 0.5, 0, Math.PI )), [

    //     ]
    // ),
    new Folder('antennaTorez',
        new Moving(new Vector3(0, 0, - 0.003), new Euler(0, Math.PI, Math.PI * 0.5)), [
            new Visual('Body1', new THREE.MeshStandardMaterial({color: 0x000000, metalness: 0, roughness: 0.2, envMap: null, name: 'black abs'})),
        ]
    ),
    // new Folder('bluetooth',
    //     new Moving(new Vector3(0.022, 0.000, - 0.007), new Euler(0, Math.PI, -Math.PI * 0.194)), [
    //         new Visual('Body1', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
    //         new Visual('Body2', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
    //         new Visual('Body3', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
    //         new Visual('Body4', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
    //     ]
    // ),
    // new Folder('gsm',
    //     new Moving(new Vector3(-0.017, 0.001, - 0.006), new Euler(0, Math.PI, -Math.PI * 0.194)), [
    //         new Visual('Body1', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
    //         new Visual('Body2', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
    //         new Visual('Body3', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
    //         new Visual('Body4', new THREE.MeshStandardMaterial({color: 0xb5a642, metalness: 0.8, roughness: 0.5, envMap: null, name: 'brass'})),
    //     ]
    // ),
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
