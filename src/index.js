import Deltaframe from 'deltaframe'
import config from './config'
import state from './state'

const deltaFrame = new Deltaframe()

let canvas, context, debugPreElement

const updateState = () => {
  const player = state.player
  if (state.keysDown.includes('arrowleft')) {
    player.velocities.x--
  }
  if (state.keysDown.includes('arrowright')) {
    player.velocities.x++
  }
  player.x += player.velocities.x
  player.y += player.velocities.y

  if (player.velocities.x > 0) {
    player.velocities.x -= player.mass
  }
  else if (player.velocities.x < 0) {
    player.velocities.x += player.mass
  }

  if (Math.abs(player.velocities.x) < 0.1) {
    player.velocities.x = 0
  }
}

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  const player = state.player
  context.fillStyle = player.color
  context.fillRect(player.x, player.y, player.width, player.height)
}

const tick = () => {
  updateState()
  draw()
  debugPreElement.innerHTML = JSON.stringify(state, null, 2)
}

const placePlayerToInitialPosition = () => {
  const player = state.player
  player.x = (canvas.width / 2) - (canvas.width / 5)
  player.y = canvas.height - player.height
}

const setControls = () => {
  document.addEventListener('keydown', e => {
    if (!state.keysDown.includes(e.key.toLowerCase())) {
      state.keysDown.push(e.key.toLowerCase())
    }
  })
  document.addEventListener('keyup', e => {
    if (state.keysDown.includes(e.key.toLowerCase())) {
      state.keysDown = state.keysDown.filter(key => key !== e.key.toLowerCase())
    }
  })
}

const init = (width, height) => {
  canvas = document.querySelector('canvas')
  context = canvas.getContext('2d')
  debugPreElement = document.querySelector('pre')
  canvas.width = width
  canvas.height = height

  setControls()
  placePlayerToInitialPosition()
  deltaFrame.start(tick)
}

init(config.width, config.height)
