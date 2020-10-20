import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelSrc from '../../models/GUNS_3.glb'
import Target from './TargetBall'

export default class Gun {

    constructor(time, mouse, debug){
        this.loader = new GLTFLoader();
        this.container = new THREE.Object3D()
        this.debug = debug
        this.buildGun()
        this.buildTarget()
        this.time = time
        this.mouse = mouse
    }

    buildGun(){
        this.loader.load(
            modelSrc,
            (gltf) => {
                
                let material = new THREE.MeshPhongMaterial({
                    color: 0x7c868a
                })
                
                // pointing Mesh
                this.model = gltf.scene
                this.model.traverse((o) => {
                    if (o.isMesh) o.material = material;
                  });
                // Overiding Material
                console.log(this.model);
                
                this.container.add(this.model );
                this.container.scale.x = 0.003
                this.container.scale.y = 0.003
                this.container.scale.z = 0.003

                this.container.translateZ(2)
                this.container.translateY(1)
                this.container.rotation.y = - Math.PI/2
            
                this.mouse.on('mouseMove', () => {
                    this.container.rotation.y = -Math.PI/20000 * this.mouse.mouseX - Math.PI/2
                    this.container.rotation.x = -Math.PI/20000 * this.mouse.mouseY
                })

                
        },
    );
    }
    buildTarget(){
        this.target1 = new Target({
            params: {
                positionX: 0,
                positionY: 215,
                positionZ: -455
        }})
        this.target2 = new Target({
            params: {
                positionX: 5,
                positionY: 50,
                positionZ: 80
        }})
        this.target3 = new Target({ 
            params: {
                positionX: 0,
                positionY: 275,
                positionZ: 310
        }})
        this.container.add(this.target1.container, this.target2.container, this.target3.container)

        
    }
    
}