const StateMutator = () => {

  const keepInsideCanvas = (player, canvas) => {
    if (player.x < 0) {
      player.x = 0
      player.velocities.x = Math.abs(player.velocities.x) * player.mass
    }
    else if (player.x > canvas.width - player.width) {
      player.x = canvas.width - player.width
      player.velocities.x = (player.velocities.x * -1) * player.mass
    }
  }

  const update = (state, canvas) => {
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

      keepInsideCanvas(player, canvas)
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
