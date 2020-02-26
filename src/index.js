import loadScript from 'js-loadscript'
import './index.css'
import touchBirds from './birds'
import fetchVideo from './fetch-video.js'

if (module.hot) {
  module.hot.addStatusHandler(() => window.location.reload())
}

;(async () => {
  await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.13.3')
  await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet@0.2.3')

  // const container = document.createElement('div')
  const video = await fetchVideo()
  // const canvas = document.createElement('canvas')

  // Object.assign(container, {
  //   position: 'fixed',
  //   left: 0,
  //   top: 0,
  //   width: '100vw',
  //   height: '100vh'
  // })

  // Object.assign(video.style, {
  //   position: 'absolute',
  //   left: '50%',
  //   top: 0,
  //   width: '100vh',
  //   height: '100vh',
  //   transform: 'translateX(-50%) rotateY(180deg)',
  //   opacity: 0.2
  // })

  // Object.assign(canvas, {
  //   position: 'absolute',
  //   left: '50%',
  //   top: 0,
  //   height: '100vh',
  //   transform: 'translateX(-50%)',
  //   opacity: 0.2
  // })

  // container.appendChild(video)
  // container.appendChild(canvas)
  // document.body.appendChild(container)

  // const ctx = canvas.getContext('2d')
  const net = await window.posenet.load()

  // ctx.arc(100, 100, 100, 0, 2 * Math.PI)
  // ctx.fillStyle = 'aqua'
  // ctx.fill()

  const pt = document.createElement('div')

  Object.assign(pt.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '15px',
    height: '15px',
    backgroundColor: 'salmon',
    opacity: 0.5,
    borderRadius: '100%',
    transition: 'translate .01s linear'
  })

  document.body.appendChild(pt)

  const render = async () => {
    const pose = await net.estimateSinglePose(video, 0.5, true, 16)

    // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    if (pose.score > 0.1) {
      const point = pose.keypoints.find((pt) => pt.part === 'rightWrist')
      if (point && point.score > 0.2) {
        const { x, y } = point.position
        const pos = {
          x: x / (640 / window.innerWidth),
          y: y / (480 / window.innerHeight)
        }
        pt.style.transform = `translateX(${pos.x}px) translateY(${pos.y}px)`
        touchBirds(pos.x, pos.y)
      }
    }

    window.requestAnimationFrame(render)
  }

  render()
})()
