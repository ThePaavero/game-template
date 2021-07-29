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
          resetGame(config.width, config.height)
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

  const init = (_state, _config, _deltaFrame, _resetGame) => {
    state = _state
    config = _config
    deltaFrame = _deltaFrame
    resetGame = _resetGame
    setControls()
  }

  return {
    init,
  }
}

export default InputController()
