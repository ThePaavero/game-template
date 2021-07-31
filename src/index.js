import 'regenerator-runtime/runtime'
import Deltaframe from 'deltaframe'
import config from './config'
import State from './state'
import StateMutator from './StateMutator'
import Renderer from './Renderer'
import InputController from './InputController'
import { cloneDeep } from 'lodash'

let state

const initialState = cloneDeep(State)
const deltaFrame = new Deltaframe()

let canvas, context, debugPreElement, preloadMessageElement

const tick = () => {
  StateMutator.update(state, canvas)
  Renderer.draw(state, context, canvas)
  updateDebugView()
}

const updateDebugView = () => {
  if (!config.debugger || !debugPreElement) {
    return
  }
  debugPreElement.innerHTML = JSON.stringify(state, null, 2)
}

const init = async (width, height) => {

  if (config.images.length) {
    console.info(`Preloading ${config.images.length} images...`)
    await Renderer.preload(config.images)
    console.info('Preloading images done.')
  }

  state = cloneDeep(initialState)

  canvas = document.querySelector('canvas')
  context = canvas.getContext('2d')
  debugPreElement = document.querySelector('pre')
  preloadMessageElement = document.querySelector('.preload-message')
  preloadMessageElement.remove()

  canvas.width = width
  canvas.height = height

  StateMutator.onLoad(state, canvas)
  InputController.init(state, config, deltaFrame, init)

  if (!deltaFrame.isRunning) {
    deltaFrame.start(tick)
  }
}

init(config.width, config.height)
