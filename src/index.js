const { width } = require('./config')
const config = require('./config')
const state = require('./state')

let canvas, context, debugPreElement

const updateState = () => {
  const player = state.player
  if (state.keysDown.includes('arrowleft')) {
    player.velocities.x = -1
  }

  if (state.keysDown.includes('arrowright')) {
    player.velocities.x = 1
  }

  // Apply forces.
  player.y += Math.round(player.velocities.y)
  player.x += Math.round(player.velocities.x)

  // Apply friction
  if (player.velocities.x < 0) {
    player.velocities.x += player.friction
  } else if (player.velocities.x > 0) {
    player.velocities.x -= player.friction
  }

  // Don't slide around forever.
  if (Math.abs(player.velocities.x) > 0) {
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
  window.requestAnimationFrame(tick)
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
  tick()
}

init(config.width, config.height)
