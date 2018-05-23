# webpack-dynamic-hmr-example

This is a work in progress, right now it's a bug reproduction.

Install dependencies, then run `npm run dev` and you'll see the issues.

I'm trying to make the `renderThings` function run any time the `*.examples.js`
files or their dependencies change. Would be a bonus if I could get it to
run if `index.js` changes as well.
