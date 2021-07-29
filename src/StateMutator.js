const StateMutator = () => {

  const update = (state) => {
    const player = state.player
    const keysDown = state.keysDown

    if (keysDown.includes('arrowleft')) {
      player.velocities.x--
    }
    if (keysDown.includes('arrowright')) {
      player.velocities.x++
    }
    if (keysDown.includes('arrowup')) {
      player.velocities.y--
    }
    if (keysDown.includes('arrowdown')) {
      player.velocities.y++
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
    })
  }

  const playerToInitialPosition = (state, canvas) => {
    const player = state.player
    player.x = (canvas.width / 2) - (canvas.width / 5)
    player.y = canvas.height - player.height
  }

  return {
    update,
    playerToInitialPosition,
  }
}

export default StateMutator()
