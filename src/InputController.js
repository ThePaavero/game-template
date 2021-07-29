import { remove } from 'lodash'

const InputController = () => {

  let state
  let config
  let deltaFrame
  let resetGame

  let gamepad

  const gamePadButtons = {
    0: 'a',
    1: 'b',
    2: 'x',
    3: 'y',
    12: 'up',
    13: 'down',
    14: 'left',
    15: 'right',
  }

  const keyHandlerFunctions = {
    keyDown: (e) => {
      const key = e.key.toLowerCase()
      if (!state.keysDown.includes(key)) {
        state.keysDown.push(key)
      }
    },
    keyUp: (e) => {
      const key = e.key.toLowerCase()
      state.keysDown = remove(state.keysDown, k => k !== key) // This is faster and more reliable than using filter. Weird.

      if (key === 'p') {
        if (deltaFrame.isPaused) {
          deltaFrame.resume()
        } else {
          deltaFrame.pause()
        }
      }
      else if (key === 'r') {
        resetGame(config.width, config.height)
      }
    },
    blur: () => {
      state.keysDown = []
      deltaFrame.pause()
    },
    focus: () => {
      state.keysDown = []
      deltaFrame.resume()
    },
    gamepadconnected: e => {
      gamepad = e.gamepad
      listenToGamepad()
    },
  }

  const listenToGamepad = () => {
    Object.keys(gamePadButtons).forEach(number => {
      const key = gamePadButtons[number]
      if(gamepad.buttons[number] && gamepad.buttons[number].pressed){
        console.log(number, key)
      }
    })
    window.requestAnimationFrame(listenToGamepad)
  }

  const setEventListeners = () => {
    const eventSlugs = ['keyDown', 'keyUp', 'focus', 'blur', 'gamepadconnected']
    eventSlugs.forEach(slug => {
      const method = keyHandlerFunctions[slug]
      window.removeEventListener(slug.toLowerCase(), method)
      window.addEventListener(slug.toLowerCase(), method)
    })
  }

  const init = (_state, _config, _deltaFrame, _resetGame) => {
    state = _state
    config = _config
    deltaFrame = _deltaFrame
    resetGame = _resetGame
    setEventListeners()
  }

  return {
    init,
  }
}

export default InputController()
