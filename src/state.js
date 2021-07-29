const state = {
  player: {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    friction: 0.1,
    color: 'black',
    velocities: {
      x: 0,
      y: 0,
    },
  },
  keysDown: [],
}

module.exports = state
