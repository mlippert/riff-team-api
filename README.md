# riff-team-api

The riff-team-api provides a REST (http) and websocket interface for Riff teams.


## Resources

Build tool, components, development tools, deployment...
- [Resources][]

[Resources]: <./docs/resources.md> "riff-team-api resource doc"

## Development notes

The [article by Conroy Whitney][proj-org-article] makes a very good point (because it supports my
thinking going in? :-) ) that organizing by function first, feature second is problematic
in the long run, and it is better to organize feature first, function second.

However for the initial pass at this project, I think I will stick with the organization
suggested by the feathersjs developers as created by the feathersjs CLI.

Once some actual implementation is working, thought should be given to upending everything
and reorganizing before too much code exists and that becomes a herculean task.

[proj-org-article]: <https://alligator.io/react/index-js-public-interfaces/>

## Code guidelines

Use `index.js` files ONLY as aggregators, as [Conroy Whitney suggests][using-indexjs] and
put all logic in a file with a more descriptive name.

[using-indexjs]: <https://alligator.io/react/index-js-public-interfaces/#using-indexjs>
