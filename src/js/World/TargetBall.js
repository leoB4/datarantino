import * as THREE from 'three'

export default class TargetBall {

    constructor(_options){

        this.debug = _options.debug
        console.log(this.debug);

        this.container = new THREE.Object3D()
        this.params = _options.params
        this.drawBall()

        if (this.debug) {
            this.setDebug()
        }
    }
    drawBall(){
        
        this.target = new THREE.SphereBufferGeometry( 20, 32, 32 )
        this.targetMat = new THREE.MeshPhongMaterial({
            transparent: true,
            opacity: 0
        })
        this.meshTarget = new THREE.Mesh(this.target, this.targetMat)
        this.meshTarget.position.set(this.params.positionX, this.params.positionY, this.params.positionZ)

        this.container.add(this.meshTarget)
    }
    getWorldCoordinate(){
        const vec3Target = new THREE.Vector3(20,120,70)
        return this.container.localToWorld(this.container.position.multiply(vec3Target))
        // return vec3Target
    }

    setDebug() {
        // Color debug
        this.debugFolder = this.debug.addFolder('Target ball')
        this.debugFolder.open()
          
        //Position debug
        this.debugFolder
          .add(this.meshTarget.position, 'x')
          .step(1)
          .min(-2000)
          .max(2000)
          .name('Position X')
        this.debugFolder
          .add(this.meshTarget.position, 'y')
          .step(1)
          .min(-2000)
          .max(2000)
          .name('Position Y')
        this.debugFolder
          .add(this.meshTarget.position, 'z')
          .step(1)
          .min(-2000)
          .max(2000)
          .name('Position Z')
      }
}