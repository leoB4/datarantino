import * as THREE from 'three'
import { DoubleSide } from 'three'

export default class Floor {

    constructor(){
        this.container = new THREE.Object3D()
        this.drawFloor()
    }
    drawFloor(){
        this.floor = new THREE.PlaneBufferGeometry(100,100,20)
        this.floorMat = new THREE.MeshPhongMaterial(
                {
                    color: 0xDDDDDD,
                    specular: 0xFFFFFF,
                    shininess: 0.5,
                    flatShading: false
                }
             )
        this.meshFloor = new THREE.Mesh(this.floor, this.floorMat)
        this.meshFloor.rotation.x = Math.PI / 2 + 60
        this.container.add(this.meshFloor)
    }
}