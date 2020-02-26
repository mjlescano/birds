import EventEmitter from 'eventemitter3'
import P5 from 'p5'

const events = [
  'preload',
  'setup',
  'draw',
  'touchStarted',
  'touchMoved',
  'touchEnded',
  'mouseMoved',
  'mouseDragged',
  'mousePressed',
  'mouseReleased',
  'mouseClicked',
  'doubleClicked',
  'mouseWheel',
  'keyPressed',
  'keyReleased',
  'keyTyped',
  'keyIsDown',
  'deviceMoved',
  'deviceTurned',
  'deviceShaken'
]

export default () => {
  const p = new P5(() => {})

  const emitter = new EventEmitter()

  p.on = (evtName, cb) => {
    if (!events.includes(evtName)) throw new Error(`Invalid ${evtName} event.`)
    emitter.on(evtName, cb)
  }

  p.removeListener = (evtName, cb) => emitter.removeListener(evtName, cb)

  events.forEach((evtName) => {
    p[evtName] = (...args) => emitter.emit(evtName, ...args)
  })

  return p
}
