import { capitalBunnies } from './bunnies.examples'
import { capitalBats } from './bats.examples'
const root = document.getElementById('root')


function renderThings() {
  console.log('rendering 3')
  const items = [{capitalBats: capitalBats}, {capitalBunnies: capitalBunnies}]
  root.innerHTML = `<pre>${JSON.stringify(items, null, 2)}</pre>`
}

renderThings()

if (module.hot) {
  // self-accept
  module.hot.accept()
}
