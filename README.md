
This repo contains a prototype of the designer-app. It intends to demonstrate a multi mode designer that can effectively manage large page type experiences, or lightweight small experiences.

The goal was to have the elements available and the page layout be determined by the mode of the designer. Available display modules are determined via javascript configuration objects.

It uses gulp as a task runner, [rollup](http://rollupjs.org) as bundler, and [bublé](https://buble.surge.sh/guide/) as transpiler.

Livereload will reload stylesheets if style changes occur and will reload the page if changes occur in client-side javascript. The [liveroload](http://livereload.com) extension needs to be installed on chrome for this to work.

Generator functions are supported in server-side code, but are not transformed for the client, so should not be used.

*Assumes node.js version < 4*

******************************

// 1st install dependencies

`npm install`

// To bundle server and client, start server, and watch for changes to restart / rebundle run

`gulp`

******************************

This app uses [basecss](http://www.basscss.com) as a foundation for functional CSS
