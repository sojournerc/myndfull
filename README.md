
This app uses gulp as a task runner, [rollup](http://rollupjs.org) as bundler, and [bublé](https://buble.surge.sh/guide/) as transpiler.

Livereload will reload stylesheets if style changes occur and will reload the page if changes occur in client-side javascript. The [liveroload](http://livereload.com) extension needs to be installed on chrome for this to work.

Generator functions are supported in server-side code, but are not transformed for the client, so should not be used.

*Assumes node.js version > 6*

******************************
#Vision
With everytihing that goes on around and in us on a given day, it is immensly difficult to remain present and mindful in our daily activities. I find myself most stressed when I try to maintain a jumble of ideas and goals and tasks in my mind as though juggling fire. This inevitabely leaves me stressed and seaking escape which often isn't healthy.

The goal then is to provide an easy to use and ergonomic interface for capturing tasks, and thoughts to leave conciousness for higher thinking. Greater mindfullness will positively feedback into better tasks and more nuanced goals.

The result is a better focus and an actionable daily task list. The UX will allow to focus in on a single goal and its tasks or take a higher view.

Similarly by being able to capture thoughts immediatly the cognitive load of trying to hold onto the idea will be released for further contemplation.

###What makes a good goal?
1. Furthers self-realization
2. Presents a challenge
3. Counteracts fear / Faces fear
4. Has actionable tasks

###What makes a good task?
1. Furthers a goal
2. Achievable
3. Provides demonstrable value

###What fields are queryable on log entries?
- Time
- Text search
- Subject search?
- Mood?
- Contains (link, video, mention)
- Category (idea, journal(activity), musing)

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
