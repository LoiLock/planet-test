import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PLANET_DETAIL, PLANET_SIZE } from './config/constants';
import PlanetInstance from './planet/planet.js';
import { AmbientLightInstance } from './helpers/lighting.js';


export class Sketch {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.Renderer;
    controls: OrbitControls;

    constructor() {
        console.info('Initializing scene')
        this.scene = new THREE.Scene();

        // this.scene.background = new THREE.Color(0xffffff)
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.z = PLANET_SIZE * 2;
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.controls.zoomSpeed = 0.05
        this.controls.minDistance = (PLANET_SIZE) + (PLANET_SIZE * 0.1)

        //controls.update() must be called after any manual changes to the camera's transform
        // camera.position.set( 0, 20, 100 );
        this.renderLoop = this.renderLoop.bind(this);

        this.renderLoop()
    }

    renderLoop() {
        requestAnimationFrame(this.renderLoop)

        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
}

export default function main() {
    const sketch = new Sketch();

    const planetPosition = new THREE.Vector3(0, 0, 0)

    const ambientLight = new AmbientLightInstance(0xffffff, 0.2)

    ambientLight.toThreeObject(sketch.scene)

    const planet = new PlanetInstance(planetPosition)

    planet.toThreeObject(sketch.scene)

    const dLight = new THREE.DirectionalLight(0xffffff, 1)
    dLight.position.set(PLANET_SIZE * 2.5,PLANET_SIZE * 2.5,0)
    dLight.castShadow = true

    const gridHelper = new THREE.GridHelper(200, 200);

    sketch.scene.add(gridHelper)

    sketch.scene.add(dLight)
}

main()