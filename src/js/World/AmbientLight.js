import * as THREE from 'three'

export default class AmbientLight {
  constructor(_options) {
    // Set options
    this.debug = _options.debug

    // Set up
    this.container = new THREE.Object3D()
    this.params = { color: 0xA7B3C3 }

    this.createAmbientLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createAmbientLight() {
    this.light = new THREE.AmbientLight(this.params.color)
    this.container.add(this.light)
  }
  setDebug() {
    this.debugFolder = this.debug.addFolder('Ambient Light')
    this.debugFolder.open()
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.light.color = new THREE.Color(this.params.color)
      })
  }
}
