import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelSrc from '../../models/KATANA.glb'
import Target from './TargetBall'

export default class Katana {

    constructor(time, mouse, debug){
        this.loader = new GLTFLoader();
        this.container = new THREE.Object3D()
        this.debug = debug
        this.buildKatana()
        this.buildTarget()
        this.time = time
        this.mouse = mouse
    }

    buildKatana(){
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
                this.container.scale.x = 0.004
                this.container.scale.y = 0.004
                this.container.scale.z = 0.004


                this.container.translateZ(2)
                this.container.translateY(0.7)
                this.container.translateX(10.2)
                this.container.rotation.y = Math.PI/2.5
        
            
                this.mouse.on('mouseMove', () => {
                    this.container.rotation.y = -Math.PI/20000 * this.mouse.mouseX + Math.PI/2.5
                    this.container.rotation.z = -Math.PI/20000 * this.mouse.mouseY
                })

                
        },
    );
    }
    buildTarget(){
        this.target1 = new Target({
            
            params: {
                positionX: -30,
                positionY: 220,
                positionZ: -280
        }})
        this.target2 = new Target({
            params: {
                positionX: -30,
                positionY: 0,
                positionZ: 150
        }})
        this.container.add(this.target1.container, this.target2.container)

        
    }
    
}