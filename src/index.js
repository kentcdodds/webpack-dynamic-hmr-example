let context
const root = document.getElementById('root')

function renderThings() {
  console.log('rendering 3')
  context = require.context('.', true, /\/.*\.examples\.js/)
  const allThings = context.keys().map(path => context(path))
  root.innerHTML = `<pre>${JSON.stringify(allThings, null, 2)}</pre>`
}

renderThings()

if (module.hot) {
  // self-accept
  module.hot.accept(renderThings)
  // called whenever files that match the context are updated (or their deps).
  module.hot.accept(context.id, renderThings)
}
