
This app uses gulp as a task runner, [rollup](http://rollupjs.org) as bundler, and [bublé](https://buble.surge.sh/guide/) as transpiler.

Livereload will reload stylesheets if style changes occur and will reload the page if changes occur in client-side javascript. The [liveroload](http://livereload.com) extension needs to be installed on chrome for this to work.

Generator functions are supported in server-side code, but are not transformed for the client, so should not be used.

*Assumes node.js version > 4*

******************************
#Getting Started

// 1st install dependencies

`npm install`

// Wire up pre-commit hook (builds assets)
`chmod +x pre-commit; cp pre-commit .git/hooks/pre-commit;`

// To bundle server and client, start server, and watch for changes to restart / rebundle run

`gulp`

******************************

This app uses [basecss](http://www.basscss.com) as a foundation for functional CSS
