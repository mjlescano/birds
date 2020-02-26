const opts = { audio: false, video: { facingMode: 'user' } }

export default () => navigator.mediaDevices.getUserMedia(opts)
  .then((stream) => new Promise((resolve) => {
    const video = document.createElement('video')
    video.width = 640
    video.height = 480
    video.srcObject = stream
    video.onloadedmetadata = () => {
      video.play()
      resolve(video)
    }
  }))
