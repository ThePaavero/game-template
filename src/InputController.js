import { remove } from 'lodash'

const InputController = () => {

  let state
  let config
  let deltaFrame
  let resetGame

  let gamepad

  const gamePadButtons = {
    0: 'z', // A
    1: 'x', // B
    12: 'arrowup',
    13: 'arrowdown',
    14: 'arrowleft',
    15: 'arrowright',
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
      const keyName = gamePadButtons[number]
      if (!gamepad.buttons[number]) {
        // state.keysDown = remove(state.keysDown, k => k !== key)
        return // Not mapped.
      }
      if (gamepad.buttons[number].pressed) {
        if (!state.keysDown.includes(keyName)) {
          state.keysDown.push(keyName)
        }
      } else {
        if (state.keysDown.includes(keyName)) {
          state.keysDown = remove(state.keysDown, k => k !== keyName)
        }
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
