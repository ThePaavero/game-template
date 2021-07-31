const Renderer = () => {

  const images = []

  const preload = async (slugArray) => {
    return new Promise((resolve, reject) => {
      slugArray.forEach(slug => {
        const el = new Image()
        el.src = require(`./assets/images/${slug}.png`)
        console.log(el.src)
        el.onload = () => {
          images.push({
            slug,
            el,
          })
          if (images.length === slugArray.length) {
            resolve()
          }
        }
      })
    })
  }

  const getImageElement = (slug) => {
    const img = images.find(i => i.slug === slug)?.el
    if (!img) {
      return console.error(`Renderer error: Could not draw image "${slug}" because it's not in our array of loaded images.`)
    }
    return img
  }

  const draw = (state, context, canvas) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
    const player = state.player
    context.fillStyle = player.color
    context.fillRect(player.x, player.y, player.width, player.height)
  }

  return {
    draw,
    preload,
    getImageElement,
  }
}

export default Renderer()
