import EventEmitter from './EventEmitter.js'

export default class Mouse extends EventEmitter {
  constructor() {
    // Get parent methods
    super()

    // Set up
    this.mouseX = 0
    this.mouseY = 0
    document.addEventListener('mousemove', (event) => {
        this.mouseMove(event)
    })
  }
  // on('tick')
  mouseMove(event) {
    this.mouseX = event.clientX
    this.mouseY = event.clientY
    this.trigger('mouseMove')
  }
  // Cancel animation frame
  stop() {
    window.cancelAnimationFrame(this.ticker)
  }
}