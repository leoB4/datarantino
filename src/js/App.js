import * as THREE from 'three'
import * as dat from 'dat.gui'

import Sizes from './Tools/Sizes.js'
import Time from './Tools/Time.js'
import Mouse from './Tools/Mouse'
import Noise from './Tools/simpleNoise'

import Camera from './Camera.js'
import World from './World/index.js'

export default class App {
  constructor(_options) {
    // Set options
    this.canvas = _options.canvas
    this.trigger1 = _options.trigger1
    this.trigger2 = _options.trigger2
    this.trigger3 = _options.trigger3
    this.trigger4 = _options.trigger4
    this.trigger5 = _options.trigger5
    this.trigger6 = _options.trigger6
    this.trigger7 = _options.trigger7
    this.trigger8 = _options.trigger8
    this.trigger9 = _options.trigger9

    this.infoBullet = _options.infoBullet
    this.infoDeath = _options.infoDeath
    this.infoHead = _options.infoHead
    this.infoTemp = _options.infoTemp
    this.infoExplo = _options.infoExplo
    this.infoBlood = _options.infoBlood
    this.infoKatana = _options.infoKatana
    this.infoInsult = _options.infoInsult
    this.infoPodium = _options.infoPodium

    this.allContent = _options.allContent

    this.allTrigger = _options.allTrigger

    this.sinus = _options.sinus
    this.ctx = _options.ctx

    this.closeIframe = _options.closeIframe
    this.iframe = _options.iframe
    this.openIframe = _options.openIframe

    this.labMouse = _options.labMouse


    this.CamTarget = 0

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.mouse = new Mouse()

    this.noise = new Noise()

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setWorld()
    this.openIntro()
    this.showData()
    this.selectHeadshot()
    this.lerp()
    this.switchObject()
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

      this.camera.setPosition(this.lerp(this.camera.camera.position.x, this.CamTarget, 0.05))
      
      const coordinates3DTarget1 = this.world.gun.target1.getWorldCoordinate()

      const coordinate3DTargetDynamite = this.world.dynamite.target1.getWorldCoordinate()
      
      const coordinate3DTargetKatana = this.world.katana.target1.getWorldCoordinate()
      
      const coordinate3DTargetBubble = this.world.bubble.target1.getWorldCoordinate()

      // console.log(coordinates3DTarget1, coordinates3DTarget2, coordinates3DTarget3);
      
      const vec1 = this.createVector(coordinates3DTarget1.x,coordinates3DTarget1.y,coordinates3DTarget1.z,this.camera.camera,this.sizes.viewport.width,this.sizes.viewport.height)
      
      const vec2 = this.createVector(coordinate3DTargetDynamite.x,coordinate3DTargetDynamite.y,coordinate3DTargetDynamite.z,this.camera.camera,this.sizes.viewport.width,this.sizes.viewport.height)
      
      const vec3 = this.createVector(coordinate3DTargetKatana.x,coordinate3DTargetKatana.y,coordinate3DTargetKatana.z,this.camera.camera,this.sizes.viewport.width,this.sizes.viewport.height)
      
      const vec4 = this.createVector(coordinate3DTargetBubble.x,coordinate3DTargetBubble.y,coordinate3DTargetBubble.z,this.camera.camera,this.sizes.viewport.width,this.sizes.viewport.height)
      
      this.trigger1.style.top = Math.floor(vec1.y) + "px" 
      this.trigger1.style.left = Math.floor(vec1.x) + "px"

      this.trigger2.style.top = Math.floor(vec1.y)-50 + "px" 
      this.trigger2.style.left = Math.floor(vec1.x)/2+40 + "px"

      this.trigger3.style.top = Math.floor(vec1.y)*1.25 + "px" 
      this.trigger3.style.left = Math.floor(vec1.x)/1.7 + "px"
      
      this.trigger4.style.top = Math.floor(vec2.y)/1.4 + "px" 
      this.trigger4.style.left = Math.floor(vec2.x)/1.35 + "px"
      
      this.trigger5.style.top = Math.floor(vec2.y)/1.15 + "px" 
      this.trigger5.style.left = Math.floor(vec2.x) + "px"
      
      this.trigger6.style.top = Math.floor(vec3.y)/1.75 + "px" 
      this.trigger6.style.left = Math.floor(vec3.x)/1.2 + "px"
      
      this.trigger7.style.top = Math.floor(vec3.y)*1.3 + "px" 
      this.trigger7.style.left = Math.floor(vec3.x)*1.4 + "px"

      this.trigger8.style.top = Math.floor(vec4.y)/1.5 + "px" 
      this.trigger8.style.left = Math.floor(vec4.x)/1.5 + "px"
      
      this.trigger9.style.top = Math.floor(vec4.y)/1.3 + "px" 
      this.trigger9.style.left = Math.floor(vec4.x)/2.1 + "px"
   
    })
    
    this.mouse.on('mouseMove', ()=>{
      this.mouseCoo = this.mouse.mouseX.toString()
      if(this.mouseCoo.length < 4){
        this.four0 = 4-this.mouseCoo.length
        for(let i = 1; i <= this.four0; i++){
           this.mouseCoo = "0" + this.mouseCoo
        }
      }
      this.labMouse.innerHTML = this.mouseCoo

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

    vector.x = -(vector.x - 1)/1.7  * width;
    vector.y = -(vector.y - 1)/1.5  * height;

    return vector;
  }

  openIntro(){
    const introBtn = document.querySelector('.home-title')
    const intro = document.querySelector('.intro')

    introBtn.addEventListener('click', ()=> {
      intro.classList.add('openIntro')
    })
  }

  showData(){
    this.trigger1.addEventListener('click', ()=> {
      this.infoBullet.classList.toggle('hidden')
      this.infoBullet.classList.toggle('js-openInfo')
      this.trigger1.classList.toggle('isSelected')
    })
    this.trigger2.addEventListener('click', ()=> {
      this.infoHead.classList.toggle('hidden')
      this.infoHead.classList.toggle('js-openInfo')
      this.trigger2.classList.toggle('isSelected')
    })
    this.trigger3.addEventListener('click', ()=> {
      this.infoDeath.classList.toggle('hidden')
      this.infoDeath.classList.toggle('js-openInfo')
      this.trigger3.classList.toggle('isSelected')
    })
    this.trigger4.addEventListener('click', ()=> {
      this.infoTemp.classList.toggle('hidden')
      this.infoTemp.classList.toggle('js-openInfo')
      this.trigger4.classList.toggle('isSelected')
    })
    this.trigger5.addEventListener('click', ()=> {
      this.infoExplo.classList.toggle('hidden')
      this.infoExplo.classList.toggle('js-openInfo')
      this.trigger5.classList.toggle('isSelected')
    })
    this.trigger6.addEventListener('click', ()=> {
      this.infoBlood.classList.toggle('hidden')
      this.infoBlood.classList.toggle('js-openInfo')
      this.trigger6.classList.toggle('isSelected')
    })
    this.trigger7.addEventListener('click', ()=> {
      this.infoKatana.classList.toggle('hidden')
      this.infoKatana.classList.toggle('js-openInfo')
      this.trigger7.classList.toggle('isSelected')
    })
    this.trigger8.addEventListener('click', ()=> {
      this.infoPodium.classList.toggle('hidden')
      this.infoPodium.classList.toggle('js-openInfo')
      this.trigger8.classList.toggle('isSelected')
    })
    this.trigger9.addEventListener('click', ()=> {
      this.infoInsult.classList.toggle('hidden')
      this.infoInsult.classList.toggle('js-openInfo')
      this.trigger9.classList.toggle('isSelected')
    })
    
    this.closeIframe.addEventListener('click', ()=> {
      this.iframe.classList.toggle('hidden')
    })
    this.openIframe.addEventListener('click', ()=> {
      this.iframe.classList.toggle('hidden')
    })
  }

  selectHeadshot(){
    const movieHead = document.querySelectorAll('.js-head')
    let oldSelecthead = document.querySelector('.head-selected') 
    let nbHead = document.querySelector('.nmb-headshot')
    let titleMovie = document.querySelector('.js-headTitleMovie')
    
    for(let i = 0; i<movieHead.length; i++){
      movieHead[i].addEventListener('click', ()=>{
        oldSelecthead.classList.remove('head-selected')
        movieHead[i].classList.add('head-selected')
        nbHead.innerHTML = movieHead[i].dataset.head
        titleMovie.innerHTML = movieHead[i].dataset.movie
        oldSelecthead = document.querySelector('.head-selected')
      })
    }
  }

  switchObject(){
    const objectChange = document.querySelectorAll('.js-objectSelected')
    let oldSelectedNav = document.querySelector('.selectedNav')
    let objects = document.querySelectorAll('.object')
    let body =  document.querySelector('body')

    for(let i = 0; i<objectChange.length; i++){
      objectChange[i].addEventListener('click', ()=>{
        oldSelectedNav.classList.remove('selectedNav')
        this.CamTarget = objectChange[i].dataset.x
        body.className = ""
        body.classList.add('object-'+objectChange[i].dataset.x)
        objects[i].classList.add('selectedNav')
        oldSelectedNav = document.querySelector('.selectedNav')
        
        for(let j = 0; j<this.allContent.length; j++){
          if(this.allContent[j].classList.contains("js-openInfo")){
            this.allContent[j].classList.toggle('hidden')
            this.allContent[j].classList.toggle('js-openInfo')
          }
        }
        
        for(let k = 0; k<this.allTrigger.length; k++){
          if(this.allTrigger[k].classList.contains("isSelected")){
            this.allTrigger[k].classList.toggle('isSelected')
          }
        }

      })
    }
  }

  lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
  }

}
