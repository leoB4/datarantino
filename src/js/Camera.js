import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
  constructor(_options) {
    // Set Options
    this.sizes = _options.sizes
    this.renderer = _options.renderer
    this.debug = _options.debug

    // Set up
    this.container = new THREE.Object3D()

    this.setCamera()
    this.setPosition()
    this.setOrbitControls()
  }
  setCamera() {
    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.viewport.width / this.sizes.viewport.height,
      0.1,
      1000
    )
    this.container.add(this.camera)
    // Change camera aspect on resize
    this.sizes.on('resize', () => {
      this.camera.aspect =
        this.sizes.viewport.width / this.sizes.viewport.height
      // Call this method because of the above change
      this.camera.updateProjectionMatrix()
    })
  }
  setPosition() {
    // Set camera position
    this.camera.position.x = 0
    this.camera.position.y = 2
    this.camera.position.z = 4
  }
  setOrbitControls() {
    // Set orbit control
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    )
    this.orbitControls.enabled = false
    this.orbitControls.enableKeys = true
    this.orbitControls.zoomSpeed = 1

    if (this.debug) {
      this.debugFolder = this.debug.addFolder('Camera')
      this.debugFolder.open()
      this.debugFolder
        .add(this.orbitControls, 'enabled')
        .name('Enable Orbit Control')
    }
  }
}
