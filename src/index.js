import Deltaframe from 'deltaframe'
import config from './config'
import State from './state'
import _ from 'lodash'

let state

const initialState = _.cloneDeep(State)

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

const keyHandlerFunctions = {
  onKeyDown: (e) => {
    const key = e.key.toLowerCase()
    if (!state.keysDown.includes(key)) {
      state.keysDown.push(key)
    }
  },
  onKeyUp: (e) => {
    const key = e.key.toLowerCase()
    if (state.keysDown.includes(key)) {
      state.keysDown = state.keysDown.filter(key => key !== key)
    }

    switch (key) {
      case 'p':
        if (deltaFrame.isPaused) {
          deltaFrame.resume()
        } else {
          deltaFrame.pause()
        }
        break
      case 'r':
        init(config.width, config.height)
        break
    }
  },
}

const setControls = () => {
  const eventSlugs = ['KeyDown', 'KeyUp']
  eventSlugs.forEach(slug => {
    const method = keyHandlerFunctions[`on${slug}`]
    document.removeEventListener(slug.toLowerCase(), method)
    document.addEventListener(slug.toLowerCase(), method)
  })
}

const init = (width, height) => {
  state = _.cloneDeep(initialState)
  canvas = document.querySelector('canvas')
  context = canvas.getContext('2d')
  debugPreElement = document.querySelector('pre')
  canvas.width = width
  canvas.height = height

  setControls()
  placePlayerToInitialPosition()
  if (!deltaFrame.isRunning) {
    deltaFrame.start(tick)
  }
}

init(config.width, config.height)
