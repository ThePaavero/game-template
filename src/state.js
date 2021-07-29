const state = {
  player: {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    color: 'black',
    velocities: {
      x: 0,
      y: 0,
      ceilings: {
        x: 25,
        y: 25,
      },
    },
    mass: 0.3,
  },
  keysDown: [],
}

module.exports = state
