import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelSrc from '../../models/Dynamite.glb'
import Target from './TargetBall'

export default class Dynamite {

    constructor(time, mouse, debug){
        this.loader = new GLTFLoader();
        this.container = new THREE.Object3D()
        this.debug = debug
        this.buildDynamite()
        this.buildTarget()
        this.time = time
        this.mouse = mouse
    }

    buildDynamite(){
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
                
                this.container.add(this.model);
                this.container.scale.x = 0.003
                this.container.scale.y = 0.003
                this.container.scale.z = 0.003


                this.container.translateZ(2)
                this.container.translateY(0.7)
                this.container.translateX(5.15)
                this.container.rotation.z = Math.PI/3
        
            
                this.mouse.on('mouseMove', () => {
                    this.container.rotation.z = -Math.PI/20000 * this.mouse.mouseX + Math.PI/3
                    this.container.rotation.y = -Math.PI/20000 * this.mouse.mouseY
                })

                
        },
    );
    }
    buildTarget(){
        this.target1 = new Target({
            
            params: {
                positionX: 100,
                positionY: -110,
                positionZ: 70
        }})
        this.target2 = new Target({
            
            params: {
                positionX: 20,
                positionY: 200,
                positionZ: 70
        }})
        
        this.container.add(this.target1.container, this.target2.container)

        
    }
    
}