const root = document.getElementById('root')
const context = require.context('.', true, /\/.*\.examples\.js/)
const allThings = context.keys().map(path => context(path))
root.innerHTML = `<pre>${JSON.stringify(allThings, null, 2)}</pre>`

if (module.hot) {
  // accept self and any dependencies (including those coming from context)
  module.hot.accept(() => {
    // this will be called on errors
    // like if you have a syntax error in a hot replaced module.
    console.log('there was an error in a hot replaced module')
  })
}
