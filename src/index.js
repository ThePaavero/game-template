import Deltaframe from 'deltaframe'
import config from './config'
import State from './state'
import StateMutator from './StateMutator'
import Renderer from './Renderer'
import _ from 'lodash'

let state

const initialState = _.cloneDeep(State)

const deltaFrame = new Deltaframe()

let canvas, context, debugPreElement

const tick = () => {
  StateMutator.update(state)
  Renderer.draw(state, context, canvas)
  if (config.debugger && debugPreElement) {
    debugPreElement.innerHTML = JSON.stringify(state, null, 2)
  }
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
