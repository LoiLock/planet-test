import * as THREE from 'three';

export class AmbientLightInstance {
    color: number
    intensity: number;

    constructor(color: number, intensity = 1) {
        this.color = color;
        this.intensity = intensity
    }

    toThreeObject(scene: THREE.Scene) {
        const light = new THREE.AmbientLight(this.color, this.intensity)

        scene.add(light);
    }
}