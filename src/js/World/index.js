import * as THREE from 'three'

import AmbientLight from './AmbientLight.js'
import PointLight from './PointLight.js'
import Floor from './Floor'
import Wall from './Wall'
import Gun from './Gun'
import Katana from './Katana'
import Dynamite from './Dynamite'
import Cube from './Cube.js'
import Bubble from './Bubble.js'

export default class World {
  constructor(_options) {
    // Set options
    this.time = _options.time
    this.debug = _options.debug
    this.mouse = _options.mouse

    // Set up
    this.container = new THREE.Object3D()

    if (this.debug) {
      this.debugFolder = this.debug.addFolder('World')
      this.debugFolder.open()
    }
    this.setAmbientLight()
    this.setPointLight()
    // this.setCube()
    // this.setFloor()
    this.setWall()
    this.setGun()
    this.setDynamite()
    this.setKatana()
    this.setBubble()
  }
  setAmbientLight() {
    this.light = new AmbientLight({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setPointLight() {
    this.light = new PointLight({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  // setCube() {
  //   this.cube = new Cube({
  //     time: this.time,
  //     debug: this.debugFolder,
  //   })
  //   this.container.add(this.cube.container)
  // }

  setFloor(){
    this.floor = new Floor()
    this.container.add(this.floor.container)
  }
  setWall(){
    this.wall = new Wall()
    this.container.add(this.wall.container)
  }
  setGun(){
    this.gun = new Gun(this.time, this.mouse, this.debugFolder)
    this.container.add(this.gun.container)
  }
  setDynamite(){
    this.dynamite = new Dynamite(this.time, this.mouse, this.debugFolder)
    this.container.add(this.dynamite.container)
  }
  
  setKatana(){
    this.katana = new Katana(this.time, this.mouse, this.debugFolder)
    this.container.add(this.katana.container)
  }
  
  setBubble(){
    this.bubble = new Bubble(this.time, this.mouse, this.debugFolder)
    this.container.add(this.bubble.container)
  }
}
