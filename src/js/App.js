import * as THREE from 'three'
import * as dat from 'dat.gui'

import Sizes from './Tools/Sizes.js'
import Time from './Tools/Time.js'
import Mouse from './Tools/Mouse'

import Camera from './Camera.js'
import World from './World/index.js'

export default class App {
  constructor(_options) {
    // Set options
    this.canvas = _options.canvas
    this.trigger1 = _options.trigger1
    this.trigger2 = _options.trigger2
    this.trigger3 = _options.trigger3

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.mouse = new Mouse()

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setWorld()
    this.openIntro()
  }
  setRenderer() {
    // Set scene
    this.scene = new THREE.Scene()
    // Set renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialiasing: true,
    })
    // Set background color
    this.renderer.setClearColor(0x212121, 1)
    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })
    // Set RequestAnimationFrame with 60ips
    this.time.on('tick', () => {
      this.renderer.render(this.scene, this.camera.camera)
      
      const coordinates3DTarget1 = this.world.gun.target1.getWorldCoordinate()

      // console.log(coordinates3DTarget1, coordinates3DTarget2, coordinates3DTarget3);
      
      const vec1 = this.createVector(coordinates3DTarget1.x,coordinates3DTarget1.y,coordinates3DTarget1.z,this.camera.camera,this.sizes.viewport.width,this.sizes.viewport.height)
      
      this.trigger1.style.top = Math.floor(vec1.y) + "px" 
      this.trigger1.style.left = Math.floor(vec1.x) + "px"

      this.trigger2.style.top = Math.floor(vec1.y)-50 + "px" 
      this.trigger2.style.left = Math.floor(vec1.x)/2+20 + "px"

      this.trigger3.style.top = Math.floor(vec1.y)*1.25 + "px" 
      this.trigger3.style.left = Math.floor(vec1.x)/1.5 + "px"
    })
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
  }
  setWorld() {
    // Create world instance
    this.world = new World({
      time: this.time,
      debug: this.debug,
      mouse: this.mouse
    })
    // Add world to scene
    this.scene.add(this.world.container)
  }
  setConfig() {
    if (window.location.hash === '#debug') {
      this.debug = new dat.GUI({ width: 420 })
    }
  }

  createVector(x, y, z, camera, width, height) {
    const p = new THREE.Vector3(x, y, z);
    const vector = p.project(camera);

    vector.x = -(vector.x - 1)/1.62  * width;
    vector.y = -(vector.y - 1)/2.2  * height;

    return vector;
  }

  openIntro(){
    const introBtn = document.querySelector('.home-title')
    const intro = document.querySelector('.intro')

    introBtn.addEventListener('click', ()=> {
      intro.classList.add('openIntro')
    })
  }
}
