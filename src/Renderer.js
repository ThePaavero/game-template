const Renderer = () => {

  const draw = (state, context, canvas) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    const player = state.player
    context.fillStyle = player.color
    context.fillRect(player.x, player.y, player.width, player.height)
  }

  return {
    draw,
  }
}

export default Renderer()
