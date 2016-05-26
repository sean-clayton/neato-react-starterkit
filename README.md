<img style="max-width:768px;" src="logo.png" />

# Neato
A React starter kit that's pretty neat.

### About Neato

Neato is a mildly-opinionated, bare-bones, yet feature-filled, React/Redux starter kit to help you write your app the way you want to while minimizing the React project setup time.

### Features

You get the following set up for you out of the box:

- Modular CSS with [PostCSS] &amp; [react-css-modules]
- A fast unit-testing suite with [AVA], [enzyme], [expect], and coverage reporting with [nyc]
- App state management with Redux, redux-thunk, and redux-saga
- ES2015+ syntax support with [Babel]
- Performance analysis with [why-did-you-update] and optimization with [babel-preset-react-optimize]
- Redux debugging with built-in support for the [Redux DevTools Chrome Extension] and [redux-logger]
- Quick error analysis with [redbox-react] and [react-transform-catch-errors]
- Code-quality checking with [eslint]

[PostCSS]: #
[react-css-modules]: #
[AVA]: #
[enzyme]: #
[expect]: #
[nyc]: #
[Babel]: #
[why-did-you-update]: #
[babel-preset-react-optimize]: #
[Redux DevTools Chrome Extension]: #
[redux-logger]: #
[react-transform-catch-errors]: #
[eslint]: #

### Installation

#### Prerequisites

- Node >= 5.0

```sh
$ git clone https://gitlab.com/seanclayton/neato-react-starterkit.git
$ cd neato-react-starterkit
$ npm install
```

### Usage

#### Commands

_Note:_ A full list of commands can be found in the "scripts" section of [package.json](package.json)

```sh
# Start Dev Suite
$ npm start

# Start Dev Mode
$ npm run dev

# Run Tests
$ npm test

# Run Test Coverage
$ npm run cover

# Lint
$ npm run lint

# Compile a Production-Ready Bundle
$ npm run compile
```

### Known Bugs

[All issues are reported here.](https://gitlab.com/seanclayton/neato-react-starterkit/issues)

### [LICENSE](LICENSE)

COPYRIGHT &copy; 2016 Sean-Patrick Ortencio Clayton

BSD ISC License

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
