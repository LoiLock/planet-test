import * as THREE from 'three'
import { PLANET_COLOR, PLANET_DETAIL, PLANET_SIZE } from '../config/constants.js';

interface PlanetInstanceApi {

}

export default class PlanetInstance {
    position: THREE.Vector3

    constructor(position) {
        this.position = position
    }

    toThreeObject(scene: THREE.Scene) {
        const sphereGeometry = new THREE.SphereGeometry(PLANET_SIZE, PLANET_DETAIL, PLANET_DETAIL);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: PLANET_COLOR,
            map: new THREE.TextureLoader().load('../../assets/textures/earth_8192x4096.jpg'),
            displacementMap: new THREE.TextureLoader().load('../../assets/textures/heightmap_21600x10800.png'),
            displacementScale: 1
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.copy(this.position)
        
        scene.add(sphere)
    }
}