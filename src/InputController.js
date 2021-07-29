import { remove } from 'lodash'

const InputController = () => {

  let state
  let config
  let deltaFrame
  let resetGame

  const keyHandlerFunctions = {
    onKeyDown: (e) => {
      const key = e.key.toLowerCase()
      if (!state.keysDown.includes(key)) {
        state.keysDown.push(key)
      }
    },
    onKeyUp: (e) => {
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
    onBlur: () => {
      state.keysDown = []
      deltaFrame.pause()
    },
    onFocus: () => {
      state.keysDown = []
      deltaFrame.resume()
    },
  }

  const setEventListeners = () => {
    const eventSlugs = ['KeyDown', 'KeyUp', 'Focus', 'Blur']
    eventSlugs.forEach(slug => {
      const method = keyHandlerFunctions[`on${slug}`]
      document.removeEventListener(slug.toLowerCase(), method)
      document.addEventListener(slug.toLowerCase(), method)
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
