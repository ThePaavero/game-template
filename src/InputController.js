const InputController = () => {

  let state
  let config
  let deltaFrame

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

  const init = (_state, _config, _deltaFrame) => {
    state = _state
    config = _config
    deltaFrame = _deltaFrame
    setControls()
  }

  return {
    init,
  }
}

export default InputController()
