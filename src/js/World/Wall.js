import * as THREE from 'three'
import { DoubleSide } from 'three'

export default class Wall {

    constructor(){
        this.container = new THREE.Object3D()
        this.drawWall()
    }
    drawWall(){
        this.wall = new THREE.PlaneBufferGeometry(100,100,20)
        this.wallMat = new THREE.MeshPhongMaterial(
                {
                    color: 0xAEAEAE,
                    specular: 0xC9C0C7,
                    shininess: 3,
                    flatShading: false
                }
             )
        this.meshWall = new THREE.Mesh(this.wall, this.wallMat)
        this.container.add(this.meshWall)
    }
}