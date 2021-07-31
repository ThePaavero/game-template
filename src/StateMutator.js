const StateMutator = () => {

  const update = (state, canvas) => {
    const player = state.player
    const keysDown = state.keysDown

    if (keysDown.includes('arrowleft')) {
      if (Math.abs(player.velocities.x) < player.velocities.ceilings.x) {
        player.velocities.x--
      }
    }
    if (keysDown.includes('arrowright')) {
      if (Math.abs(player.velocities.x) < player.velocities.ceilings.x) {
        player.velocities.x++
      }
    }
    if (keysDown.includes('arrowup')) {
      if (Math.abs(player.velocities.y) < player.velocities.ceilings.y) {
        player.velocities.y--
      }
    }
    if (keysDown.includes('arrowdown')) {
      if (Math.abs(player.velocities.y) < player.velocities.ceilings.y) {
        player.velocities.y++
      }
    }

    ['x', 'y'].forEach(axis => {
      player[axis] += player.velocities[axis]

      if (player.velocities[axis] > 0) {
        player.velocities[axis] -= player.mass
      }
      else if (player.velocities[axis] < 0) {
        player.velocities[axis] += player.mass
      }

      if (Math.abs(player.velocities[axis]) < 0.5) {
        player.velocities[axis] = 0
      }

      const dimension = axis === 'x' ? 'width' : 'height'

      if (player[axis] < 0) {
        player[axis] = 0
        player.velocities[axis] = Math.abs(player.velocities[axis]) * player.mass
      }
      else if (player[axis] > canvas[dimension] - player[dimension]) {
        player[axis] = canvas[dimension] - player[dimension]
        player.velocities[axis] = (player.velocities[axis] * -1) * player.mass
      }
    })
  }

  const playerToInitialPosition = (state, canvas) => {
    const player = state.player
    player.x = (canvas.width / 2) - (player.width / 2)
    player.y = (canvas.height / 2) - (player.height / 2)
  }

  const onLoad = (state, canvas) => {
    playerToInitialPosition(state, canvas)
  }

  return {
    update,
    onLoad,
  }
}

export default StateMutator()
