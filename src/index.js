const context = require.context('.', true, /\/.*\.examples\.js/)

console.log(context.keys())

const root = document.getElementById('root')

function renderThings() {
  const allThings = context.keys().map(path => context(path))
  root.innerHTML = `<pre>${JSON.stringify(allThings, null, 2)}</pre>`
}

renderThings()

if (module.hot) {
  // what I want to be able to do:
  module.hot.accept(context.keys(), () => {
    // this is never called
    renderThings()
  })

  // not even this works.
  module.hot.accept('./bats.examples.js', () => {
    // this is never called
    console.log('bats!')
  })

  // These don't work. I get a full page refresh with a warning that the changed
  // file is not accepted and a gnarly error like:
  /*
    Uncaught RangeError: Maximum call stack size exceeded
      at hotAddUpdateChunk (VM169 bundle.js:955)
      at webpackHotUpdateCallback (VM169 bundle.js:8)
      at webpackHotUpdateCallback (VM169 bundle.js:9)
      at webpackHotUpdateCallback (VM169 bundle.js:9)
      at webpackHotUpdateCallback (VM169 bundle.js:9)
      at webpackHotUpdateCallback (VM169 bundle.js:9)
      at webpackHotUpdateCallback (VM169 bundle.js:9)
      at webpackHotUpdateCallback (VM169 bundle.js:9)
      at webpackHotUpdateCallback (VM169 bundle.js:9)
      at webpackHotUpdateCallback (VM169 bundle.js:9)
  */
  // that's happening inside the webpack/bootstrap file which looks like this:
  // https://gist.github.com/kentcdodds/8542e0c27a2cc0cca5ab8dc24c874dfc
}
