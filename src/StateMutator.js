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
    player.x += player.velocities.x
    player.y += player.velocities.y

    if (player.velocities.x > 0) {
      player.velocities.x -= player.mass
    }
    else if (player.velocities.x < 0) {
      player.velocities.x += player.mass
    }

    if (Math.abs(player.velocities.x) < 0.1) {
      player.velocities.x = 0
    }
  }

  return {
    update,
  }
}

export default StateMutator()
